import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

import { Color, Size } from '../entities';

export class CreateVariantDto {
  @IsNumber()
  @IsNotEmpty()
  size: Size;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsOptional()
  color?: Color = null;

  // images: string[];
}
