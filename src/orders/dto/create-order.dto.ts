import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Status } from '../types/status.enum';

export class CreateOrderDto {
  @IsBoolean()
  isPaid: boolean;

  @IsEnum(Status)
  @IsString()
  status: Status;

  @IsNumber()
  @Min(0)
  @IsOptional()
  tax?: number = null;

  @IsDate()
  @IsOptional()
  paidAt?: Date = null;

  @IsNumber()
  @Min(0)
  subTotal: number;

  @IsNumber()
  @Min(0)
  total: number;

  @IsNumber()
  @Min(1)
  totalItems: number;

  @IsArray()
  @IsObject({ each: true }) //* revisa que cada posicion del array sea un objeto
  variants: any[];
}
