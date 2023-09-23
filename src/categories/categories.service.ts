import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { capitalize } from 'src/shared/helpers/capitalize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    return await this.categoriesRepository.save({ name: capitalize(name) });
  }

  async findAll() {
    return await this.categoriesRepository.find({ order: { id: 'asc' } });
  }

  async findOne(id: number) {
    try {
      const category = await this.categoriesRepository.findOneBy({ id });

      if (!category) {
        throw new NotFoundException();
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Cannot find category with id ${id}`);
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { name } = updateCategoryDto;

    await this.findOne(id);

    return await this.categoriesRepository.update(id, { name: capitalize(name) });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.categoriesRepository.delete(id);
  }
}
