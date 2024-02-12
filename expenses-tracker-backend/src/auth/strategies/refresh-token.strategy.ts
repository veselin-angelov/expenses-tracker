import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserRepository } from '@app/users/repositories';
import { User } from '@app/users/entities';
import { JWT_CONFIG_KEY, JwtConfig } from '@app/config';
import * as argon from 'argon2';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<JwtConfig>(JWT_CONFIG_KEY)!.secretKey,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<User> {
    const plainRefreshToken = request
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!plainRefreshToken) {
      throw new ForbiddenException('Refresh token malformed');
    }

    // TODO: move tokens to a separate entity
    const user = await this.userRepository.findOne({
      id: payload.id,
      active: true,
    });

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const tokensMatch = await argon.verify(
      user.refreshToken,
      plainRefreshToken,
    );

    if (!tokensMatch) {
      throw new ForbiddenException('Access Denied');
    }

    user.refreshToken = plainRefreshToken;

    return user;
  }
}
