// src/pages/Carrinho.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { sendToWhatsApp } from '../utils/generateMessage';
import Input from '../components/ui/Input';
import styles from './Carrinho.module.css';

const PAYMENT_OPTIONS  = ['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'Boleto'];
const DELIVERY_OPTIONS = ['Entrega (Motoboy)', 'Retirar na Loja', 'Correios (PAC)', 'Correios (SEDEX)'];

export default function Carrinho() {
  const { items, removeItem, updateQty, clearCart, totalPrice, totalItems } = useCart();

  const [form, setForm] = useState({
    name: '', address: '', city: '', cep: '',
    payment: PAYMENT_OPTIONS[0], delivery: DELIVERY_OPTIONS[0],
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1 = carrinho, 2 = checkout

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Nome obrigatório';
    if (!form.address.trim()) e.address = 'Endereço obrigatório';
    if (!form.city.trim())    e.city    = 'Cidade obrigatória';
    if (!form.cep.trim())     e.cep     = 'CEP obrigatório';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFinish = () => {
    if (!validate()) return;
    sendToWhatsApp({ items, totalPrice, customer: form });
    clearCart();
    setStep(1);
  };

  if (items.length === 0 && step === 1) {
    return (
      <main className={styles.page}>
        <div className="container">
          <div className={styles.empty}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos para continuar</p>
            <Link to="/loja" className={styles.shopLink}>Ir para a Loja</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>
          {step === 1 ? 'Meu Carrinho' : 'Finalizar Pedido'}
        </h1>

        {/* Steps indicator */}
        <div className={styles.steps}>
          <div className={[styles.step, step >= 1 ? styles.stepActive : ''].join(' ')}>
            <span>1</span> Carrinho
          </div>
          <div className={styles.stepLine} />
          <div className={[styles.step, step >= 2 ? styles.stepActive : ''].join(' ')}>
            <span>2</span> Dados do Pedido
          </div>
          <div className={styles.stepLine} />
          <div className={[styles.step, step >= 3 ? styles.stepActive : ''].join(' ')}>
            <span>3</span> WhatsApp
          </div>
        </div>

        <div className={styles.layout}>
          {/* Main content */}
          <div className={styles.main}>
            {step === 1 ? (
              <>
                {/* Items list */}
                <div className={styles.itemsList}>
                  {items.map(item => {
                    const price = item.product.promo ? item.product.promoPrice : item.product.price;
                    return (
                      <div key={item.key} className={styles.item}>
                        <img src={item.product.image} alt={item.product.name} className={styles.itemImg} />
                        <div className={styles.itemInfo}>
                          <div className={styles.itemHeader}>
                            <div>
                              <p className={styles.itemBrand}>{item.product.brand}</p>
                              <p className={styles.itemName}>{item.product.name}</p>
                              <p className={styles.itemCode}>{item.product.code}</p>
                            </div>
                            <button className={styles.removeBtn} onClick={() => removeItem(item.key)}>✕</button>
                          </div>
                          <div className={styles.itemFooter}>
                            <div className={styles.itemSize}>Tam: <strong>{item.size}</strong></div>
                            <div className={styles.qty}>
                              <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                              <span>{item.qty}</span>
                              <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                            </div>
                            <span className={styles.itemPrice}>{formatPrice(price * item.qty)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button className={styles.nextBtn} onClick={() => setStep(2)}>
                  Continuar para Dados do Pedido →
                </button>
              </>
            ) : (
              /* Checkout form */
              <div className={styles.form}>
                <h3 className={styles.formTitle}>Seus Dados</h3>
                <div className={styles.formGrid}>
                  <Input
                    label="Nome completo *"
                    id="name"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    error={errors.name}
                    placeholder="João da Silva"
                  />
                  <Input
                    label="Endereço completo *"
                    id="address"
                    value={form.address}
                    onChange={e => set('address', e.target.value)}
                    error={errors.address}
                    placeholder="Rua das Flores, 123 — Bairro"
                  />
                  <Input
                    label="Cidade *"
                    id="city"
                    value={form.city}
                    onChange={e => set('city', e.target.value)}
                    error={errors.city}
                    placeholder="Linhares / ES"
                  />
                  <Input
                    label="CEP *"
                    id="cep"
                    value={form.cep}
                    onChange={e => set('cep', e.target.value)}
                    error={errors.cep}
                    placeholder="29000-000"
                  />
                  <Input
                    type="select"
                    label="Forma de Pagamento"
                    id="payment"
                    value={form.payment}
                    onChange={e => set('payment', e.target.value)}
                  >
                    {PAYMENT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </Input>
                  <Input
                    type="select"
                    label="Forma de Entrega"
                    id="delivery"
                    value={form.delivery}
                    onChange={e => set('delivery', e.target.value)}
                  >
                    {DELIVERY_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </Input>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.backBtn} onClick={() => setStep(1)}>← Voltar</button>
                  <button className={styles.whatsappBtn} onClick={handleFinish}>
                    Enviar Pedido pelo WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar resumo */}
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Resumo do Pedido</h3>
            <div className={styles.summaryItems}>
              {items.map(item => {
                const price = item.product.promo ? item.product.promoPrice : item.product.price;
                return (
                  <div key={item.key} className={styles.summaryItem}>
                    <span className={styles.summaryName}>
                      {item.product.name} <small>({item.size}) x{item.qty}</small>
                    </span>
                    <span>{formatPrice(price * item.qty)}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.divider} />
            <div className={styles.summaryTotal}>
              <span>{totalItems} itens</span>
              <span className={styles.totalValue}>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
