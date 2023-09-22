import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsInOrdersService } from './items-in-orders.service';
import { CreateItemsInOrderDto } from './dto/create-items-in-order.dto';
import { UpdateItemsInOrderDto } from './dto/update-items-in-order.dto';

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
  findOne(@Param('id') id: string) {
    return this.itemsInOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemsInOrderDto: UpdateItemsInOrderDto) {
    return this.itemsInOrdersService.update(+id, updateItemsInOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsInOrdersService.remove(+id);
  }
}
