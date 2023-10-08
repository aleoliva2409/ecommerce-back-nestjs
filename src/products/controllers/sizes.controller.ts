import { Controller, Get } from '@nestjs/common';

import { SizesService } from '../services';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get()
  getSizes() {
    return this.sizesService.getSizes();
  }
}
