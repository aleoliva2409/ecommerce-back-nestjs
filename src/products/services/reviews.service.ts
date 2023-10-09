import { Injectable } from '@nestjs/common';

import { CreateReviewDto } from '../dto';

@Injectable()
export class ReviewsService {
  create(createReviewDto: CreateReviewDto) {
    console.log(createReviewDto);
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
