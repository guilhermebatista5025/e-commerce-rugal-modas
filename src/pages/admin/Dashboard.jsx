// src/pages/admin/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../utils/formatPrice';
import styles from './Admin.module.css';

export default function Dashboard() {
  const { products } = useProducts();

  const totalProducts = products.length;
  const promoProducts = products.filter(p => p.promo).length;
  const outOfStock    = products.filter(p =>
    !Object.values(p.stock || {}).some(v => v > 0)
  ).length;
  const totalStock = products.reduce(
    (s, p) => s + Object.values(p.stock || {}).reduce((a, b) => a + b, 0), 0
  );

  const CARDS = [
    { label: 'Total de Produtos', value: totalProducts, icon: '🛍️', color: 'gold' },
    { label: 'Em Promoção',       value: promoProducts, icon: '🏷️', color: 'promo' },
    { label: 'Sem Estoque',       value: outOfStock,    icon: '⚠️', color: 'danger' },
    { label: 'Itens em Estoque',  value: totalStock,    icon: '📦', color: 'info' },
  ];

  const QUICK_LINKS = [
    { to: '/admin/produtos',     label: 'Gerenciar Produtos',   icon: '🛍️' },
    { to: '/admin/estoque',      label: 'Controle de Estoque',  icon: '📦' },
    { to: '/admin/funcionarios', label: 'Funcionários',         icon: '👤' },
    { to: '/admin/relatorios',   label: 'Relatórios',           icon: '📊' },
  ];

  return (
    <div>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <p className={styles.pageSubtitle}>Visão geral da sua loja</p>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        {CARDS.map(c => (
          <div key={c.label} className={[styles.statCard, styles[`stat_${c.color}`]].join(' ')}>
            <span className={styles.statIcon}>{c.icon}</span>
            <div>
              <p className={styles.statValue}>{c.value}</p>
              <p className={styles.statLabel}>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className={styles.sectionTitle}>Acesso Rápido</h2>
      <div className={styles.quickGrid}>
        {QUICK_LINKS.map(l => (
          <Link key={l.to} to={l.to} className={styles.quickCard}>
            <span className={styles.quickIcon}>{l.icon}</span>
            <span>{l.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent products table */}
      <h2 className={styles.sectionTitle}>Últimos Produtos</h2>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th><th>Código</th><th>Preço</th><th>Promoção</th><th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td><code>{p.code}</code></td>
                <td>{formatPrice(p.promo ? p.promoPrice : p.price)}</td>
                <td>
                  {p.promo
                    ? <span className={styles.badgePromo}>SIM</span>
                    : <span className={styles.badgeNo}>NÃO</span>
                  }
                </td>
                <td>{p.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
