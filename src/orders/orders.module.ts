import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { VariantInOrder, Order } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order, VariantInOrder])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
