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

import { ItemsInOrdersService } from './items-in-orders.service';
import { CreateItemsInOrderDto, UpdateItemsInOrderDto } from './dto';

@Controller('items-in-orders')
export class ItemsInOrdersController {
  constructor(private readonly itemsInOrdersService: ItemsInOrdersService) {}

  @Post()
  create(@Body() createItemsInOrderDto: CreateItemsInOrderDto) {
    return this.itemsInOrdersService.create(createItemsInOrderDto);
  }

  @Get()
  findAll() {
    return this.itemsInOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsInOrdersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemsInOrderDto: UpdateItemsInOrderDto,
  ) {
    return this.itemsInOrdersService.update(id, updateItemsInOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsInOrdersService.remove(id);
  }
}
