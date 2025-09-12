import axios from "axios";

const api = axios.create({
  baseURL: "https://19791ae92e50.ngrok-free.app/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// GET semua produk (admin)
export const getProducts = () => api.get("/admin/products");

// POST tambah produk (admin)
export const addProduct = (data) => api.post("/admin/products", data);

// Auth
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

export default api;
