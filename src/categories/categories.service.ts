import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { capitalize, validateError } from 'src/shared';
import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<void> {
    try {
      const { name } = createCategoryDto;
      await this.categoriesRepository.save({ name: capitalize(name) });
    } catch (error) {
      validateError(error);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoriesRepository.find({ order: { id: 'asc' } });
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoriesRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException(`Cannot find category with id ${id}`);
      }

      return category;
    } catch (error) {
      validateError(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      const { name } = updateCategoryDto;

      await this.findOne(id);

      return await this.categoriesRepository.update(id, { name: capitalize(name) });
    } catch (error) {
      validateError(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      await this.findOne(id);

      return await this.categoriesRepository.delete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
