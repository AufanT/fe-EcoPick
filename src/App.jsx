import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from "./User/Dashboard";
import Navbar from "./Components/Navbar";
import CartPage from "./User/cart";
import DashboardAdmin from "./Admin/dashboardadmin";
import ProductDetail from "./User/detailproduk";
import Checkout from "./User/checkout";
import Login from "./User/login";
import Products from "./User/products";
import Register from "./User/register";
import Contact from "./User/contact";
import About from "./User/about";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
