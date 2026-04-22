// src/context/UserContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext(null);

const MOCK_USERS = [
  { id: 1, name: 'Admin Rugal', email: 'admin@rugal.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Cliente Demo',  email: 'cliente@rugal.com', password: '123456', role: 'cliente' },
];

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rugal_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 800)); // simula request
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('rugal_user', JSON.stringify(safeUser));
      setLoading(false);
      return { ok: true, user: safeUser };
    }
    setError('E-mail ou senha inválidos.');
    setLoading(false);
    return { ok: false };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('rugal_user');
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider value={{ user, login, logout, loading, error, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro de UserProvider');
  return ctx;
};
