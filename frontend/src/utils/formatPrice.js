// src/utils/formatPrice.js

/**
 * Formata número como moeda BRL
 * @param {number} value
 * @returns {string}  ex: "R$ 129,90"
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Calcula percentual de desconto
 */
export function discountPercent(original, promo) {
  if (!original || !promo) return 0;
  return Math.round(((original - promo) / original) * 100);
}
