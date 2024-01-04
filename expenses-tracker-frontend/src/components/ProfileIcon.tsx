import { Avatar } from '@mui/material';
import { UserInfo } from '../services/user-info-service';

interface ProfileIconProps {
  user: UserInfo;
}

export function ProfileIcon({ user }: ProfileIconProps) {
  return <Avatar alt={user.username} src={'...'} />;
}
