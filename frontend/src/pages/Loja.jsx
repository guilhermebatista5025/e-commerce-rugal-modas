// src/pages/Loja.jsx
import { lazy, Suspense } from 'react';
import { useFilteredProducts } from '../hooks/useProducts';
import FilterBar from '../components/FilterBar';
import styles from './Loja.module.css';

const ProductCard = lazy(() => import('../components/ProductCard'));

export default function Loja() {
  const {
    filtered, filters, order,
    loading, updateFilter, setOrder, resetFilters,
  } = useFilteredProducts();

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Nossa Loja</h1>
          <p className={styles.subtitle}>Explore nossa coleção completa de moda</p>
        </div>

        {/* Filtros */}
        <FilterBar
          filters={filters}
          order={order}
          onFilter={updateFilter}
          onOrder={setOrder}
          onReset={resetFilters}
          total={filtered.length}
        />

        {/* Grid de produtos */}
        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <p>😕 Nenhum produto encontrado com esses filtros.</p>
            <button className={styles.resetBtn} onClick={resetFilters}>
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="products-grid">
            <Suspense fallback={<div className="spinner" />}>
              {filtered.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </main>
  );
}
