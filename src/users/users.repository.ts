import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository {
    constructor(private prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto){
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
            
            return { status: 201, message:"Usuário criado com sucesso"}
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);               
        }
    }

    async findAll(){
        try {
            const users = await this.prismaService.user.findMany({
                include: {
                    subscription: {
                        include: {
                            screens: true
                        }
                    }
                },
                take: 1,
                orderBy: {
                    createdAt: 'desc'
                }
            });
            
            return users;
          } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
          }
    }

    async findOne(id: string){
        try {
            const user = await this.prismaService.user.findFirst({
                where: {
                    id
                },
                include:{
                    subscription:{
                        include:{
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

    async update(id: string, updateMessageDto: UpdateUserDto){        
        try {
            return { status: 200, message: "Usiário atualizado com sucesso" };
        } catch (error) {
            throw new Error(`Failed to update message: ${error.message}`);
        }
    }

    async remove(id: string){
        try {
            const deleted = await this.prismaService.message.delete({
                where: {
                    id
                }
            })
            console.log("DELETED", deleted);
                        
            return { deleted: true, status: 200, message:"Mensagem atualizada com sucesso"}
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);               
        }
    }

    async findByTitle(title: string){
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