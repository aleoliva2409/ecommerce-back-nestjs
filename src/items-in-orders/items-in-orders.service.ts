import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validateError } from 'src/shared';
import { ItemInOrder } from './entities/item-in-order.entity';
import { CreateItemsInOrderDto, UpdateItemsInOrderDto } from './dto';

@Injectable()
export class ItemsInOrdersService {
  constructor(
    @InjectRepository(ItemInOrder)
    private readonly itemsInOrdersRepository: Repository<ItemInOrder>,
  ) {}

  async create(createItemsInOrderDto: CreateItemsInOrderDto): Promise<void> {
    try {
      const itemInOrder = this.itemsInOrdersRepository.create(createItemsInOrderDto);

      await this.itemsInOrdersRepository.save(itemInOrder);
    } catch (error) {
      validateError(error);
    }
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
