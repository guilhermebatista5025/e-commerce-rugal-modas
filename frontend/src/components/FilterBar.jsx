// src/components/FilterBar.jsx
import { CATEGORIES, BRANDS } from '../data/products';
import Input from './ui/Input';
import styles from './FilterBar.module.css';

export default function FilterBar({ filters, order, onFilter, onOrder, onReset, total }) {
  return (
    <div className={styles.bar}>
      <div className={styles.row}>
        {/* Search */}
        <Input
          placeholder="Buscar produto ou marca..."
          value={filters.search}
          onChange={e => onFilter('search', e.target.value)}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
          className={styles.search}
        />

        {/* Categoria */}
        <Input
          type="select"
          value={filters.category}
          onChange={e => onFilter('category', e.target.value)}
          className={styles.select}
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </Input>

        {/* Marca */}
        <Input
          type="select"
          value={filters.brand}
          onChange={e => onFilter('brand', e.target.value)}
          className={styles.select}
        >
          {BRANDS.map(b => <option key={b}>{b}</option>)}
        </Input>

        {/* Código */}
        <Input
          placeholder="Código (ex: RG-001)"
          value={filters.code}
          onChange={e => onFilter('code', e.target.value)}
          className={styles.code}
        />

        {/* Ordenar */}
        <Input
          type="select"
          value={order}
          onChange={e => onOrder(e.target.value)}
          className={styles.select}
        >
          <option value="default">Ordenar por</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
          <option value="name_asc">A–Z</option>
          <option value="promo">Promoções</option>
        </Input>

        <button className={styles.reset} onClick={onReset} title="Limpar filtros">
          ✕ Limpar
        </button>
      </div>

      <p className={styles.count}>
        <strong>{total}</strong> produto{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
      </p>
    </div>
  );
}
