// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import styles from './Login.module.css';

export default function Login() {
  const { login, loading, error } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLocalError('');
    if (!form.email || !form.password) {
      setLocalError('Preencha e-mail e senha.');
      return;
    }
    const res = await login(form.email, form.password);
    if (res.ok) {
      navigate(res.user.role === 'admin' ? '/admin' : '/loja');
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <span>RUGAL</span>
          <small>MODAS</small>
        </div>

        <h1 className={styles.title}>Bem-vindo de volta</h1>
        <p className={styles.subtitle}>Entre na sua conta para continuar</p>

        <div className={styles.form}>
          <Input
            label="E-mail"
            id="email"
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="seu@email.com"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            }
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            value={form.password}
            onChange={e => set('password', e.target.value)}
            placeholder="••••••••"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            }
          />

          {(error || localError) && (
            <p className={styles.error}>{localError || error}</p>
          )}

          <Button
            variant="primary"
            fullWidth
            loading={loading}
            onClick={handleSubmit}
            size="lg"
          >
            Entrar
          </Button>
        </div>

        {/* Dica de acesso */}
        <div className={styles.hint}>
          <p>🔑 Acesso rápido (demo):</p>
          <button className={styles.hintBtn} onClick={() => setForm({ email: 'admin@rugal.com', password: 'admin123' })}>
            Admin
          </button>
          <button className={styles.hintBtn} onClick={() => setForm({ email: 'cliente@rugal.com', password: '123456' })}>
            Cliente
          </button>
        </div>

        <div className={styles.footer}>
          <Link to="/loja" className={styles.backLink}>← Continuar sem entrar</Link>
        </div>
      </div>
    </main>
  );
}
