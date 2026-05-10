// src/components/admin/AdminLayout.jsx
import { Suspense, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const { user, isAdmin } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply theme class to body or container so CSS variables take effect globally for admin
  useEffect(() => {
    document.documentElement.setAttribute('data-admin-theme', theme);
    return () => {
      document.documentElement.removeAttribute('data-admin-theme');
    };
  }, [theme]);

  if (!user)    return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/"     replace />;

  return (
    <div className={[styles.adminContainer, styles[`theme-${theme}`]].join(' ')}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button 
            className={styles.hamburger}
            onClick={() => setSidebarOpen(true)}
          >
            <span /><span /><span />
          </button>
          
          <div className={styles.topbarRight}>
            <span className={styles.userInfo}>
              Olá, <strong>{user.user_metadata?.full_name?.split(' ')[0] || 'Admin'}</strong>
            </span>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              title={`Mudar para modo ${theme === 'dark' ? 'claro' : 'escuro'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.pageWrap}>
          <Suspense fallback={<div className="spinner" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
