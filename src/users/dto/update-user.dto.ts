import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Roles } from '../types/roles.enum';

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsEnum(Roles)
  @IsOptional()
  role?: Roles;
}
