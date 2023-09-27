import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  size: string; // enum

  @IsNumber()
  @Min(0)
  @IsPositive()
  stock: number;

  @IsString()
  @IsOptional()
  color?: string = null;

  // images: string[];

  @IsNumber()
  productId: number;
}
