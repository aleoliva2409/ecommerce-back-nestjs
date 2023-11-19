import { UseGuards, applyDecorators } from '@nestjs/common';

import { JwtAuthGuard } from '../guards';

export const Auth = () => applyDecorators(UseGuards(JwtAuthGuard));
