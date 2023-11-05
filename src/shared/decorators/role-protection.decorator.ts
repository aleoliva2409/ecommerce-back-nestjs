import { UseGuards, applyDecorators } from '@nestjs/common';

import { RolesAllowed } from './roles-allowed.decorator';
import { Roles } from 'src/users/types/roles.enum';
import { RoleProtectionGuard } from '../guards';

export const RoleProtection = (...roles: Roles[]) =>
  applyDecorators(RolesAllowed(...roles), UseGuards(RoleProtectionGuard));
