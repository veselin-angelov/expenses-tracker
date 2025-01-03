import { eventManager } from '../lib/event-manager';
import { HttpService } from './http-service';
import { tokenStorage } from './user-info-service';

interface LoginResponseToken {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private http: HttpService;
  constructor() {
    this.http = new HttpService();
    eventManager.subscribe('unauthorized', this.refresh.bind(this));
  }

  async login(googleToken: string) {
    const result = await this.http.post<LoginResponseToken>('/auth/login', {
      body: { token: googleToken },
    });
    tokenStorage.setAccessToken(result.accessToken);
    tokenStorage.setRefreshToken(result.refreshToken);
  }

  async emailPasswordLogin(email: string, password: string) {
    const result = await this.http.post<LoginResponseToken>(
      '/auth/email-password-login',
      {
        body: { email, password },
      },
    );
    tokenStorage.setAccessToken(result.accessToken);
    tokenStorage.setRefreshToken(result.refreshToken);
  }

  async logout(userId: string) {
    await this.http.post<{ message: string }>('/auth/logout', {
      body: {
        id: userId,
      },
    });

    tokenStorage.removeAccessToken();
    tokenStorage.removeRefreshToken();
  }

  async refresh() {
    const refreshToken = tokenStorage.refreshToken;
    tokenStorage.removeAccessToken();
    const response = await this.http.post<LoginResponseToken>('/auth/refresh', {
      headers: refreshToken ? { Authorization: `Bearer ${refreshToken}` } : {},
    });

    tokenStorage.setAccessToken(response.accessToken);
    tokenStorage.setRefreshToken(response.refreshToken);
  }
}

export const authService = new AuthService();
