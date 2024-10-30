import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class signInUserDto {
    id: String
    
    @ApiProperty()
    @IsNotEmpty({ message: "O email não pode ser vazio!" })
    email: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: "A senha não pode ser vazia!" })
    password: string;
}