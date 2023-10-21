import { Injectable } from '@nestjs/common';

import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesData, SizesData } from './data/seed-data';
import { SizesService } from 'src/products/services';

@Injectable()
export class SeedService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly sizesService: SizesService,
  ) {}

  async addSizes(): Promise<string> {
    await this.sizesService.deleteAllSizes();

    SizesData.forEach(async (s) => {
      await this.sizesService.create(s);
    });

    return 'sizes added successfully';
  }

  async addCategories(): Promise<string> {
    await this.categoriesService.deleteAllCategories();

    CategoriesData.forEach(async (c) => {
      await this.categoriesService.create(c);
    });

    return 'categories added successfully';
  }
}
