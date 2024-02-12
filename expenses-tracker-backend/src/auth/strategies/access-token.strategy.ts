import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@app/users/repositories';
import { User } from '@app/users/entities';
import { JWT_CONFIG_KEY, JwtConfig } from '@app/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<JwtConfig>(JWT_CONFIG_KEY)!.secretKey,
    });
  }

  async validate(payload: any): Promise<User> {
    return this.userRepository.findOneOrFail({ id: payload.id, active: true });
  }
}
