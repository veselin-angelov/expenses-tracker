import { Button } from '@mui/material';
import { useCurrentUser } from '../contexts/UserContext';
import { ProfileIcon } from './ProfileIcon';
import { userInfoStorage } from '../services/user-info-service';

export function Auth() {
  const user = useCurrentUser();

  if (user) {
    return <ProfileIcon user={user} />;
  }

  return (
    <Button
      onClick={() => userInfoStorage.setUser({ username: 'avera mi qnko' })}
    >
      Login
    </Button>
  );
}
