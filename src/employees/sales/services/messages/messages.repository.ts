import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Query } from 'express-serve-static-core'

@Injectable()
export class MessagesRepository {
    constructor(private prismaService: PrismaService) { }

    async search(query: Query) {
        const users = await this.prismaService.message.findMany({
            where: {
                title: {
                    contains: query.search_query as string,
                    mode: 'insensitive'
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        return users;
    }

    async create(createUserDto: CreateMessageDto) {
        const { title, message } = createUserDto
        try {
            const newMessage = await this.prismaService.message.create({
                data: {
                    title,
                    message
                }
            })
            return { newMessage, status: 201, message: "Mensagem criada com sucesso" }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const messages = await this.prismaService.message.findMany({
                take: 7,
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return messages;
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async findOne(id: string) {
        try {
            const messageFinded = await this.prismaService.message.findFirst({
                where: {
                    id
                }
            })
            return { messageFinded, status: 200, message: "Mensagem atualizada com sucesso" }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async update(id: string, updateMessageDto: UpdateMessageDto) {
        const { title, message } = updateMessageDto;

        try {
            const messageUpdated = await this.prismaService.message.update({
                where: {
                    id
                },
                data: {
                    title,
                    message
                }
            });

            return { messageUpdated, status: 200, message: "Mensagem atualizada com sucesso" };
        } catch (error) {
            throw new Error(`Failed to update message: ${error.message}`);
        }
    }

    async remove(id: string) {
        try {
            const deleted = await this.prismaService.message.delete({
                where: {
                    id
                }
            })

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