// src/utils/generateMessage.js
import { formatPrice } from './formatPrice';

const WHATSAPP_NUMBER = '5527998803770'; // ← substitua pelo número real

/**
 * Gera mensagem formatada e abre WhatsApp
 */
export function sendToWhatsApp({ items, totalPrice, customer }) {
  const lines = items.map(
    i => `• ${i.product.name} (${i.product.code}) — Tam: ${i.size} — Qtd: ${i.qty} — ${formatPrice(
      (i.product.promo ? i.product.promoPrice : i.product.price) * i.qty
    )}`
  );

  const msg = [
    '🛍️ *Pedido — Rugal Modas*',
    '',
    `👤 *Cliente:* ${customer.name}`,
    `📍 *Endereço:* ${customer.address}`,
    `🏙️ *Cidade/CEP:* ${customer.city} — ${customer.cep}`,
    '',
    '*Itens do Pedido:*',
    ...lines,
    '',
    `💰 *Total:* ${formatPrice(totalPrice)}`,
    '',
    `💳 *Pagamento:* ${customer.payment}`,
    `🚚 *Entrega:* ${customer.delivery}`,
    '',
    '_Pedido gerado pelo site Rugal Modas_',
  ].join('\n');

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}
