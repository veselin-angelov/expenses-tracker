import { UserInfoDto } from '@app/users/dtos/user-info.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  create(data: UserInfoDto): Tokens {
    // TODO: Figure out how to setup the configs properly
    // const { privateKey, expiryTime } = this.configService.get('jwt');
    const privateKey = this.configService.get('JWT_SECRET');
    const expiryTime = this.configService.get<string>('JWT_EXPIRY_TIME');
    const refreshExpiryTime = this.configService.get<string>(
      'JWT_REFRESH_EXPIRY_TIME',
    );

    return {
      accessToken: jwt.sign(
        {
          id: data.id,
          email: data.email,
          picture: data.picture,
          name: data.name,
        },
        privateKey,
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
        privateKey,
        {
          expiresIn: refreshExpiryTime,
        },
      ),
    };
  }

  check(token: string): UserInfoDto {
    const privateKey = this.configService.get('JWT_SECRET');
    return jwt.verify(token, privateKey) as UserInfoDto;
  }
}
