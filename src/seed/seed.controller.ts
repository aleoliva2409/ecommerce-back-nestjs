import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('sizes')
  addSizes() {
    return this.seedService.findAll();
  }

  @Get('products')
  addProducts() {
    return this.seedService.findAll();
  }

  @Get('categories')
  addCategories() {
    return this.seedService.findAll();
  }
}
