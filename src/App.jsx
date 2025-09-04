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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
