import { useCartStore } from '../store/useCartStore';

export const useCart = () => {
  const store = useCartStore();

  const totalItems = store.items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = store.items.reduce((sum, item) => {
    const price = item.product.promo ? item.product.promoPrice : item.product.price;
    return sum + price * item.qty;
  }, 0);

  return { ...store, totalItems, totalPrice };
};
