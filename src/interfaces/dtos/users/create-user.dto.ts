import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Account, Role, Session, Subscription } from "@prisma/client";

export class CreateUserDto {
    id: String
    
    @ApiProperty()
    @IsNotEmpty({ message: "O nome não pode ser vazio!" })
    name: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: "O telefone não pode ser vazio!" })
    phone: string;

    @ApiProperty()
    subscription?: Subscription

    @ApiProperty()
    test_default_list?: boolean
    
    @ApiProperty()
    test_premium_list?: boolean

    @ApiProperty()
    password?: string

    @ApiProperty()
    password_confirmation?: string
    
    @ApiProperty()
    email?: string

    @ApiProperty()
    emailVerified?: Date
    
    @ApiProperty()
    image?: string
    
    @ApiProperty()
    role?: Role

    @ApiProperty()
    accounts?: Account[]

    @ApiProperty()
    sessions?: Session[]

    @ApiProperty()
    subscriptionId?: string

    @ApiProperty()
    createdAt?: Date

    @ApiProperty()
    updatedAt?: Date
}