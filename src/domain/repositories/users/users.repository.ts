import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../../../interfaces/dtos/users/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { signInUserDto } from "src/interfaces/dtos/users/signIn-user.dto";

@Injectable()
export class UsersRepository {
    constructor(private prismaService: PrismaService) {}

    async signIn(signInUserDto: signInUserDto){
        const { email, password } = signInUserDto
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email,
                    password
                }
            })

            return user
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);               
        }
    }
    async create(createUserDto: CreateUserDto){
        const {name, phone, email, role } = createUserDto
        try {
            const user = await this.prismaService.user.create({
                data: {
                    name,
                    phone,
                    email,
                    role
                }
            })

            return user
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);               
        }
    }

    async findAll(){
        try {
            const users = await this.prismaService.user.findMany();
            return users;
          } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
          }
    }

    async findOne(id: number){
    
    }

    async findByEmail(email: string){
        try {
            const user = await this.prismaService.user.findUnique({
                where:{
                    email
                } 
            })

            return user
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);               
        }
    }
}