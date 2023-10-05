import { IsNotEmpty, IsNumber, Min } from 'class-validator';

import { Order } from '../entities';
import { Product } from 'src/products/entities/product.entity';

export class AddItemInOrderDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  product: Product;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  order: Order;
}
