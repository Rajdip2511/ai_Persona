import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useStore, StoreProvider } from './context/store';
import { Login } from './pages/Login';
import { PersonaSelect } from './pages/PersonaSelect';
import { Chat } from './pages/Chat';
import { NavBar } from './components/NavBar';
import './styles/globals.css';

function AppRoutes() {
  const { user, setUser } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/persona" /> : <Login />} />
        <Route path="/persona" element={user ? <PersonaSelect /> : <Navigate to="/" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
