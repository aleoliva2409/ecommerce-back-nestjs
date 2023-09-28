import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

import { Category } from 'src/categories/entities/category.entity';
import { CreateVariantDto } from 'src/variants/dto/create-variant.dto';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  brand?: string = null;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsOptional()
  tags?: string[] = [];

  //** al mandarle el nro del ID hace la relacion directamente
  @IsNumber()
  @IsNotEmpty()
  category: Category;

  @IsObject()
  @IsNotEmpty()
  variant: CreateVariantDto;
}
