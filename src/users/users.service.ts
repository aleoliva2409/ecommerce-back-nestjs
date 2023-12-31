import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

import { validateError } from 'src/shared';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateProfileDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const userInDb = await this.findOneWithFilters({
        where: { email: userData.email },
      });

      if (userInDb.email) {
        throw new BadRequestException(`User ${userData.email} already exists`);
      }

      const user = this.usersRepository.create({
        ...userData,
        password: hashSync(password, 10),
      });

      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      validateError(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find({ where: { isActive: true } });
    } catch (error) {
      validateError(error);
    }
  }

  async findMe(user: User): Promise<User> {
    try {
      return await this.usersRepository.findOne({
        where: { id: user.id },
        relations: { orders: true },
      });
    } catch (error) {
      validateError(error);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User ${id} does not exist`);
      }

      return user;
    } catch (error) {
      validateError(error);
    }
  }

  async findOneWithFilters(filters: FindOneOptions<User>): Promise<User> {
    try {
      const user = await this.usersRepository.findOne(filters);

      if (!user) {
        throw new NotFoundException(`User ${user.id} does not exist`);
      }

      return user;
    } catch (error) {
      validateError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto | UpdateProfileDto) {
    try {
      this.findOne(id);

      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      validateError(error);
    }
  }

  async remove(id: number) {
    try {
      this.findOne(id);

      return await this.usersRepository.softDelete(id);
    } catch (error) {
      validateError(error);
    }
  }
}
