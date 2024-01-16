import { useCurrentUser } from '../contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import { authService } from '../services/auth-service';
import { ProfileIcon } from './ProfileIcon';

export function Auth() {
  const user = useCurrentUser();

  if (user) {
    return <ProfileIcon user={user} />;
  }

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        authService.login(credentialResponse.credential ?? '');
      }}
      onError={() => {
        // eslint-disable-next-line no-console
        console.log('Login Failed');
      }}
      useOneTap
    />
  );
}
