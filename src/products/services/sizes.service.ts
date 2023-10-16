import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Size } from '../entities';

export class SizesService {
  constructor(
    @InjectRepository(Size) private readonly sizesRepository: Repository<Size>,
  ) {}

  async findAll(): Promise<Size[]> {
    return await this.sizesRepository.find();
  }

  async create(size): Promise<void> {
    return await this.sizesRepository.save(size);
  }

  async deleteAllSizes() {
    const query = this.sizesRepository.createQueryBuilder('size');

    return await query.delete().where({}).execute();
  }
}
