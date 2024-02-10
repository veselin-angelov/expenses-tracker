import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserInfoDto } from '@app/users/dtos/user-info.dto';

@Injectable()
export class AuthTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secretKey'),
    });
  }

  async validate(payload: any): Promise<UserInfoDto> {
    return {
      id: payload.id,
      email: payload.email,
      picture: payload.picture,
      name: payload.name,
    };
  }
}
