import React from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  // Data keranjang
  const cartItems = [
    {
      id: 1,
      name: "Sikat Gigi Bambu",
      price: 25000,
      quantity: 2,
      image: "/produk1.jpg",
    },
    {
      id: 2,
      name: "Sedotan Stainless",
      price: 18000,
      quantity: 1,
      image: "/produk2.jpg",
    },
  ];

  // Hitung subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 10000;
  const total = subtotal + shipping;

  // ID pesanan (seharusnya dari backend)
  const orderId = "INV-20250904-001";

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* List Item */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-green-600 font-medium">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center mt-2">
                    <button className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300">
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700">Hapus</button>
            </div>
          ))}
        </div>

        {/* Ringkasan Pesanan */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Ongkos Kirim</span>
            <span>Rp {shipping.toLocaleString("id-ID")}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>

          <Link to={`/checkout/${orderId}`}>
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
              Lanjutkan ke Pembayaran
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
