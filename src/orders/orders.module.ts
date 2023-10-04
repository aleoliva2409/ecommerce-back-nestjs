import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsInOrdersModule } from 'src/items-in-orders/items-in-orders.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ItemsInOrdersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
