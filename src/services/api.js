import axios from "axios";

const api = axios.create({
  baseURL: "https://6c0171d1b8de.ngrok-free.app/api-docs", // ganti sesuai baseURL swagger
  headers: {
    "Content-Type": "application/json",
  },
});

// contoh: GET semua produk
export const getProducts = () => api.get("/products");

// contoh: POST tambah produk
export const addProduct = (data) => api.post("/addproduct", data);

export default api;
