import { PartialType } from '@nestjs/mapped-types';
import { CreateCallsBookedDto } from './create-calls_booked.dto';

export class UpdateCallsBookedDto extends PartialType(CreateCallsBookedDto) {}
