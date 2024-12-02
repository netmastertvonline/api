import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Query } from 'express-serve-static-core'
import { CreateWhatsappDto } from "./dto/create-whatsapp.dto";
import { UpdateWhatsappDto } from "./dto/update-whatsapp.dto";

@Injectable()
export class WhatsAppRepository {
    constructor(private prismaService: PrismaService) { }
    
    async search(query: Query) {
        const whatsAppsFinded = await this.prismaService.whatsApp.findMany({
            where: {
                phone: {
                    contains: query.search_query as string,
                    mode: 'insensitive'
                }
            }
        });
        return whatsAppsFinded;
    }

    async toggleStatus(id: string) {
        try {
            const currentStatus = await this.prismaService.whatsApp.findUnique({
                where: { id: id },
                select: { status: true }
            });

            await this.prismaService.whatsApp.update({
                where: { id: id },
                data: { status: !currentStatus.status }
            });
                
            return { status: 200, message: "Telefone atualizado com sucesso" }
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
   
    async create(createWhatsappDto: CreateWhatsappDto) {
        const { phone, phone_type } = createWhatsappDto

        try {
            await this.prismaService.whatsApp.create({
                data:{
                    phone,
                    phone_type
                }
            })
                
            return { status: 201, message: "Telefone criado com sucesso" }
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async findAllSuportNumbers() {
        try {
            const whatsappSalesFinded = await this.prismaService.whatsApp.findMany({
                where: {
                    status: true,
                    phone_type: {
                        equals: "suport"
                    } 
                }
            });                  
            return whatsappSalesFinded;
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async findAllSalesNumbers() {
        try {
            const whatsappSalesFinded = await this.prismaService.whatsApp.findMany({
                where: {
                    status: true,
                    phone_type: {
                        equals: "sales"
                    } 
                }
            });                  
            return whatsappSalesFinded;
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const watsappFinded = await this.prismaService.whatsApp.findMany({});            
            return watsappFinded;
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

    async update(id: string, updateWhatsappDto: UpdateWhatsappDto) {
        console.log("ID", id);
        
        const { phone, phone_type, custom_link, notes, operator, message } = updateWhatsappDto
        try {
            const updatedWhatsApp = await this.prismaService.whatsApp.update({
                where: {
                    id
                },
                data:{
                    phone, 
                    phone_type, 
                    custom_link, 
                    notes,
                    operator,
                    message
                }
            })

            return { updatedWhatsApp, status: 200, message: "Telefone atualizado com sucesso" }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }

    async remove(id: string) {
        try {
            const deleted = await this.prismaService.whatsApp.delete({
                where: {
                    id
                }
            })
            console.log("DELETED", deleted);

            return { deleted: true, status: 200, message: "Telefone excluido com sucesso" }
        } catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }
}