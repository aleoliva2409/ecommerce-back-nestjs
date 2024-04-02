import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

import { Category } from 'src/categories/entities/category.entity';
import { CreateVariantDto } from './create-variant.dto';
import { SizeType } from '../types';

export class CreateProductDto {
  @IsString()
  @Length(4, 100)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  description: string;

  @IsString()
  @Length(0, 30)
  @IsOptional()
  brand?: string = null;

  @IsString()
  @IsOptional()
  imageUrl?: string = null;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsOptional()
  tags?: string[] = [];

  @IsEnum(SizeType)
  @IsString()
  sizeType: SizeType;

  //** al mandarle el nro del ID hace la relacion directamente
  @IsNumber()
  @IsNotEmpty()
  category: Category;

  @IsObject()
  @IsNotEmpty()
  variant: CreateVariantDto;
}
