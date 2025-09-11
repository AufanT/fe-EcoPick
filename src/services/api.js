import axios from "axios";

const api = axios.create({
  baseURL: "https://19791ae92e50.ngrok-free.app/api", // cek apakah Swagger pakai /api di depan
  headers: {
    "Content-Type": "application/json",
  },
});

// GET semua produk
export const getProducts = () => api.get("/products");

// POST tambah produk
export const addProduct = (data) => api.post("/addproduct", data);

// Auth
export const login = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);

export const addproduct = (data) => api.post("/admin/products", data);

export default api;
