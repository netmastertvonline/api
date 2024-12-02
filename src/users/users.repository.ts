import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Query } from 'express-serve-static-core'

@Injectable()
export class UsersRepository {
    constructor(private prismaService: PrismaService) { }

    async search(query: Query) {
        const usersFinded = await this.prismaService.user.findMany({
            where: {
                name: {
                    contains: query.search_query as string,
                    mode: 'insensitive'
                }
            },
            include: {
                subscription: {
                    include: {
                        screens: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return usersFinded;
    }

    async create(createUserDto: CreateUserDto) {
        const { name, phone, email, plan_value, plan_type, periodicity, contracting_plan, expiration_plan, screens, notes } = createUserDto

        try {
            await this.prismaService.$transaction(async (prisma) => {
                const newUser = await prisma.user.create({
                    data: {
                        name,
                        phone,
                        email,
                    }
                })

                const subscription = await prisma.subscription.create({
                    data: {
                        userId: newUser.id,
                        plan_value,
                        plan_type,
                        periodicity,
                        contracting_plan,
                        expiration_plan,
                        notes
                    }
                })

                await prisma.screen.createMany({
                    data: screens.map(screen => ({
                        subscriptionId: subscription.id,
                        id: screen.id,
                        screen_name: screen.screen_name,
                        system_type: screen.system_type,
                        painel: screen.painel,
                        user_number: screen.user_number,
                        app_name: screen.app_name,
                        mac_address: screen.mac_address,
                        app_key: screen.app_key,

                    }))
                })
            });

            return { status: 201, message: "Usuário criado com sucesso" }
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const users = await this.prismaService.user.findMany({
                where: {
                    subscription: {
                        some: {
                            plan_value: {
                                not: null
                            }
                        }
                    }
                },
                include: {
                    subscription: {
                        include: {
                            screens: true
                        }
                    }
                },
                take: 10,
                orderBy: {
                    createdAt: 'desc'
                }
            });

            return users;
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    id
                },
                include: {
                    subscription: {
                        include: {
                            screens: true
                        }
                    }
                }
            })
            console.log("USER", user.subscription.map(screen => (screen.screens)));

            return { user }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async update(id: string, updateMessageDto: UpdateUserDto) {
        const { name, phone, email, plan_value, plan_type, periodicity, contracting_plan, expiration_plan, screens, notes } = updateMessageDto

        try {
            await this.prismaService.$transaction(async (prisma) => {
                const user = await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        name,
                        phone,
                        email,
                    }
                })
                const subscriptionFinded = await prisma.subscription.findFirst({
                    where: {
                        userId: user.id
                    }
                })

                await prisma.subscription.update({
                    where: {
                        id: subscriptionFinded.id,
                    },
                    data: {
                        plan_value,
                        plan_type,
                        periodicity,
                        contracting_plan,
                        expiration_plan,
                        notes
                    }
                })

                console.log(subscriptionFinded);

            });

            return { status: 200, message: "Usuário atualizado com sucesso" }
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async remove(id: string) {
        try {
            const deleted = await this.prismaService.message.delete({
                where: {
                    id
                }
            })
            console.log("DELETED", deleted);

            return { deleted: true, status: 200, message: "Mensagem atualizada com sucesso" }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async findByTitle(title: string) {
        try {
            const messageExists = await this.prismaService.message.findFirst({
                where: {
                    title,
                }
            })
            return messageExists
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }
}