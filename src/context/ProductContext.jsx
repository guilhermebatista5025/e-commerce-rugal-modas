import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { supabase } from '../services/supabase';

const ProductContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p._id !== action.payload) };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { products: [], loading: true });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, skus(*)');

        if (error) throw error;

        // Transforma o formato do banco relacional para o formato que a UI já espera
        const formattedProducts = data.map(p => {
          const defaultSku = p.skus[0] || {};
          
          const stockMap = {};
          const sizesArr = [];
          
          p.skus.forEach(sku => {
            sizesArr.push(sku.size);
            stockMap[sku.size] = sku.stock;
          });

          return {
            _id: p.id,
            code: p.code,
            name: p.name,
            description: p.description,
            brand: p.brand,
            category: p.category,
            image: p.image_url,
            price: defaultSku.price || 0,
            promo: defaultSku.is_promo || false,
            promoPrice: defaultSku.promo_price || null,
            sizes: sizesArr,
            stock: stockMap,
          };
        });

        dispatch({ type: 'SET_PRODUCTS', payload: formattedProducts });
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    fetchProducts();
  }, []);

  const addProduct    = useCallback(p => dispatch({ type: 'ADD_PRODUCT',    payload: { ...p, _id: Date.now().toString() } }), []);
  const updateProduct = useCallback(p => dispatch({ type: 'UPDATE_PRODUCT', payload: p }), []);
  const deleteProduct = useCallback(id => dispatch({ type: 'DELETE_PRODUCT', payload: id }), []);

  return (
    <ProductContext.Provider value={{
      ...state, addProduct, updateProduct, deleteProduct,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts deve ser usado dentro de ProductProvider');
  return ctx;
};
