// src/pages/Produto.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatPrice, discountPercent } from '../utils/formatPrice';
import styles from './Produto.module.css';

export default function Produto() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addItem, toggleCart } = useCart();

  const product = products.find(p => p._id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Produto não encontrado</h2>
        <Link to="/loja">← Voltar para a loja</Link>
      </div>
    );
  }

  const price    = product.promo ? product.promoPrice : product.price;
  const discount = discountPercent(product.price, product.promoPrice);
  const hasStock = Object.values(product.stock || {}).some(v => v > 0);
  const stockQty = selectedSize ? (product.stock?.[selectedSize] || 0) : null;

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem(product, selectedSize);
    setAdded(true);
    toggleCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link> / <Link to="/loja">Loja</Link> / <span>{product.name}</span>
        </div>

        <div className={styles.grid}>
          {/* Imagem */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrap}>
              <img src={product.image} alt={product.name} className={styles.image} />
              {product.promo && (
                <span className={styles.badge}>-{discount}% OFF</span>
              )}
              {!hasStock && (
                <div className={styles.unavailable}>Indisponível</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className={styles.infoSection}>
            <div className={styles.meta}>
              <span className={styles.brand}>{product.brand}</span>
              <span className={styles.code}>Cód: {product.code}</span>
            </div>

            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.category}>
              <span>Categoria: </span>
              <Link to={`/loja?category=${product.category}`}>{product.category}</Link>
            </div>

            {/* Preço */}
            <div className={styles.priceBox}>
              {product.promo && (
                <span className={styles.originalPrice}>{formatPrice(product.price)}</span>
              )}
              <span className={product.promo ? styles.promoPrice : styles.currentPrice}>
                {formatPrice(price)}
              </span>
              {product.promo && (
                <span className={styles.saveBadge}>
                  Economize {formatPrice(product.price - product.promoPrice)}
                </span>
              )}
            </div>

            {/* Descrição */}
            {product.description && (
              <p className={styles.description}>{product.description}</p>
            )}

            {/* Tamanhos */}
            <div className={styles.sizeSection}>
              <p className={styles.sizeLabel}>
                Selecionar tamanho
                {sizeError && <span className={styles.sizeError}> — Por favor selecione um tamanho!</span>}
              </p>
              <div className={styles.sizes}>
                {product.sizes?.map(s => {
                  const inStock = (product.stock?.[s] || 0) > 0;
                  return (
                    <button
                      key={s}
                      className={[
                        styles.sizeBtn,
                        selectedSize === s ? styles.selected : '',
                        !inStock ? styles.outOfStock : '',
                      ].join(' ')}
                      onClick={() => { if (inStock) { setSelectedSize(s); setSizeError(false); } }}
                      disabled={!inStock}
                      title={!inStock ? 'Indisponível' : `Tamanho ${s}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {stockQty !== null && (
                <p className={styles.stockInfo}>
                  {stockQty > 5
                    ? <span className={styles.inStock}>✓ Em estoque</span>
                    : stockQty > 0
                    ? <span className={styles.lowStock}>⚠ Últimas {stockQty} unidades!</span>
                    : <span className={styles.noStock}>✕ Indisponível neste tamanho</span>
                  }
                </p>
              )}
            </div>

            {/* Botões */}
            <div className={styles.actions}>
              <button
                className={[styles.addBtn, added ? styles.addedBtn : ''].join(' ')}
                onClick={handleAdd}
                disabled={!hasStock}
              >
                {added ? '✓ Adicionado ao Carrinho!' : hasStock ? '+ Adicionar ao Carrinho' : 'Indisponível'}
              </button>
              <Link to="/carrinho" className={styles.buyBtn}>
                Comprar Agora
              </Link>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map(t => (
                  <span key={t} className={styles.tag}>#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Voltar */}
        <Link to="/loja" className={styles.back}>← Voltar para a loja</Link>
      </div>
    </main>
  );
}
