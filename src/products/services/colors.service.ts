import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { capitalize, validateError } from 'src/shared';
import { Color } from '../entities';
import { CreateColorDto, UpdateColorDto } from '../dto';

export class ColorsService {
  constructor(
    @InjectRepository(Color) private readonly colorsRepository: Repository<Color>,
  ) {}

  async findAll(): Promise<Color[]> {
    return await this.colorsRepository.find();
  }

  async findOne(id: number): Promise<Color> {
    try {
      const color = await this.colorsRepository.findOneBy({ id });

      if (!color) {
        throw new NotFoundException(`Could not find color ${id}`);
      }

      return color;
    } catch (error) {
      validateError(error);
    }
  }

  async create(createColorDto: CreateColorDto): Promise<void> {
    try {
      const { name, code } = createColorDto;

      const newColor = this.colorsRepository.create({
        name: capitalize(name),
        code,
      });

      await this.colorsRepository.save(newColor);
    } catch (error) {
      validateError(error);
    }
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);
      let colorToUpdate = {};

      if (updateColorDto.hasOwnProperty('name')) {
        colorToUpdate = { ...updateColorDto, name: capitalize(updateColorDto.name) };
      }

      return await this.colorsRepository.update(id, colorToUpdate);
    } catch (error) {
      validateError(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      await this.findOne(id);

      return await this.colorsRepository.delete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
