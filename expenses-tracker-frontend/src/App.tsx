import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { Home } from './pages/Home';

export function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
