import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

import { Category } from 'src/categories/entities/category.entity';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @IsOptional()
  category?: Category;
}
