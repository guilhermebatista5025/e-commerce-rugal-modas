// src/pages/admin/Funcionarios.jsx
import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import styles from './Admin.module.css';

const ROLES = ['Vendedor', 'Caixa', 'Estoquista', 'Gerente', 'Atendente'];

const MOCK_EMPLOYEES = [
  { id: 1, name: 'Maria Silva',   role: 'Gerente',   email: 'maria@rugal.com',  phone: '(27) 9 9999-0001', active: true },
  { id: 2, name: 'João Santos',   role: 'Vendedor',  email: 'joao@rugal.com',   phone: '(27) 9 9999-0002', active: true },
  { id: 3, name: 'Ana Oliveira',  role: 'Caixa',     email: 'ana@rugal.com',    phone: '(27) 9 9999-0003', active: true },
  { id: 4, name: 'Pedro Costa',   role: 'Estoquista',email: 'pedro@rugal.com',  phone: '(27) 9 9999-0004', active: false },
];

export default function Funcionarios() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [form, setForm]           = useState({ name: '', role: ROLES[0], email: '', phone: '' });
  const [delModal, setDelModal]   = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleAdd = () => {
    if (!form.name || !form.email) return alert('Nome e e-mail são obrigatórios.');
    setEmployees(prev => [...prev, { id: Date.now(), ...form, active: true }]);
    setForm({ name: '', role: ROLES[0], email: '', phone: '' });
  };

  const toggleActive = id =>
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));

  const handleDelete = () => {
    setEmployees(prev => prev.filter(e => e.id !== delModal));
    setDelModal(null);
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Funcionários</h1>

      {/* Stats */}
      <div className={styles.statsGrid} style={{ gridTemplateColumns: 'repeat(2,1fr)', maxWidth: 420 }}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>👥</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-gold)' }}>{employees.length}</p>
            <p className={styles.statLabel}>Total</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>✅</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-promo)' }}>{employees.filter(e => e.active).length}</p>
            <p className={styles.statLabel}>Ativos</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles.formCard}>
        <h3 className={styles.formTitle}>➕ Cadastrar Funcionário</h3>
        <div className={styles.formGrid}>
          <Input label="Nome *"    value={form.name}  onChange={e => set('name', e.target.value)}  placeholder="Nome completo" />
          <Input label="E-mail *"  value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@rugal.com" type="email" />
          <Input label="Telefone"  value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(27) 9 9999-0000" />
          <Input type="select" label="Cargo" value={form.role} onChange={e => set('role', e.target.value)}>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </Input>
        </div>
        <div className={styles.formActions}>
          <Button variant="primary" onClick={handleAdd}>Cadastrar</Button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr><th>Nome</th><th>Cargo</th><th>E-mail</th><th>Telefone</th><th>Status</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id}>
                <td><strong>{e.name}</strong></td>
                <td>{e.role}</td>
                <td>{e.email}</td>
                <td>{e.phone || '—'}</td>
                <td>
                  <span className={e.active ? styles.badgePromo : styles.badgeNo}>
                    {e.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn} onClick={() => toggleActive(e.id)}>
                      {e.active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button className={styles.deleteBtn} onClick={() => setDelModal(e.id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!delModal} onClose={() => setDelModal(null)} title="Excluir Funcionário" size="sm">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
          Confirmar exclusão deste funcionário?
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="danger" onClick={handleDelete} fullWidth>Excluir</Button>
          <Button variant="dark"   onClick={() => setDelModal(null)} fullWidth>Cancelar</Button>
        </div>
      </Modal>
    </div>
  );
}
