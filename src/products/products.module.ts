import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from 'src/categories/categories.module';
import { VariantsModule } from 'src/variants/variants.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule, VariantsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
