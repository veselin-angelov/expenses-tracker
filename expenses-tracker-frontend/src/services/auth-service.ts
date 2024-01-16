import { HttpService } from './http-service';
import { userInfoStorage } from './user-info-service';

interface LoginResponseToken {
  token: string;
}

class AuthService {
  private http = new HttpService();

  async login(googleToken: string) {
    const result = await this.http.post<LoginResponseToken>('/auth/login', {
      body: { token: googleToken },
    });
    userInfoStorage.setToken(result.token);
  }

  logout() {
    userInfoStorage.removeToken();
  }
}

export const authService = new AuthService();
