import { Controller, Get } from '@nestjs/common';

import { ColorsService } from '../services';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  getColors() {
    return this.colorsService.getColors();
  }
}
