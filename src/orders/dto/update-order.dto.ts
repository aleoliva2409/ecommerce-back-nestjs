import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Status } from '../types/status.enum';

export class UpdateOrderDto {
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsEnum(Status)
  @IsString()
  @IsOptional()
  status?: Status;

  @IsNumber()
  @Min(0)
  @IsOptional()
  tax?: number;

  @IsDate()
  @IsOptional()
  paidAt?: Date;
}
