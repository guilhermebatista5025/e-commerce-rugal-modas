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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLocalError('');
    if (!form.email || !form.password) {
      setLocalError('Preencha e-mail e senha.');
      return;
    }
    const res = await login(form.email, form.password);
    if (res.ok) {
      navigate(res.user.email === 'admin@rugal.com' ? '/admin' : '/');
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

        {/* Banner modo ficticio */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.13), rgba(245,158,11,0.07))',
          border: '1px solid rgba(245,158,11,0.5)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            Modo Ficticio Ativo
          </p>
          <p style={{ color: 'rgba(245,158,11,0.8)', fontSize: '12px', margin: '4px 0 0' }}>
            Qualquer credencial ou o botao abaixo te leva ao dashboard
          </p>
        </div>

        <h1 className={styles.title}>Bem-vindo de volta</h1>
        <p className={styles.subtitle}>Entre na sua conta para continuar</p>

        {/* Botao de acesso rapido ao admin */}
        <button
          id="admin-quick-access"
          onClick={() => navigate('/admin')}
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 800,
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(245,158,11,0.27)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Acessar Dashboard Direto
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
          <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>ou entre com e-mail</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            id="email"
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="qualquer@email.com"
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
            placeholder="qualquer senha"
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
            type="submit"
            size="lg"
          >
            Entrar
          </Button>
        </form>

        <div className={styles.footer}>
          <Link to="/" className={styles.backLink}>Continuar sem entrar</Link>
        </div>
      </div>
    </main>
  );
}
