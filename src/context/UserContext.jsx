import { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext(null);

// ⚠️  MODO FICTÍCIO — branch dev/login-ficticio
// Usuário admin sempre autenticado. Sem chamadas reais ao Supabase Auth.
const MOCK_ADMIN = {
  id: 'mock-admin-001',
  email: 'admin@rugal.com',
  user_metadata: { full_name: 'Admin Rugal' },
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(MOCK_ADMIN);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login fictício: aceita qualquer credencial e redireciona como admin
  const login = useCallback(async (_email, _password) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 400)); // simula delay de rede
    setUser(MOCK_ADMIN);
    setLoading(false);
    return { ok: true, user: MOCK_ADMIN };
  }, []);

  // Registro fictício: sempre bem-sucedido
  const register = useCallback(async (email, _password, name) => {
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 400));
    const mockUser = {
      id: 'mock-user-' + Date.now(),
      email,
      user_metadata: { full_name: name },
    };
    setUser(mockUser);
    setLoading(false);
    return { ok: true, user: mockUser };
  }, []);

  // Logout fictício: não faz nada (mantém sessão)
  const logout = useCallback(async () => {
    // No mock mode, logout mantém o admin logado
    setUser(MOCK_ADMIN);
  }, []);

  const isAdmin = user?.email === 'admin@rugal.com';

  return (
    <UserContext.Provider value={{ user, login, register, logout, loading, error, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro de UserProvider');
  return ctx;
};
