// src/context/ProductContext.jsx
import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { products as mockProducts } from '../data/products';

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
    // Simula carregamento da API
    setTimeout(() => dispatch({ type: 'SET_PRODUCTS', payload: mockProducts }), 600);
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
