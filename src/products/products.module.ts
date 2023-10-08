import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from 'src/categories/categories.module';
import { Color, Product, Size, Variant } from './entities';
import { ColorsController, ProductsController, SizesController } from './controllers';
import { ColorsService, ProductsService, SizesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Product, Size, Variant]), CategoriesModule],
  controllers: [ProductsController, SizesController, ColorsController],
  providers: [ProductsService, SizesService, ColorsService],
})
export class ProductsModule {}
