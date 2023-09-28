import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { validateError } from 'src/shared';
import { Variant } from './entities/variant.entity';
import { CreateVariantDto, UpdateVariantDto } from './dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant) private readonly variantsRepository: Repository<Variant>,
  ) {}

  async create(createVariantDto: CreateVariantDto): Promise<void> {
    try {
      const newVariant = this.variantsRepository.create(createVariantDto);

      await this.variantsRepository.save(newVariant);
    } catch (error) {
      validateError(error);
    }
  }

  async findAll(): Promise<Variant[]> {
    try {
      return await this.variantsRepository.find();
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(id: number): Promise<Variant> {
    try {
      const variant = await this.variantsRepository.findOneBy({ id });

      if (!variant) {
        throw new NotFoundException(`Cannot find variant with id ${id}`);
      }

      return variant;
    } catch (error) {
      validateError(error);
    }
  }

  async update(id: number, updateVariantDto: UpdateVariantDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);

      return await this.variantsRepository.update(id, { ...updateVariantDto });
    } catch (error) {
      validateError(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      await this.findOne(id);

      return await this.variantsRepository.softDelete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
