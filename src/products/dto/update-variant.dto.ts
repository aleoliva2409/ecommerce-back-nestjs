import { IsNumber, IsOptional, Min } from 'class-validator';

import { Color, Size } from '../entities';

export class UpdateVariantDto {
  @IsNumber()
  @IsOptional()
  size?: Size;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsNumber()
  @IsOptional()
  color?: Color;

  // images: string[];
}
