// src/hooks/useProducts.js
import { useState, useMemo } from 'react';
import { useProducts as useProductsCtx } from '../context/ProductContext';
import { filterProducts, sortProducts } from '../utils/filters';

export function useProducts() {
  return useProductsCtx();
}

export function useFilteredProducts() {
  const { products, loading } = useProductsCtx();
  const [filters, setFilters] = useState({
    category: 'Todas',
    brand: 'Todas',
    code: '',
    search: '',
  });
  const [order, setOrder] = useState('default');

  const filtered = useMemo(
    () => sortProducts(filterProducts(products, filters), order),
    [products, filters, order]
  );

  const updateFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    setFilters({ category: 'Todas', brand: 'Todas', code: '', search: '' });

  return { filtered, filters, order, loading, updateFilter, setOrder, resetFilters };
}
