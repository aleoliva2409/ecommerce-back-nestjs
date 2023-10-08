import { IsNotEmpty, IsNumber, Min } from 'class-validator';

import { Order } from '../entities';
import { Variant } from 'src/products/entities';

export class AddVariantInOrderDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  variant: Variant;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  order: Order;
}
