import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { IsBoolean } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsBoolean()
    closeEvent : boolean;
}
