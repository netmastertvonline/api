import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateWhatsappDto {

    @ApiProperty()
    id: String

    @ApiProperty()
    @IsNotEmpty({ message: "O numero não pode ser vazio!" })
    phone: string;

    @ApiProperty()
    @IsNotEmpty({ message: "O tipo do numero não pode ser vazio!" })
    phone_type: string;

    @ApiProperty()
    original_link: string;
    
    @ApiProperty()
    custom_link: string;

    @ApiProperty()
    status: boolean;

    @ApiProperty()
    notes: string;

    @ApiProperty()
    createdAt?: Date

    @ApiProperty()
    updatedAt?: Date
}
