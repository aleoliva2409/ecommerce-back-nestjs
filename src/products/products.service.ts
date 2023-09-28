import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoriesService } from 'src/categories/categories.service';
import { VariantsService } from 'src/variants/variants.service';
import { validateError } from 'src/shared';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly variantsService: VariantsService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    try {
      const { variant, ...rest } = createProductDto;

      //** pasamos category como "ANY" porque nos llega un ID
      await this.categoriesService.findOne(createProductDto.category as any);

      const newProduct = this.productsRepository.create({ ...rest });

      await this.productsRepository.save(newProduct);
      await this.variantsService.create({ ...variant, product: newProduct });
    } catch (error) {
      validateError(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productsRepository.find({
        relations: { variants: true, category: true },
        order: { id: 'asc' },
      });
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id },
        relations: { variants: true, category: true },
      });

      if (!product) {
        throw new NotFoundException(`Cannot find product with id ${id}`);
      }

      return product;
    } catch (error) {
      validateError(error);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);

      return await this.productsRepository.update(id, { ...updateProductDto });
    } catch (error) {
      validateError(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      await this.findOne(id);

      return await this.productsRepository.softDelete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
