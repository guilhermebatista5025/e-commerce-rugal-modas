// src/services/productService.js
import { api } from '../api/api';

export const productService = {
  getAll:    ()      => api.getProducts(),
  getById:   id      => api.getProduct(id),
  create:    data    => api.createProduct(data),
  update:    (id, d) => api.updateProduct(id, d),
  remove:    id      => api.deleteProduct(id),
};
