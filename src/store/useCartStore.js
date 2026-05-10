import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], 
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, size, qty = 1) => {
        const key = `${product._id}-${size}`;
        const { items } = get();
        const existingItem = items.find((item) => item.key === key);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.key === key ? { ...item, qty: item.qty + qty } : item
            ),
          });
        } else {
          set({ items: [...items, { key, product, size, qty }] });
        }
      },

      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        }));
      },

      updateQty: (key, qty) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, qty: Math.max(1, qty) } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'rugal-cart-storage',
      // Persiste apenas os itens do carrinho no localStorage
      partialize: (state) => ({ items: state.items }), 
    }
  )
);

