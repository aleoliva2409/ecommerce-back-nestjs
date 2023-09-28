import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const validateError = (error) => {
  if (error instanceof NotFoundException) {
    throw new NotFoundException(error.message);
  }

  if (error instanceof BadRequestException) {
    throw new BadRequestException(error.message);
  }

  if (error instanceof UnauthorizedException) {
    throw new UnauthorizedException(error.message);
  }

  throw new InternalServerErrorException(error);
  // throw new InternalServerErrorException('Server error, check logs for more details');
};
