import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoriesService } from 'src/categories/categories.service';
import { validateError } from 'src/shared';
import { Product } from '../entities';
import {
  CreateProductDto,
  CreateReviewDto,
  CreateVariantDto,
  UpdateProductDto,
  UpdateVariantDto,
} from '../dto';
import { ReviewsService } from './reviews.service';
import { VariantsService } from './variants.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly reviewsService: ReviewsService,
    private readonly variantsService: VariantsService,
  ) {}

  // *** PRODUCTS ***

  async create(createProductDto: CreateProductDto): Promise<void> {
    try {
      const { variant, ...rest } = createProductDto;

      // ??? pasamos category como "ANY" porque nos llega un ID ???
      await this.categoriesService.findOne(createProductDto.category as any);

      const newProduct = this.productsRepository.create({ ...rest });

      await this.productsRepository.save(newProduct);
      await this.createVariant(newProduct.id, variant);
    } catch (error) {
      validateError(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productsRepository.find({
        order: { id: 'asc' },
        relations: {
          category: true,
          reviews: true,
          variants: { size: true, color: true },
        },
      });
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(productId: number): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: productId },
        relations: {
          category: true,
          reviews: true,
          variants: { size: true, color: true },
        },
      });

      if (!product) {
        throw new NotFoundException(`Cannot find product with id ${productId}`);
      }

      return product;
    } catch (error) {
      validateError(error);
    }
  }

  async existProduct(id: number): Promise<void> {
    try {
      const product = await this.productsRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException(`Cannot find product with id ${id}`);
      }
    } catch (error) {
      validateError(error);
    }
  }

  async update(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    try {
      await this.existProduct(productId);
      const { category } = updateProductDto;

      if (!!category) {
        await this.categoriesService.findOne(category as any);
      }

      return await this.productsRepository.update(productId, { ...updateProductDto });
    } catch (error) {
      validateError(error);
    }
  }

  async remove(productId: number): Promise<DeleteResult> {
    try {
      await this.existProduct(productId);

      return await this.productsRepository.softDelete(productId);
    } catch (error) {
      validateError(error);
    }
  }

  // *** VARIANTS ***

  async createVariant(
    productId: number,
    createVariantDto: CreateVariantDto,
  ): Promise<void> {
    try {
      await this.existProduct(productId);

      await this.variantsService.create(createVariantDto);
    } catch (error) {
      validateError(error);
    }
  }

  async updateVariant(
    productId: number,
    variantId: number,
    updateVariantDto: UpdateVariantDto,
  ): Promise<UpdateResult> {
    try {
      await this.existProduct(productId);

      return await this.variantsService.update(variantId, { ...updateVariantDto });
    } catch (error) {
      validateError(error);
    }
  }

  async removeVariant(productId: number, variantId: number): Promise<DeleteResult> {
    try {
      await this.existProduct(productId);

      return await this.variantsService.remove(variantId);
    } catch (error) {
      validateError(error);
    }
  }

  // *** REVIEWS ***

  async createReview(productId: number, createReviewDto: CreateReviewDto): Promise<void> {
    try {
      await this.existProduct(productId);

      await this.reviewsService.create(createReviewDto);
    } catch (error) {
      validateError(error);
    }
  }

  async removeReview(productId: number, reviewId: number): Promise<DeleteResult> {
    try {
      await this.existProduct(productId);

      return await this.reviewsService.remove(reviewId);
    } catch (error) {
      validateError(error);
    }
  }
}
