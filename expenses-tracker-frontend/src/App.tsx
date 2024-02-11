import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { Home } from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from './config';
import { PageLayout } from './layouts/PageLayout/PageLayout';

export function App() {
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <UserProvider>
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
