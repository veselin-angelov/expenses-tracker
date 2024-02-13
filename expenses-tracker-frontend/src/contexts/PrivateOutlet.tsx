import { Outlet } from 'react-router';

import { useCurrentUser } from './UserContext';
import { Start } from '../pages/Start';

export function PrivateOutlet() {
  const user = useCurrentUser();
  return user ? <Outlet /> : <Start />;
}
