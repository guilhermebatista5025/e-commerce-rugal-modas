import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import styles from './Login.module.css';

export default function Register() {
  const { register, loading, error } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [localError, setLocalError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLocalError('');
    if (!form.name || !form.email || !form.password) {
      setLocalError('Preencha todos os campos.');
      return;
    }
    const res = await register(form.email, form.password, form.name);
    if (res.ok) {
      // Assim que cadastrar, redirecionar o cliente para o login
      alert('Cadastro realizado com sucesso! Faça o login.');
      navigate('/login');
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span>RUGAL</span>
          <small>MODAS</small>
        </div>

        <h1 className={styles.title}>Crie sua conta</h1>
        <p className={styles.subtitle}>Junte-se à Rugal Modas</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Nome Completo"
            id="name"
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Seu nome"
          />
          <Input
            label="E-mail"
            id="email"
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="seu@email.com"
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            value={form.password}
            onChange={e => set('password', e.target.value)}
            placeholder="••••••••"
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
            Cadastrar
          </Button>
        </form>

        <div className={styles.footer}>
          <Link to="/login" className={styles.backLink}>← Já tenho uma conta</Link>
        </div>
      </div>
    </main>
  );
}
