import { useCurrentUser } from '../contexts/UserContext';
import { ProfileIcon } from './ProfileIcon';
import { userInfoStorage } from '../services/user-info-service';
import { GoogleLogin } from '@react-oauth/google';

export function Auth() {
  const user = useCurrentUser();

  if (user) {
    return <ProfileIcon user={user} />;
  }

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        // TODO: set the token to the backend for handling
        userInfoStorage.setUser({
          username: credentialResponse.credential ?? '',
        });
      }}
      onError={() => {
        // eslint-disable-next-line no-console
        console.log('Login Failed');
      }}
      useOneTap
    />
  );
}
