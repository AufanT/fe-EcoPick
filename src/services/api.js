// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://19791ae92e50.ngrok-free.app/api",
  // NOTE: jangan set Content-Type global di sini karena kita butuh kirim
  // baik JSON maupun FormData tergantung request
});

// Interceptor → otomatis kirim token di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = (page = 1, limit = 10) =>
  api.get(`/admin/products?page=${page}&limit=${limit}`);

// Categories
export const getCategories = () => api.get("/admin/categories");
export const addCategory = (data) => api.post("/admin/categories", data);

// addProduct: bisa terima FormData atau JSON
export const addProduct = (data, config = {}) => {
  if (data instanceof FormData) {
    // pastikan header multipart ditetapkan (axios akan bantu, tapi eksplisit juga oke)
    return api.post("/admin/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
  }
  // kalau bukan FormData kirim biasa (JSON)
  return api.post("/admin/products", data, config);
};

// Auth
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

// Products



export default api;
