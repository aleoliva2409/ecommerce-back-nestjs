import { Injectable } from '@nestjs/common';
import { SizesService } from 'src/products/services';
import { SizesData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly sizesService: SizesService) {}

  async addSizes() {
    await this.sizesService.deleteAllSizes();

    SizesData.forEach(async (s) => {
      await this.sizesService.create(s);
    });
  }

  //TODO: add categories

  findAll() {
    return `This action returns all seed`;
  }
}
