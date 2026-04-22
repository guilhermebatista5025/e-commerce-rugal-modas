// src/router/index.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartSidebar from '../components/CartSidebar';
import { useUser } from '../context/UserContext';

// Lazy pages
const Home        = lazy(() => import('../pages/Home'));
const Loja        = lazy(() => import('../pages/Loja'));
const Produto     = lazy(() => import('../pages/Produto'));
const Carrinho    = lazy(() => import('../pages/Carrinho'));
const Login       = lazy(() => import('../pages/Login'));

// Admin pages
const AdminDashboard    = lazy(() => import('../pages/admin/Dashboard'));
const AdminProdutos     = lazy(() => import('../pages/admin/Produtos'));
const AdminEstoque      = lazy(() => import('../pages/admin/Estoque'));
const AdminFuncionarios = lazy(() => import('../pages/admin/Funcionarios'));
const AdminRelatorios   = lazy(() => import('../pages/admin/Relatorios'));

/* ---- Layouts ---- */

function PublicLayout() {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <Suspense fallback={<div className="spinner" style={{ marginTop: 120 }} />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

function AdminLayout() {
  const { user, isAdmin } = useUser();
  if (!user)    return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/"     replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: 'var(--space-10)', paddingTop: 'calc(var(--space-10) + 20px)', overflowX: 'auto' }}>
        <Suspense fallback={<div className="spinner" />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

function AdminSidebar() {
  const { logout } = useUser();
  const links = [
    { to: '/admin',              label: 'Dashboard',  icon: '📊' },
    { to: '/admin/produtos',     label: 'Produtos',   icon: '🛍️' },
    { to: '/admin/estoque',      label: 'Estoque',    icon: '📦' },
    { to: '/admin/funcionarios', label: 'Funcionários', icon: '👤' },
    { to: '/admin/relatorios',   label: 'Relatórios', icon: '📈' },
  ];

  return (
    <aside style={{
      width: 220,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-6) 0',
      position: 'sticky',
      top: 0,
      height: '100vh',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', padding: '0 var(--space-5) var(--space-6)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-xl)', color: 'var(--color-gold)', fontWeight: 900, letterSpacing: '0.1em' }}>RUGAL</div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', letterSpacing: '0.3em', fontWeight: 300 }}>ADMIN</div>
      </a>

      {/* Nav */}
      <nav style={{ flex: 1, padding: 'var(--space-4) var(--space-3)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {links.map(l => (
          <a
            key={l.to}
            href={l.to}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              padding: '10px var(--space-4)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontSize: 'var(--fs-sm)',
              color: window.location.pathname === l.to ? 'var(--color-gold)' : 'var(--text-secondary)',
              background: window.location.pathname === l.to ? 'rgba(224,168,72,0.1)' : 'transparent',
              transition: 'all 0.15s ease',
              fontFamily: 'var(--font-body)',
              fontWeight: window.location.pathname === l.to ? 600 : 400,
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--color-gold)'; e.target.style.background = 'rgba(224,168,72,0.08)'; }}
            onMouseLeave={e => {
              const active = window.location.pathname === l.to;
              e.target.style.color = active ? 'var(--color-gold)' : 'var(--text-secondary)';
              e.target.style.background = active ? 'rgba(224,168,72,0.1)' : 'transparent';
            }}
          >
            <span>{l.icon}</span>
            {l.label}
          </a>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: 'var(--space-4) var(--space-3)', borderTop: '1px solid var(--border-color)' }}>
        <a href="/" style={{ display:'flex',alignItems:'center',gap:8,fontSize:'var(--fs-sm)',color:'var(--text-secondary)',textDecoration:'none',padding:'8px var(--space-4)',borderRadius:'var(--radius-md)' }}>
           Ver Loja
        </a>
        <button
          onClick={logout}
          style={{ display:'flex',alignItems:'center',gap:8,width:'100%',padding:'8px var(--space-4)',background:'transparent',border:'none',cursor:'pointer',fontSize:'var(--fs-sm)',color:'var(--color-danger)',fontFamily:'var(--font-body)',borderRadius:'var(--radius-md)' }}
        >
           Sair
        </button>
      </div>
    </aside>
  );
}

/* ---- Router ---- */
const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/',          element: <Home /> },
      { path: '/loja',      element: <Loja /> },
      { path: '/produto/:id', element: <Produto /> },
      { path: '/carrinho',  element: <Carrinho /> },
      { path: '/login',     element: <Login /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true,              element: <AdminDashboard /> },
      { path: 'produtos',         element: <AdminProdutos /> },
      { path: 'estoque',          element: <AdminEstoque /> },
      { path: 'funcionarios',     element: <AdminFuncionarios /> },
      { path: 'relatorios',       element: <AdminRelatorios /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
