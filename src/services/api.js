// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Interceptor → otomatis kirim token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =======================
// Products
// =======================
export const getProducts = (page = 1, limit = 10) =>
  api.get(`/admin/products?page=${page}&limit=${limit}`);

export const addProduct = (data, config = {}) => {
  if (data instanceof FormData) {
    return api.post("/admin/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
      ...config,
    });
  }
  return api.post("/admin/products", data, config);
};

// =======================
// Categories
// =======================
export const getCategories = () => api.get("/admin/categories");
export const addCategory = (data) => api.post("/admin/categories", data);

// =======================
// Auth
// =======================
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

export default api;
