import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ColorsService } from '../services';
import { CreateColorDto, UpdateColorDto } from '../dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  findAll() {
    return this.colorsService.getColors();
  }

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.createColor(createColorDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.updateColor(id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colorsService.removeColor(id);
  }
}
