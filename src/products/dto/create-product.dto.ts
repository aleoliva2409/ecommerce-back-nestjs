import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { CreateVariantDto } from 'src/variants/dto/create-variant.dto';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  @MinLength(4)
  description: string;

  @IsString()
  @IsOptional()
  brand?: string = null;

  @IsNumber()
  @Min(0)
  @IsPositive()
  price: number;

  @IsArray()
  @IsOptional()
  tags?: string[] = [];

  @IsNumber()
  @Min(0)
  categoryId: number;

  @IsObject()
  variant: CreateVariantDto;
}
