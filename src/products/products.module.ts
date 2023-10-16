import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from 'src/categories/categories.module';
import { Color, Product, Review, Size, Variant } from './entities';
import { ColorsController, ProductsController, SizesController } from './controllers';
import {
  ColorsService,
  ProductsService,
  ReviewsService,
  SizesService,
  VariantsService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Color, Product, Review, Size, Variant]),
    CategoriesModule,
  ],
  controllers: [ColorsController, ProductsController, SizesController],
  providers: [
    ColorsService,
    ProductsService,
    ReviewsService,
    SizesService,
    VariantsService,
  ],
  exports: [SizesService],
})
export class ProductsModule {}
