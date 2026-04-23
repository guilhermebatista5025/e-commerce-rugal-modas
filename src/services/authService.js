// src/services/authService.js
import { api } from '../api/api';

export async function loginUser(email, password) {
  return api.login({ email, password });
}

export async function logoutUser() {
  return api.logout();
}

export function getStoredUser() {
  try {
    const u = localStorage.getItem('rugal_user');
    return u ? JSON.parse(u) : null;
  } catch { return null; }
}

export function storeUser(user) {
  localStorage.setItem('rugal_user', JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem('rugal_user');
  localStorage.removeItem('rugal_token');
}
