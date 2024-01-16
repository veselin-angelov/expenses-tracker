import { jwtDecode } from 'jwt-decode';
import { LocalStorage } from '../lib/local-storage';

export interface UserInfo {
  email: string;
  name: string;
  picture: string;
}

export type AuthHandler = (user: UserInfo | undefined) => void;

class UserInfoStorage {
  private handler: AuthHandler | undefined = undefined;
  private storage = new LocalStorage('token');

  setHandler(handler: AuthHandler | undefined) {
    this.handler = handler;
  }

  get token() {
    return this.storage.get();
  }

  setToken(token: string) {
    this.storage.set(token);
    this.handler?.(this.userInfo);
  }

  removeToken() {
    this.storage.clear();
    this.handler?.(undefined);
  }

  get userInfo() {
    return this.token ? this.userInfoFromToken(this.token) : undefined;
  }

  private userInfoFromToken(token: string): UserInfo {
    return jwtDecode(token);
  }
}

export const userInfoStorage = new UserInfoStorage();
