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
// Products (Admin - sudah ada)
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
// Categories (Admin - sudah ada)
// =======================
export const getCategories = () => api.get("/admin/categories");
export const addCategory = (data) => api.post("/admin/categories", data);

// =======================
// Auth (Sudah ada)
// =======================
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

// =======================
// (BARU) Product & Cart API untuk User
// =======================
/**
 * Mengambil produk untuk etalase publik.
 * Jika homepage=true, BE akan otomatis memberi rekomendasi jika user login.
 */
export const fetchPublicProducts = (isHomepage = false) => 
  api.get(`/products?homepage=${isHomepage}`);

/**
 * Menambah item ke keranjang di database (Wajib Login)
 */
export const addItemToCart = (productId, quantity = 1) => 
  api.post("/cart", { product_id: productId, quantity: quantity });

// Tambahkan fungsi-fungsi ini ke dalam file api.js Anda yang sudah ada

/**
 * (BARU) Mengambil semua item keranjang user dari database
 */
export const getCartItems = () => api.get("/cart");

/**
 * (BARU) Update kuantitas item di keranjang database
 */
export const updateCartItemQty = (productId, newQuantity) => 
  api.put(`/cart/${productId}`, { quantity: newQuantity });

/**
 * (BARU) Menghapus item dari keranjang database
 */
export const deleteCartItem = (productId) => 
  api.delete(`/cart/${productId}`);

/**
 * (BARU) Memproses checkout. 
 * BE akan otomatis membaca keranjang dari DB.
 */
export const processCheckout = () => api.post("/orders/checkout");

export default api;