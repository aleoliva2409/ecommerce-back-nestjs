import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsInOrdersService } from './items-in-orders.service';
import { ItemsInOrdersController } from './items-in-orders.controller';
import { ItemInOrder } from './entities/item-in-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemInOrder])],
  controllers: [ItemsInOrdersController],
  providers: [ItemsInOrdersService],
})
export class ItemsInOrdersModule {}
