import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesService } from 'src/categories/categories.service';
import { VariantsService } from 'src/variants/variants.service';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly variantsService: VariantsService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, variant, ...rest } = createProductDto;

    await this.categoriesService.findOne(categoryId);

    const newProduct = this.productsRepository.create({
      ...rest,
      category: { id: categoryId },
    });

    await this.productsRepository.save(newProduct);
    await this.variantsService.create({ ...variant, productId: newProduct.id });

    //TODO revisar
    return await this.findOne(newProduct.id);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: { variants: true, category: true },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
