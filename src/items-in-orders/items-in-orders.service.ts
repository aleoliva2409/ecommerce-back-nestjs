import { Injectable } from '@nestjs/common';
import { CreateItemsInOrderDto } from './dto/create-items-in-order.dto';
import { UpdateItemsInOrderDto } from './dto/update-items-in-order.dto';

@Injectable()
export class ItemsInOrdersService {
  create(createItemsInOrderDto: CreateItemsInOrderDto) {
    console.log(createItemsInOrderDto);
    return 'This action adds a new itemsInOrder';
  }

  findAll() {
    return `This action returns all itemsInOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemsInOrder`;
  }

  update(id: number, updateItemsInOrderDto: UpdateItemsInOrderDto) {
    console.log(updateItemsInOrderDto);
    return `This action updates a #${id} itemsInOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemsInOrder`;
  }
}
