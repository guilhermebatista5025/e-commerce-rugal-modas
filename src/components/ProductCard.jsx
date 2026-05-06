// src/components/ProductCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice, discountPercent } from '../utils/formatPrice';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addItem, toggleCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const price    = product.promo ? product.promoPrice : product.price;
  const discount = discountPercent(product.price, product.promoPrice);
  const hasStock = Object.values(product.stock || {}).some(v => v > 0);

  const handleAdd = (e) => {
    e.preventDefault();
    // Se o produto tem tamanhos definidos mas nenhum foi selecionado
    if (product.sizes?.length > 0 && product.sizes[0] !== 'Único' && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 3000);
      return;
    }
    
    setSizeError(false);
    // Adiciona o tamanho selecionado ou o primeiro disponível/único
    const sizeToAdd = selectedSize || (product.sizes?.length ? product.sizes[0] : 'Único');
    addItem(product, sizeToAdd);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    toggleCart();
  };

  return (
    <div className={[styles.card, !hasStock ? styles.outOfStock : ''].join(' ')}>
      <Link to={`/produto/${product._id}`} className={styles.imageWrap}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={styles.image}
        />
        {product.promo && hasStock && (
          <span className={styles.promoBadge}>-{discount}%</span>
        )}
        {!hasStock && (
          <div className={styles.unavailable}>Indisponível</div>
        )}
      </Link>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.brand}>{product.brand}</span>
          <span className={styles.code}>{product.code}</span>
        </div>

        <Link to={`/produto/${product._id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>

        <div className={styles.pricing}>
          {product.promo && (
            <span className={styles.originalPrice}>{formatPrice(product.price)}</span>
          )}
          <span className={product.promo ? styles.promoPrice : styles.currentPrice}>
            {formatPrice(price)}
          </span>
        </div>

        {/* Tamanhos */}
        {product.sizes?.length > 0 && (
          <div className={styles.sizes}>
            {product.sizes.map(s => {
              const inStock = (product.stock?.[s] || 0) > 0;
              return (
                <button
                  key={s}
                  className={[
                    styles.sizeBtn,
                    selectedSize === s ? styles.sizeSel : '',
                    !inStock ? styles.sizeOut : '',
                  ].join(' ')}
                  onClick={(e) => {
                    e.preventDefault();
                    if (inStock) {
                      setSelectedSize(s);
                      setSizeError(false);
                    }
                  }}
                  disabled={!inStock}
                  title={!inStock ? 'Indisponível' : s}
                >
                  {s}
                </button>
              );
            })}
            {sizeError && <div className={styles.sizeError}>Selecione um tamanho!</div>}
          </div>
        )}

        <button
          className={[styles.addBtn, added ? styles.added : '', !hasStock ? styles.disabled : ''].join(' ')}
          onClick={handleAdd}
          disabled={!hasStock}
        >
          {!hasStock ? 'Indisponível' : added ? '✓ Adicionado' : '+ Carrinho'}
        </button>
      </div>
    </div>
  );
}
