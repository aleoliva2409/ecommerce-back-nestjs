import { SetMetadata } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '../utils';

export const PublicAccess = () => SetMetadata(IS_PUBLIC_KEY, true);
