import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Query } from 'express-serve-static-core'
import { CreateRedirectDto } from "./dto/create-redirect.dto";

@Injectable()
export class RedirectRepository {
    constructor(private prismaService: PrismaService) { }
    
    async search(query: Query) {
        const redirectsFinded = await this.prismaService.redirect.findMany({
            where: {
                redirect_to: {
                    contains: query.search_query as string,
                    mode: 'insensitive'
                }
            }
        });
        return redirectsFinded;
    }

    async create(createRedirectDto: CreateRedirectDto) {
        const { redirect_to, redirect_link } = createRedirectDto

        try {
            await this.prismaService.redirect.create({
                data:{
                    redirect_to,
                    redirect_link,
                }
            })
                
            return { status: 201, message: "Link de Link criado com sucesso" }
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async findAllAciveRedirects() {
        try {
            const redirects = await this.prismaService.redirect.findMany({
                where: {
                    status: true
                }
            });                  
            return redirects;
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }
    
    async findByRedirectTo(redirect_to: string) {
        try {
            const redirectExists = await this.prismaService.redirect.findFirst({
                where: {
                    redirect_to,
                }
            })
            return redirectExists
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const redirectsFinded = await this.prismaService.redirect.findMany({});            
            return redirectsFinded;
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

            return { user }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async remove(id: string) {
        try {
            const deleted = await this.prismaService.redirect.delete({
                where: {
                    id
                }
            })

            return { deleted: true, status: 200, message: "Link excluido com sucesso" }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }
}