import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from 'src/categories/categories.module';
import { Color, Image, Product, Review, Size, Variant } from './entities';
import { ColorsController, ProductsController, SizesController } from './controllers';
import {
  CloudinaryService,
  ColorsService,
  ImagesService,
  ProductsService,
  ReviewsService,
  SizesService,
  VariantsService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Color, Image, Product, Review, Size, Variant]),
    CategoriesModule,
  ],
  controllers: [ColorsController, ProductsController, SizesController],
  providers: [
    CloudinaryService,
    ColorsService,
    ImagesService,
    ProductsService,
    ReviewsService,
    SizesService,
    VariantsService,
  ],
  exports: [SizesService],
})
export class ProductsModule {}
