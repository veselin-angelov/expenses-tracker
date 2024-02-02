import { HttpService } from './http-service';
import { tokenStorage } from './user-info-service';

interface LoginResponseToken {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private http = new HttpService();

  async login(googleToken: string) {
    const result = await this.http.post<LoginResponseToken>('/auth/login', {
      body: { token: googleToken },
    });
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

  // should have a refresh call
}

export const authService = new AuthService();
