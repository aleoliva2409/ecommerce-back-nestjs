import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { Auth, PublicAccess, RoleProtection } from 'src/shared';
import { Roles } from 'src/users/types/roles.enum';
import { ColorsService } from '../services';
import { CreateColorDto, UpdateColorDto } from '../dto';

@Auth()
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @PublicAccess()
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @RoleProtection(Roles.admin)
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @RoleProtection(Roles.admin)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateColorDto: UpdateColorDto) {
    return this.colorsService.update(id, updateColorDto);
  }

  @RoleProtection(Roles.admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colorsService.remove(id);
  }
}
