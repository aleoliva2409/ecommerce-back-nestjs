import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/users/types/roles.enum';
import { ROLES_KEY } from '../utils';

export const RolesAllowed = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
