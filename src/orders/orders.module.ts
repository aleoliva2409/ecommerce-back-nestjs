import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ItemInOrder, Order } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order, ItemInOrder])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
