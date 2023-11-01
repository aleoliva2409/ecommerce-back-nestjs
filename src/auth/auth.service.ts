import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  signUp(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
