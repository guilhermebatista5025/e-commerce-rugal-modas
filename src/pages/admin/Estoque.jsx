// src/pages/admin/Estoque.jsx
import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import styles from './Admin.module.css';

export default function Estoque() {
  const { products, updateProduct } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleStockChange = (product, size, value) => {
    const updated = {
      ...product,
      stock: { ...product.stock, [size]: Math.max(0, parseInt(value) || 0) },
    };
    updateProduct(updated);
  };

  const totalItems = products.reduce(
    (s, p) => s + Object.values(p.stock || {}).reduce((a, b) => a + b, 0), 0
  );
  const lowStock = products.filter(p =>
    Object.values(p.stock || {}).some(v => v > 0 && v <= 3)
  ).length;
  const outOfStock = products.filter(p =>
    !Object.values(p.stock || {}).some(v => v > 0)
  ).length;

  return (
    <div>
      <h1 className={styles.pageTitle}>Controle de Estoque</h1>

      {/* Summary */}
      <div className={styles.statsGrid} style={{ gridTemplateColumns: 'repeat(3,1fr)', maxWidth: 600 }}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📦</span>
          <div>
            <p className={`${styles.statValue} ${styles['stat_gold']?.split(' ')[0]}`} style={{ color: 'var(--color-gold)' }}>{totalItems}</p>
            <p className={styles.statLabel}>Total em estoque</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>⚠️</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-warning)' }}>{lowStock}</p>
            <p className={styles.statLabel}>Estoque baixo (≤3)</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>❌</span>
          <div>
            <p className={styles.statValue} style={{ color: 'var(--color-danger)' }}>{outOfStock}</p>
            <p className={styles.statLabel}>Sem estoque</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 'var(--space-5)' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar produto..."
          style={{
            padding: '10px 14px', background: 'var(--bg-card)',
            border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-base)', width: '100%', maxWidth: 360, outline: 'none'
          }}
        />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Código</th>
              <th>Categoria</th>
              <th>Tamanho / Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const totalStock = Object.values(p.stock || {}).reduce((a, b) => a + b, 0);
              return (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td><code>{p.code}</code></td>
                  <td>{p.category}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {(p.sizes || []).map(s => {
                        const qty = p.stock?.[s] || 0;
                        return (
                          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <label style={{ fontSize: 'var(--fs-xs)', color: qty === 0 ? 'var(--color-danger)' : qty <= 3 ? 'var(--color-warning)' : 'var(--color-gold)', fontWeight: 600 }}>
                              {s}
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={qty}
                              onChange={e => handleStockChange(p, s, e.target.value)}
                              style={{
                                width: 52, textAlign: 'center',
                                padding: '4px 4px',
                                background: 'var(--bg-secondary)',
                                border: `1px solid ${qty === 0 ? 'var(--color-danger)' : qty <= 3 ? 'var(--color-warning)' : 'var(--border-color)'}`,
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--text-primary)',
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--fs-sm)',
                              }}
                            />
                          </div>
                        );
                      })}
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
                          Total: <strong style={{ color: totalStock === 0 ? 'var(--color-danger)' : 'var(--text-primary)' }}>{totalStock}</strong>
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
