// src/router/index.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartSidebar from '../components/CartSidebar';
import AdminLayout from '../components/admin/AdminLayout';
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
