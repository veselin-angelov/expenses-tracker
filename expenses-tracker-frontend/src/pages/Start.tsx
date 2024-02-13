import { Container, Typography } from '@mui/material';

export function Start() {
  return (
    <>
      {/* <CssBaseline /> */}
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          color={'#1a1a1a'}
        >
          Welcome
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          color={'#1a1a1a'}
        >
          {'Please sign in in order to use the application.'}
        </Typography>
      </Container>
    </>
  );
}
