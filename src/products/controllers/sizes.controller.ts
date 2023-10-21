import { Controller, Get, Query } from '@nestjs/common';

import { SizesService } from '../services';
import { SizeType } from '../types';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get()
  findAll(@Query('type') type: SizeType) {
    return this.sizesService.findAll(type);
  }
}
