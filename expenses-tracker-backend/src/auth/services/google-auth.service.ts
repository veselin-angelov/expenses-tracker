import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleLoginService {
  constructor(
    private readonly configService: ConfigService,
    private readonly client: OAuth2Client,
  ) {}

  async decodeToken(token: string) {
    let ticket;

    try {
      ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.configService.get<string>('GOOGLE_API_CLIENT_ID'),
      });
    } catch (error) {
      throw new BadRequestException('Invalid Google token');
    }

    const payload = ticket.getPayload();

    if (!payload) {
      throw new BadRequestException('No token payload provided');
    }

    return this.extractUserInfoFromPayload(payload);
  }

  private extractUserInfoFromPayload(payload: TokenPayload) {
    const { email, picture, name } = payload;
    if (!email || !picture || !name) {
      throw new BadRequestException('Empty token payload');
    }

    return { email, picture, name };
  }
}
