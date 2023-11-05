import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/users/types/roles.enum';
import { ROLES_KEY } from '../utils';

@Injectable()
export class RoleProtectionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const rolesAllowed: Roles[] = this.reflector.get(ROLES_KEY, context.getHandler());

    if (!rolesAllowed) return true;
    if (rolesAllowed.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new UnauthorizedException('Your user is not authenticated');

    if (!rolesAllowed.includes(user.role)) {
      throw new UnauthorizedException('You do not have permissions to access');
    }

    return true;
  }
}
