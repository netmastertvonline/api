import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRedirectDto {

    @ApiProperty()
    id: String

    @ApiProperty()
    @IsNotEmpty({ message: "O nome do redirecionamento não pode ser vazio!" })
    redirect_to: string;

    @ApiProperty()
    @IsNotEmpty({ message: "O link de redirecionamento não pode ser vazio!" })
    redirect_link: string;

    @ApiProperty()
    original_link: string;
    
    @ApiProperty()
    custom_link: string;

    @ApiProperty()
    status: boolean;

    @ApiProperty()
    createdAt?: Date

    @ApiProperty()
    updatedAt?: Date
}
