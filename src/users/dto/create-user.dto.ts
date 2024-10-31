import { ApiProperty } from "@nestjs/swagger";
import { Screen } from "@prisma/client";

export class CreateUserDto {
    @ApiProperty()
    id: String

    @ApiProperty()
    name: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    plan_value: string;

    @ApiProperty()
    plan_type: string;

    @ApiProperty()
    periodicity: string;

    @ApiProperty()
    contracting_plan: string;

    @ApiProperty()
    expiration_plan: string;

    @ApiProperty()
    screens: Screen[];

    @ApiProperty()
    notes: string;

    @ApiProperty()
    createdAt?: Date

    @ApiProperty()
    updatedAt?: Date
}
