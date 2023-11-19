import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateProfileDto, UpdateUserDto } from './dto';
import { Auth, GetUser, RoleProtection } from 'src/shared';
import { User } from './entities/user.entity';
import { Roles } from './types/roles.enum';

@Auth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RoleProtection(Roles.admin, Roles.supervisor)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @RoleProtection(Roles.client)
  @Get('me')
  findMe(@GetUser() user: User) {
    return this.usersService.findMe(user);
  }

  @RoleProtection(Roles.client)
  @Patch('me')
  updateProfile(@GetUser() user: User, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.update(user.id, updateProfileDto);
  }

  @RoleProtection(Roles.admin)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @RoleProtection(Roles.admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
