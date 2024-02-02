import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserInfo, tokenStorage } from '../services/user-info-service';

const UserContext = createContext<UserInfo | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | undefined>(
    tokenStorage.userInfo,
  );

  useEffect(() => {
    tokenStorage.setHandler(setUser);

    return () => {
      tokenStorage.setHandler(undefined);
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}
