import { UseGuards, applyDecorators } from '@nestjs/common';

import { RolesAllowed } from './roles-allowed.decorator';
import { Roles } from 'src/users/types/roles.enum';
import { JwtAuthGuard, RoleProtectionGuard } from '../guards';

export const Auth = (...roles: Roles[]) =>
  applyDecorators(RolesAllowed(...roles), UseGuards(JwtAuthGuard, RoleProtectionGuard));
