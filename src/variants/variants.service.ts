import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Variant } from './entities/variant.entity';
import { CreateVariantDto, UpdateVariantDto } from './dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant) private readonly variantsRepository: Repository<Variant>,
  ) {}

  async create(createVariantDto: CreateVariantDto): Promise<Variant> {
    const { productId, ...rest } = createVariantDto;

    const newVariant = this.variantsRepository.create({
      ...rest,
      product: { id: productId },
    });

    await this.variantsRepository.save(newVariant);

    return newVariant;
  }

  async findAll(): Promise<Variant[]> {
    return await this.variantsRepository.find();
  }

  async findOne(id: number): Promise<Variant> {
    const variant = await this.variantsRepository.findOneBy({ id });

    return variant;
  }

  update(id: number, updateVariantDto: UpdateVariantDto) {
    console.log(updateVariantDto);
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
