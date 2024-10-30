import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @ApiProperty()
    id: String
    
    @ApiProperty()
    @IsNotEmpty({ message: "O titulo não pode ser vazio!" })
    title: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: "A mensagem não pode ser vazia!" })
    message: string;

    @ApiProperty()
    createdAt?: Date

    @ApiProperty()
    updatedAt?: Date
}
