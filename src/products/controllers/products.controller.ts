import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ProductsService } from '../services';
import {
  CreateProductDto,
  CreateReviewDto,
  CreateVariantDto,
  UpdateProductDto,
  UpdateVariantDto,
} from '../dto';
import { Auth } from 'src/shared';
import { Roles } from 'src/users/types/roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(Roles.admin)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':productId')
  findOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Auth(Roles.admin)
  @Patch(':productId')
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Auth(Roles.admin)
  @Delete(':productId')
  remove(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.remove(productId);
  }

  @Auth(Roles.admin)
  @Post(':productId/variants')
  createVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createVariantDto: CreateVariantDto,
  ) {
    return this.productsService.createVariant(productId, createVariantDto);
  }

  @Auth(Roles.admin)
  @Patch(':productId/variants/:variantId')
  updateVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.productsService.updateVariant(productId, variantId, updateVariantDto);
  }

  @Auth(Roles.admin)
  @Delete(':productId/variants/:variantId')
  removeVariant(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
  ) {
    return this.productsService.removeVariant(productId, variantId);
  }

  @Auth(Roles.client)
  @Post(':productId/reviews')
  createReview(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.productsService.createReview(productId, createReviewDto);
  }

  @Auth(Roles.admin)
  @Delete(':productId/reviews/:reviewsId')
  removeReview(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('reviewsId', ParseIntPipe) reviewsId: number,
  ) {
    return this.productsService.removeReview(productId, reviewsId);
  }
}
