import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { validateError } from 'src/shared';
import { Variant } from '../entities';
import { CreateVariantDto, UpdateVariantDto } from '../dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant) private readonly variantsRepository: Repository<Variant>,
  ) {}

  async create(createVariantDto: CreateVariantDto): Promise<void> {
    try {
      await this.variantsRepository.save(createVariantDto);
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(variantId: number): Promise<Variant> {
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

  async update(id: number, updateVariantDto: UpdateVariantDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);

      return await this.variantsRepository.update(id, updateVariantDto);
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
