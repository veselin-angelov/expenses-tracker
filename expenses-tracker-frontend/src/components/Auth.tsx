import { useCurrentUser } from '../contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import { authService } from '../services/auth-service';
import { ProfileIcon } from './ProfileIcon';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Divider,
  Typography,
} from '@mui/material';

type LoginInputs = {
  email: string;
  password: string;
};

export function Auth() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>();
  const user = useCurrentUser();

  if (user) {
    return <ProfileIcon user={user} />;
  }

  const onSubmit = handleSubmit((data) => {
    authService.emailPasswordLogin(data.email, data.password);
    setOpen(false);
    reset();
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Sign In
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Sign in with Email
            </Button>
          </Box>

          <Box sx={{ my: 2 }}>
            <Divider>
              <Typography color="text.secondary">or</Typography>
            </Divider>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                authService.login(credentialResponse.credential ?? '');
                setOpen(false);
                reset();
              }}
              onError={() => console.log('Login Failed')}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
