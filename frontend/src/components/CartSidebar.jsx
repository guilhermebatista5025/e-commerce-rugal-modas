// src/components/CartSidebar.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart();

  // Fechar com ESC
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') closeCart(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeCart]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={[styles.overlay, isOpen ? styles.overlayOpen : ''].join(' ')}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <aside className={[styles.sidebar, isOpen ? styles.open : ''].join(' ')}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Carrinho</h2>
            <span className={styles.count}>{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
          </div>
          <button className={styles.close} onClick={closeCart} aria-label="Fechar">✕</button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p>Seu carrinho está vazio</p>
              <Link to="/loja" className={styles.shopLink} onClick={closeCart}>Ver Produtos</Link>
            </div>
          ) : (
            items.map(item => {
              const price = item.product.promo ? item.product.promoPrice : item.product.price;
              return (
                <div key={item.key} className={styles.item}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.itemImg}
                  />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemBrand}>{item.product.brand}</p>
                    <p className={styles.itemName}>{item.product.name}</p>
                    <p className={styles.itemSize}>Tam: <strong>{item.size}</strong></p>
                    <div className={styles.itemBottom}>
                      <div className={styles.qty}>
                        <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                      </div>
                      <span className={styles.itemPrice}>{formatPrice(price * item.qty)}</span>
                    </div>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => removeItem(item.key)}
                    aria-label="Remover"
                  >✕</button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
            </div>
            <Link to="/carrinho" className={styles.checkoutBtn} onClick={closeCart}>
              Finalizar Pedido
            </Link>
            <button className={styles.continueBtn} onClick={closeCart}>
              Continuar Comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
