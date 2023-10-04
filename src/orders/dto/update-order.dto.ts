import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  tax?: number;

  @IsDate()
  @IsOptional()
  paidAt?: Date;
}
