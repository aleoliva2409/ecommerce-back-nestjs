import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { validateError } from 'src/shared';
import { Review } from '../entities';
import { CreateReviewDto } from '../dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewsRepository: Repository<Review>,
  ) {}

  async create(review: CreateReviewDto): Promise<void> {
    try {
      await this.reviewsRepository.save(review);
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(id: number): Promise<Review> {
    try {
      const review = await this.reviewsRepository.findOneBy({ id });

      if (!review) {
        throw new NotFoundException(`Review ${id} not found`);
      }

      return review;
    } catch (error) {
      validateError(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      await this.findOne(id);

      return await this.reviewsRepository.softDelete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
