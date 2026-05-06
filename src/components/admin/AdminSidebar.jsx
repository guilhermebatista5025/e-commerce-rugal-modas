// src/components/admin/AdminSidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Users, BarChart3, Globe, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import styles from './AdminLayout.module.css';

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const { logout } = useUser();
  const location = useLocation();

  const links = [
    { to: '/admin',              label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
    { to: '/admin/produtos',     label: 'Produtos',   icon: <ShoppingBag size={18} /> },
    { to: '/admin/estoque',      label: 'Estoque',    icon: <Package size={18} /> },
    { to: '/admin/funcionarios', label: 'Funcionários', icon: <Users size={18} /> },
    { to: '/admin/relatorios',   label: 'Relatórios', icon: <BarChart3 size={18} /> },
  ];

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
      
      <aside className={[styles.sidebar, isOpen ? styles.sidebarOpen : ''].join(' ')}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoText}>RUGAL</div>
            <div className={styles.logoSub}>ADMIN</div>
          </Link>
          <button className={styles.closeMobile} onClick={() => setIsOpen(false)}>×</button>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {links.map(l => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={[styles.navLink, active ? styles.navActive : ''].join(' ')}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.navIcon}>{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.storeLink}>
            <span className={styles.navIcon}><Globe size={18} /></span> Ver Loja
          </Link>
          <button onClick={logout} className={styles.logoutBtn}>
            <span className={styles.navIcon}><LogOut size={18} /></span> Sair
          </button>
        </div>
      </aside>
    </>
  );
}
