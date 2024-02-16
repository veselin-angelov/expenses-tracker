import { Box, Container, Toolbar } from '@mui/material';
import { Header } from '../../components/Header/Header';
import { Copyright } from '@mui/icons-material';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps): React.ReactElement {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
}
