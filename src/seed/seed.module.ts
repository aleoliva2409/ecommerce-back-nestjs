import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
