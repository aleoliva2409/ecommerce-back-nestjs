import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

import { Category } from 'src/categories/entities/category.entity';

export class UpdateProductDto {
  @IsString()
  @Length(0, 100)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  description?: string;

  @IsString()
  @Length(0, 30)
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
