// src/pages/admin/Produtos.jsx
import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../utils/formatPrice';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { CATEGORIES, BRANDS, SIZES } from '../../data/products';
import styles from './Admin.module.css';

const EMPTY = {
  name: '', code: '', brand: BRANDS[1], category: CATEGORIES[1],
  price: '', promo: false, promoPrice: '',
  sizes: [], description: '', image: '',
  stock: {},
};

export default function AdminProdutos() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [delModal, setDelModal] = useState(null);
  const [search, setSearch]     = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const toggleSize = s => {
    setForm(f => {
      const has = f.sizes.includes(s);
      const sizes = has ? f.sizes.filter(x => x !== s) : [...f.sizes, s];
      const stock = { ...f.stock };
      if (has) delete stock[s]; else stock[s] = stock[s] || 0;
      return { ...f, sizes, stock };
    });
  };

  const handleSave = () => {
    if (!form.name || !form.code || !form.price) return alert('Nome, código e preço são obrigatórios.');
    const data = {
      ...form,
      price: parseFloat(form.price),
      promoPrice: form.promo ? parseFloat(form.promoPrice) : null,
    };
    if (editing) { updateProduct({ ...data, _id: editing }); setEditing(null); }
    else          addProduct(data);
    setForm(EMPTY);
  };

  const handleEdit = p => {
    setForm({ ...p, price: String(p.price), promoPrice: String(p.promoPrice || '') });
    setEditing(p._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = () => {
    deleteProduct(delModal);
    setDelModal(null);
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className={styles.pageTitle}>Gerenciar Produtos</h1>

      {/* Form */}
      <div className={styles.formCard}>
        <h3 className={styles.formTitle}>{editing ? '✏️ Editar Produto' : '➕ Novo Produto'}</h3>
        <div className={styles.formGrid}>
          <Input label="Nome *" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nome do produto" />
          <Input label="Código *" value={form.code} onChange={e => set('code', e.target.value)} placeholder="RG-001" />
          <Input label="Preço (R$) *" type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="99.90" />

          <Input type="select" label="Categoria" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.filter(c => c !== 'Todas').map(c => <option key={c}>{c}</option>)}
          </Input>
          <Input type="select" label="Marca" value={form.brand} onChange={e => set('brand', e.target.value)}>
            {BRANDS.filter(b => b !== 'Todas').map(b => <option key={b}>{b}</option>)}
          </Input>
          <Input label="URL da Imagem" value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." />

          <Input label="Descrição" type="textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Descreva o produto..." />

          <div>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:'var(--fs-sm)', color:'var(--text-secondary)', marginBottom:8 }}>
              <input type="checkbox" checked={form.promo} onChange={e => set('promo', e.target.checked)} />
              Em promoção?
            </label>
            {form.promo && (
              <Input label="Preço Promocional (R$)" type="number" value={form.promoPrice} onChange={e => set('promoPrice', e.target.value)} placeholder="59.90" />
            )}
          </div>

          <div>
            <p style={{ fontSize:'var(--fs-sm)', color:'var(--text-secondary)', marginBottom:8 }}>Tamanhos disponíveis</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {SIZES.map(s => (
                <label key={s} style={{ display:'flex', alignItems:'center', gap:4, cursor:'pointer', fontSize:'var(--fs-xs)' }}>
                  <input type="checkbox" checked={form.sizes.includes(s)} onChange={() => toggleSize(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          {form.sizes.length > 0 && (
            <div>
              <p style={{ fontSize:'var(--fs-sm)', color:'var(--text-secondary)', marginBottom:8 }}>Estoque por tamanho</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                {form.sizes.map(s => (
                  <div key={s} style={{ display:'flex', flexDirection:'column', gap:4, alignItems:'center' }}>
                    <label style={{ fontSize:'var(--fs-xs)', color:'var(--color-gold)' }}>{s}</label>
                    <input
                      type="number"
                      min="0"
                      value={form.stock[s] || 0}
                      onChange={e => set('stock', { ...form.stock, [s]: parseInt(e.target.value) || 0 })}
                      style={{ width:56, padding:'4px 6px', background:'var(--bg-secondary)', border:'1px solid var(--border-color)', borderRadius:'var(--radius-sm)', color:'var(--text-primary)', textAlign:'center', fontFamily:'var(--font-body)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <Button variant="primary" onClick={handleSave}>
            {editing ? 'Salvar Alterações' : 'Cadastrar Produto'}
          </Button>
          {editing && (
            <Button variant="ghost" onClick={() => { setForm(EMPTY); setEditing(null); }}>
              Cancelar
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <Input placeholder="Buscar produto..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr><th>Produto</th><th>Código</th><th>Categoria</th><th>Preço</th><th>Promoção</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td><code>{p.code}</code></td>
                <td>{p.category}</td>
                <td>
                  {p.promo
                    ? <><s style={{color:'var(--text-secondary)',fontSize:'var(--fs-xs)'}}>{formatPrice(p.price)}</s>{' '}<strong style={{color:'var(--color-promo)'}}>{formatPrice(p.promoPrice)}</strong></>
                    : formatPrice(p.price)
                  }
                </td>
                <td>{p.promo ? <span className={styles.badgePromo}>SIM</span> : <span className={styles.badgeNo}>NÃO</span>}</td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.editBtn}   onClick={() => handleEdit(p)}>Editar</button>
                    <button className={styles.deleteBtn} onClick={() => setDelModal(p._id)}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm delete */}
      <Modal isOpen={!!delModal} onClose={() => setDelModal(null)} title="Confirmar Exclusão" size="sm">
        <p style={{ color:'var(--text-secondary)', marginBottom:'var(--space-6)' }}>
          Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
        </p>
        <div style={{ display:'flex', gap:'var(--space-3)' }}>
          <Button variant="danger" onClick={handleDelete} fullWidth>Excluir</Button>
          <Button variant="dark"   onClick={() => setDelModal(null)} fullWidth>Cancelar</Button>
        </div>
      </Modal>
    </div>
  );
}
