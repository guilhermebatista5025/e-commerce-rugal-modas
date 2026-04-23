// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate  = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={[styles.nav, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>RUGAL</span>
          <span className={styles.logoSub}>MODAS</span>
        </Link>

        {/* Links desktop */}
        <ul className={[styles.links, menuOpen ? styles.open : ''].join(' ')}>
          <li><Link to="/"     className={location.pathname === '/'     ? styles.active : ''}>Home</Link></li>
          <li><Link to="/loja" className={location.pathname === '/loja' ? styles.active : ''}>Loja</Link></li>
          {user?.role === 'admin' && (
            <li><Link to="/admin" className={location.pathname.startsWith('/admin') ? styles.active : ''}>Admin</Link></li>
          )}
        </ul>

        {/* Ações */}
        <div className={styles.actions}>
          {user ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>Olá, {user.name.split(' ')[0]}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>Sair</button>
            </div>
          ) : (
            <Link to="/login" className={styles.loginBtn}>Entrar</Link>
          )}

          <button className={styles.cartBtn} onClick={toggleCart} aria-label="Carrinho">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems > 99 ? '99+' : totalItems}</span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className={[styles.burger, menuOpen ? styles.burgerOpen : ''].join(' ')}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
