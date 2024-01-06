import { LocalStorage } from '../lib/local-storage';

// TODO: Decide what user info we want to keep
export interface UserInfo {
  username: string;
}

export type AuthHandler = (user: UserInfo | undefined) => void;

class UserInfoStorage {
  private handler: AuthHandler | undefined = undefined;

  // TODO: After adding auth logic, change it so the
  // storage keeps the token instead
  private storage = new LocalStorage('user');

  setHandler(handler: AuthHandler | undefined) {
    this.handler = handler;
  }

  get user() {
    return this.storage.get();
  }

  setUser(userInfo: UserInfo) {
    this.storage.set(userInfo);
    this.handler?.(userInfo);
  }

  removeUser() {
    this.storage.clear();
    this.handler?.(undefined);
  }
}

export const userInfoStorage = new UserInfoStorage();
