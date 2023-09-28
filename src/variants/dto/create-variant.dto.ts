import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { Product } from 'src/products/entities/product.entity';

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  size: string; // enum

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsOptional()
  color?: string = null;

  // images: string[];

  @IsNumber()
  @IsNotEmpty()
  product: Product;
}
