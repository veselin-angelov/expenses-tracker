import { Avatar, Menu, MenuItem } from '@mui/material';
import { UserInfo } from '../services/user-info-service';
import { useCallback, useRef, useState } from 'react';
import { authService } from '../services/auth-service';
import { useAsyncAction } from '../hooks/useAsyncAction';

interface ProfileIconProps {
  user: UserInfo;
}

export function ProfileIcon({ user }: ProfileIconProps) {
  const [isOpened, setIsOpened] = useState(false);
  const avatarRef = useRef(null);

  const { trigger: logout } = useAsyncAction(async () => {
    await authService.logout(user.id);
  });

  const handleClick = useCallback(() => {
    setIsOpened(true);
  }, [setIsOpened]);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <>
      <Avatar
        ref={avatarRef}
        src={user.picture}
        alt={user.email}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      <Menu
        anchorEl={avatarRef.current}
        open={isOpened}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem key={'option1'} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem key={'option2'} onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
