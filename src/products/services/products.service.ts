import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoriesService } from 'src/categories/categories.service';
import { validateError } from 'src/shared';
import { Product, Variant } from '../entities';
import {
  CreateProductDto,
  CreateVariantDto,
  UpdateProductDto,
  UpdateVariantDto,
} from '../dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    @InjectRepository(Variant) private readonly variantsRepository: Repository<Variant>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    try {
      const { variant, ...rest } = createProductDto;

      //** pasamos category como "ANY" porque nos llega un ID
      await this.categoriesService.findOne(createProductDto.category as any);

      const newProduct = this.productsRepository.create({ ...rest });

      await this.productsRepository.save(newProduct);
      await this.createVariant(newProduct.id, variant);
    } catch (error) {
      validateError(error);
    }
  }

  async createVariant(
    productId: number,
    createVariantDto: CreateVariantDto,
  ): Promise<void> {
    try {
      const product = await this.getProduct(productId);
      const newVariant = this.variantsRepository.create({ ...createVariantDto, product });

      await this.variantsRepository.save(newVariant);
    } catch (error) {
      validateError(error);
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      return await this.productsRepository.find({
        relations: { variants: { size: true, color: true }, category: true },
        order: { id: 'asc' },
      });
    } catch (error) {
      validateError(error);
    }
  }

  async getProduct(productId: number): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: productId },
        relations: { variants: { size: true, color: true }, category: true },
      });

      if (!product) {
        throw new NotFoundException(`Cannot find product with id ${productId}`);
      }

      return product;
    } catch (error) {
      validateError(error);
    }
  }

  async getVariant(variantId: number): Promise<Variant> {
    try {
      const variant = await this.variantsRepository.findOneBy({ id: variantId });

      if (!variant) {
        throw new NotFoundException(`Variant ${variantId} not found`);
      }

      return variant;
    } catch (error) {
      validateError(error);
    }
  }

  async updateProduct(
    productId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    try {
      await this.getProduct(productId);
      const { category } = updateProductDto;

      if (!!category) {
        await this.categoriesService.findOne(category as any);
      }

      return await this.productsRepository.update(productId, { ...updateProductDto });
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
      await this.getProduct(productId);
      await this.getVariant(variantId);

      return await this.variantsRepository.update(variantId, { ...updateVariantDto });
    } catch (error) {
      validateError(error);
    }
  }

  async removeProduct(productId: number): Promise<DeleteResult> {
    try {
      await this.getProduct(productId);

      return await this.productsRepository.softDelete(productId);
    } catch (error) {
      validateError(error);
    }
  }

  async removeVariant(productId: number, variantId: number): Promise<DeleteResult> {
    try {
      await this.getProduct(productId);
      await this.getVariant(variantId);

      return await this.variantsRepository.softDelete(variantId);
    } catch (error) {
      validateError(error);
    }
  }
}
