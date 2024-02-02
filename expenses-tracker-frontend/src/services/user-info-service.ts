import { jwtDecode } from 'jwt-decode';
import { LocalStorage } from '../lib/local-storage';

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export type AuthHandler = (user: UserInfo | undefined) => void;

class TokenStorage {
  private handler: AuthHandler | undefined = undefined;
  private accessTokenStorage = new LocalStorage('accessToken');
  private refreshTokenStorage = new LocalStorage('refreshToken');

  setHandler(handler: AuthHandler | undefined) {
    this.handler = handler;
  }

  get accessToken() {
    return this.accessTokenStorage.get();
  }

  setAccessToken(accessToken: string) {
    this.accessTokenStorage.set(accessToken);
    this.handler?.(this.userInfo);
  }

  removeAccessToken() {
    this.accessTokenStorage.clear();
    this.handler?.(undefined);
  }

  get refreshToken() {
    return this.refreshTokenStorage.get();
  }

  setRefreshToken(refreshToken: string) {
    this.refreshTokenStorage.set(refreshToken);
  }

  removeRefreshToken() {
    this.refreshTokenStorage.clear();
  }

  get userInfo() {
    return this.accessToken
      ? this.userInfoFromToken(this.accessToken)
      : undefined;
  }

  private userInfoFromToken(token: string): UserInfo {
    return jwtDecode(token);
  }
}

export const tokenStorage = new TokenStorage();
