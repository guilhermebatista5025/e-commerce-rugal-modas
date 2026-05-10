// src/App.jsx
import { UserProvider }    from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider }   from './context/ThemeContext';
import AppRouter from './router/index';

export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </ProductProvider>
    </UserProvider>
  );
}
