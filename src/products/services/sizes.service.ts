import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Size } from '../entities';

export class SizesService {
  constructor(
    @InjectRepository(Size) private readonly sizesRepository: Repository<Size>,
  ) {}

  async getSizes(): Promise<Size[]> {
    return await this.sizesRepository.find();
  }
}
