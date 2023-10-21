import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Size } from '../entities';
import { ICreateSize, SizeType } from '../types';

export class SizesService {
  constructor(
    @InjectRepository(Size) private readonly sizesRepository: Repository<Size>,
  ) {}

  async findAll(type: SizeType): Promise<Size[]> {
    return await this.sizesRepository.find({
      where: { type },
      order: { order: 'asc' },
    });
  }

  async create(size: ICreateSize): Promise<void> {
    await this.sizesRepository.save(size);
  }

  async deleteAllSizes() {
    const query = this.sizesRepository.createQueryBuilder('size');

    return await query.delete().where({}).execute();
  }
}
