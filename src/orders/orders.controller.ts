import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { Auth, GetUser, RoleProtection } from 'src/shared';
import { Roles } from 'src/users/types/roles.enum';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Auth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @RoleProtection(Roles.client)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser('id') userId: number) {
    return this.ordersService.create(createOrderDto, userId);
  }

  @RoleProtection(Roles.all)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @RoleProtection(Roles.all)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @RoleProtection(Roles.admin)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @RoleProtection(Roles.admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
