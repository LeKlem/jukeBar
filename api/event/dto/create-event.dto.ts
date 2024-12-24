import { IsNotEmpty } from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    date: Date;

    active: 'ACTIVE' | 'INACTIVE' | 'ENDED';
}
