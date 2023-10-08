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

  async getColors(): Promise<Color[]> {
    return await this.colorsRepository.find();
  }

  async getColor(id: number): Promise<Color> {
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

  async createColor(createColorDto: CreateColorDto): Promise<void> {
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

  async updateColor(id: number, updateColorDto: UpdateColorDto): Promise<UpdateResult> {
    try {
      await this.getColor(id);
      let colorToUpdate = {};

      if (updateColorDto.hasOwnProperty('name')) {
        colorToUpdate = { ...updateColorDto, name: capitalize(updateColorDto.name) };
      }

      return await this.colorsRepository.update(id, colorToUpdate);
    } catch (error) {
      validateError(error);
    }
  }

  async removeColor(id: number): Promise<DeleteResult> {
    try {
      await this.getColor(id);

      return await this.colorsRepository.delete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
