import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserInfo, userInfoStorage } from '../services/user-info-service';

const UserContext = createContext<UserInfo | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | undefined>(
    userInfoStorage.userInfo,
  );

  useEffect(() => {
    userInfoStorage.setHandler(setUser);

    return () => {
      userInfoStorage.setHandler(undefined);
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}
