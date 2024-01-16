import { LocalStorage } from '../lib/local-storage';

interface UserInfo {
  email: string;
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

  setUser(token: string) {
    this.storage.set(token);
    this.handler?.(this.userInfo);
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
    // return this.token ? this.userInfoFromToken(this.token) : undefined;
    return this.token;
  }

  // private userInfoFromToken(token: string) {
  //   return jwtDecode(token);
  // }
}

export const userInfoStorage = new UserInfoStorage();
