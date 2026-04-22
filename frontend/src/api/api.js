// src/api/api.js
// Camada de API — configurar BASE_URL para o backend real

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('rugal_token');
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Produtos
  getProducts:   ()       => request('/products'),
  getProduct:    id       => request(`/products/${id}`),
  createProduct: data     => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, d)  => request(`/products/${id}`, { method: 'PUT',  body: JSON.stringify(d) }),
  deleteProduct: id       => request(`/products/${id}`, { method: 'DELETE' }),

  // Auth
  login:  creds => request('/auth/login',  { method: 'POST', body: JSON.stringify(creds) }),
  logout: ()    => request('/auth/logout', { method: 'POST' }),

  // Pedidos
  createOrder: data => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders:   ()   => request('/orders'),

  // Funcionários
  getEmployees:   ()    => request('/employees'),
  createEmployee: data  => request('/employees', { method: 'POST', body: JSON.stringify(data) }),
  deleteEmployee: id    => request(`/employees/${id}`, { method: 'DELETE' }),

  // Relatórios
  getSalesReport: (from, to) =>
    request(`/reports/sales?from=${from}&to=${to}`),
};
