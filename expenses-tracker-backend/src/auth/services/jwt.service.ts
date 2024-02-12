import { UserInfoDto } from '@app/users/dtos/user-info.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { JWT_CONFIG_KEY, JwtConfig } from '@app/config';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  create(data: UserInfoDto): Tokens {
    const { secretKey, expiryTime, refreshTokenExpiryTime } =
      this.configService.get<JwtConfig>(JWT_CONFIG_KEY)!;

    return {
      accessToken: jwt.sign(
        {
          id: data.id,
          email: data.email,
          picture: data.picture,
          name: data.name,
        },
        secretKey,
        {
          expiresIn: expiryTime,
        },
      ),
      refreshToken: jwt.sign(
        {
          id: data.id,
          email: data.email,
          picture: data.picture,
          name: data.name,
        },
        secretKey,
        {
          expiresIn: refreshTokenExpiryTime,
        },
      ),
    };
  }

  check(token: string): UserInfoDto {
    const { secretKey } = this.configService.get<JwtConfig>(JWT_CONFIG_KEY)!;

    return jwt.verify(token, secretKey) as UserInfoDto;
  }
}
