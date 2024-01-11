import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { Home } from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { config } from './config';

export function App() {
  console.log('BLABLABLA', config.googleClientId);
  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
