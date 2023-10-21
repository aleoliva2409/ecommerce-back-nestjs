import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('sizes')
  addSizes() {
    return this.seedService.addSizes();
  }

  @Get('categories')
  addCategories() {
    return this.seedService.addCategories();
  }
}
