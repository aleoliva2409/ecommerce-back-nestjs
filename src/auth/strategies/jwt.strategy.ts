import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // async validate(payload: JwtPayload): Promise<User> {
  //   const { id } = payload;

  //   const user = await this.userRepository.findOneBy({ id });

  //   if (!user) throw new UnauthorizedException('Token not valid');

  //   if (!user.isActive)
  //     throw new UnauthorizedException('User is inactive, talk with an admin');

  //   // ? se agrega a la request
  //   return user;
  // }

  async validate() {}
}
