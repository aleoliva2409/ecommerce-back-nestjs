import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Color } from '../entities';

export class ColorsService {
  constructor(
    @InjectRepository(Color) private readonly colorsRepository: Repository<Color>,
  ) {}

  async getColors(): Promise<Color[]> {
    return await this.colorsRepository.find();
  }
}
