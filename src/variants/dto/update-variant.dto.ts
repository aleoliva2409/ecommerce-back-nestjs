import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { Product } from 'src/products/entities/product.entity';

export class UpdateVariantDto {
  @IsString()
  @IsOptional()
  size?: string; // enum

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  color?: string;

  // images: string[];

  @IsNumber()
  @IsOptional()
  product?: Product;
}
