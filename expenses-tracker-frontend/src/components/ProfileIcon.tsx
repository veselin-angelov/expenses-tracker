import { Avatar, Menu, MenuItem } from '@mui/material';
import { UserInfo } from '../services/user-info-service';
import { useCallback, useRef, useState } from 'react';
import { authService } from '../services/auth-service';

interface ProfileIconProps {
  user: UserInfo;
}

export function ProfileIcon({ user }: ProfileIconProps) {
  const [isOpened, setIsOpened] = useState(false);
  const avatarRef = useRef(null);

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
        {/* TODO: What should we have here */}
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={authService.logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
