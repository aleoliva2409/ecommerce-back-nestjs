import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsInOrderDto } from './create-items-in-order.dto';

export class UpdateItemsInOrderDto extends PartialType(CreateItemsInOrderDto) {}
