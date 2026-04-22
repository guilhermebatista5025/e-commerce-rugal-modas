// src/utils/filters.js

/**
 * Filtra produtos por categoria, marca e código
 */
export function filterProducts(products, { category, brand, code, search }) {
  return products.filter(p => {
    if (category && category !== 'Todas' && p.category !== category) return false;
    if (brand    && brand    !== 'Todas' && p.brand    !== brand)    return false;
    if (code     && !p.code.toLowerCase().includes(code.toLowerCase())) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q) &&
        !p.code.toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });
}

/**
 * Ordena produtos
 */
export function sortProducts(products, order) {
  const arr = [...products];
  switch (order) {
    case 'price_asc':
      return arr.sort((a, b) =>
        (a.promo ? a.promoPrice : a.price) - (b.promo ? b.promoPrice : b.price)
      );
    case 'price_desc':
      return arr.sort((a, b) =>
        (b.promo ? b.promoPrice : b.price) - (a.promo ? a.promoPrice : a.price)
      );
    case 'name_asc':
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'promo':
      return arr.sort((a, b) => (b.promo ? 1 : 0) - (a.promo ? 1 : 0));
    default:
      return arr;
  }
}
