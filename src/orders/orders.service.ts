import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { validateError } from 'src/shared';
import { VariantInOrder, Order } from './entities';
import { AddVariantInOrderDto, CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(VariantInOrder)
    private readonly itemsInOrdersRepository: Repository<VariantInOrder>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<void> {
    try {
      const { variants, ...rest } = createOrderDto;
      const order = this.ordersRepository.create({ ...rest });

      await this.ordersRepository.save(order);

      variants.forEach(async (variant: any) => {
        await this.addVariantInOrder({
          variant: variant.id,
          order: order,
          quantity: variant.quantity,
        });
      });
    } catch (error) {
      validateError(error);
    }
  }

  async addVariantInOrder(addVariantInOrderDto: AddVariantInOrderDto): Promise<void> {
    try {
      const variantInOrder = this.itemsInOrdersRepository.create(addVariantInOrderDto);

      await this.itemsInOrdersRepository.save(variantInOrder);
    } catch (error) {
      validateError(error);
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      return await this.ordersRepository.find({
        relations: {
          variantInOrder: { variant: { product: true, color: true, size: true } },
        },
        order: { id: 'asc' },
      });
    } catch (error) {
      validateError(error);
    }
  }

  async getOrder(id: number): Promise<Order> {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: {
          variantInOrder: { variant: { product: true, color: true, size: true } },
        },
      });

      if (!order) {
        throw new NotFoundException(`Order ${order.id} not found`);
      }

      return order;
    } catch (error) {
      validateError(error);
    }
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    try {
      await this.getOrder(id);

      return await this.ordersRepository.update(id, { ...updateOrderDto });
    } catch (error) {
      validateError(error);
    }
  }

  async removeOrder(id: number): Promise<DeleteResult> {
    try {
      await this.getOrder(id);

      return await this.ordersRepository.softDelete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
