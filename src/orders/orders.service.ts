import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { validateError } from 'src/shared';
import { ItemInOrder, Order } from './entities';
import { AddItemInOrderDto, CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(ItemInOrder)
    private readonly itemsInOrdersRepository: Repository<ItemInOrder>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<void> {
    try {
      const { products, ...rest } = createOrderDto;
      const order = this.ordersRepository.create({ ...rest });

      await this.ordersRepository.save(order);

      products.forEach(async (product: any) => {
        await this.addItemInOrder({
          product: product.id,
          order: order,
          quantity: product.quantity,
        });
      });
    } catch (error) {
      validateError(error);
    }
  }

  async addItemInOrder(addItemInOrderDto: AddItemInOrderDto): Promise<void> {
    try {
      const itemInOrder = this.itemsInOrdersRepository.create(addItemInOrderDto);

      await this.itemsInOrdersRepository.save(itemInOrder);
    } catch (error) {
      validateError(error);
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.ordersRepository.find({
        relations: { itemInOrder: { product: true } },
        order: { id: 'asc' },
      });
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(id: number): Promise<Order> {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: { itemInOrder: { product: true } },
      });

      if (!order) {
        throw new NotFoundException(`Order ${order.id} not found`);
      }

      return order;
    } catch (error) {
      validateError(error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);

      return await this.ordersRepository.update(id, { ...updateOrderDto });
    } catch (error) {
      validateError(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      await this.findOne(id);

      return await this.ordersRepository.softDelete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
