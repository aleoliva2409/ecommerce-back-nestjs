import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsBoolean()
  isPaid: boolean;

  @IsString()
  status: string;

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
  @Length(1)
  products: any[];
}
