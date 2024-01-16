import { Injectable, BadRequestException } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleLoginService {
  private readonly client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new OAuth2Client(
      configService.get<string>('GOOGLE_API_CLIENT_ID'),
    );
  }

  async decodeToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.configService.get<string>('GOOGLE_API_CLIENT_ID'),
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new BadRequestException('No token payload provided');
      }

      const userInfo = this.extractUserInfoFromPayload(payload);
      return userInfo;
    } catch (error) {
      throw new BadRequestException('Invalid Google token');
    }
  }

  private extractUserInfoFromPayload(payload: TokenPayload) {
    const { email, picture, name } = payload;
    if (!email || !picture || !name) {
      throw new BadRequestException('Empty token payload');
    }

    return { email, picture, name };
  }
}
