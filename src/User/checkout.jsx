import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  // Data sementara, nanti bisa diambil dari keranjang (cart)
  const [cartItems] = useState([
    { id: 1, name: "Bamboo Toothbrush", price: 29000, quantity: 2 },
    { id: 2, name: "Cotton Tote Bag", price: 49000, quantity: 1 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "transfer",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    alert("Pembayaran berhasil! Pesanan sedang diproses.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
        {/* Ringkasan Pesanan */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × Rp {item.price.toLocaleString()}
                </p>
              </div>
              <p className="font-semibold">
                Rp {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>Rp {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Form Pembayaran */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Informasi Pembayaran</h2>
          <form className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Nomor Telepon"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              name="address"
              placeholder="Alamat Pengiriman"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
            />

            {/* Metode Pembayaran */}
            <div>
              <label className="block font-medium mb-2">
                Metode Pembayaran
              </label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="transfer">Transfer Bank</option>
                <option value="ewallet">E-Wallet (OVO, Dana, GoPay)</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              className="mt-4 w-full rounded-xl bg-green-600 hover:bg-green-700 text-white py-3 font-medium transition"
            >
              Konfirmasi Pembayaran
            </button>

            <Link
              to="/cart"
              className="block text-center mt-2 text-gray-600 hover:text-green-600"
            >
              ← Kembali ke Keranjang
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
