// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, qty = 1 } = action.payload;
      const key = `${product._id}-${size}`;
      const existing = state.items.find(i => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.key === key ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { key, product, size, qty }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.key !== action.payload) };

    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.key === action.payload.key
            ? { ...i, qty: Math.max(1, action.payload.qty) }
            : i
        ),
      };

    case 'CLEAR':
      return { items: [] };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  isOpen: false,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem   = useCallback((product, size, qty) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, size, qty } }), []);
  const removeItem = useCallback(key =>
    dispatch({ type: 'REMOVE_ITEM', payload: key }), []);
  const updateQty  = useCallback((key, qty) =>
    dispatch({ type: 'UPDATE_QTY', payload: { key, qty } }), []);
  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR' }), []);
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
  const closeCart  = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = state.items.reduce((s, i) => {
    const price = i.product.promo ? i.product.promoPrice : i.product.price;
    return s + price * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{
      ...state, addItem, removeItem, updateQty,
      clearCart, toggleCart, closeCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
};
