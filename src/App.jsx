// src/App.jsx
import { CartProvider }    from './context/CartContext';
import { UserProvider }    from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider }   from './context/ThemeContext';
import AppRouter from './router/index';

export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}
