import React, { useMemo, useState } from "react";

const CartPage = () => {
  // Data keranjang (sementara hardcoded, nanti bisa dari context/backend)
  const [items, setItems] = useState([
    { id: 1, name: "Sikat Gigi Bambu", price: 25000, quantity: 2, image: "/produk1.jpg" },
    { id: 2, name: "Sedotan Stainless", price: 18000, quantity: 1, image: "/produk2.jpg" },
  ]);

  const increment = (id) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, quantity: it.quantity + 1 } : it));
  };
  const decrement = (id) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it));
  };
  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };
  const clearAll = () => setItems([]);

  const [city, setCity] = useState("Jakarta");
  const shippingByCity = (city) => ({
    Jakarta: 10000,
    Bandung: 12000,
    Surabaya: 15000,
    Yogyakarta: 13000,
  })[city] ?? 18000;

  // Hitung subtotal
  const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);

  const shipping = useMemo(() => shippingByCity(city), [city]);
  const [voucher, setVoucher] = useState("");
  const discount = useMemo(() => {
    if (voucher.trim().toUpperCase() === "ECO10") return Math.round(subtotal * 0.1);
    if (voucher.trim().toUpperCase() === "FREESHIP") return shipping; // gratis ongkir
    return 0;
  }, [voucher, subtotal, shipping]);
  const total = Math.max(0, subtotal + shipping - discount);

  // ID pesanan (seharusnya dari backend)
  // const orderId = "INV-20250904-001";

  return (
    <div className="min-h-screen pt-28 px-4 md:px-8 lg:px-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Keranjang Belanja
          </h1>
          <p className="text-gray-600 text-lg">Kelola produk ramah lingkungan pilihan Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* List Item */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Header */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{items.length}</span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {items.length} {items.length === 1 ? 'item' : 'items'} dalam keranjang
                  </span>
                </div>
                {items.length > 0 && (
                  <button 
                    onClick={clearAll} 
                    className="px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 rounded-full transition-all duration-300 font-medium"
                  >
                    Hapus Semua
                  </button>
                )}
              </div>
            </div>

            {/* Cart Items or Empty State */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              {items.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🛒</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Keranjang Anda Kosong</h3>
                  <p className="text-gray-500 mb-6">Temukan produk eco-friendly terbaik untuk gaya hidup berkelanjutan</p>
                  <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <span>🌱</span>
                    Mulai Belanja Sekarang
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                        <div className="w-full h-full bg-green-100 rounded-xl overflow-hidden shadow-md">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                          <span className="text-2xl font-bold text-green-600">
                            Rp {item.price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-sm text-gray-500">per item</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="inline-flex items-center bg-white rounded-full shadow-md border border-gray-200 overflow-hidden">
                          <button 
                            onClick={() => decrement(item.id)} 
                            className="w-10 h-10 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors font-bold text-lg"
                          >
                            −
                          </button>
                          <div className="w-12 h-10 flex items-center justify-center bg-green-50 font-bold text-lg">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => increment(item.id)} 
                            className="w-10 h-10 flex items-center justify-center hover:bg-green-50 hover:text-green-600 transition-colors font-bold text-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-center md:text-right flex-shrink-0">
                        <div className="text-sm text-gray-500 mb-1">Subtotal</div>
                        <div className="text-xl md:text-2xl font-bold text-green-600 mb-3">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 rounded-full transition-all duration-300 font-medium"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/30 sticky top-24 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">📋</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Ringkasan Pesanan</h2>
            </div>

            {/* City Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                🏙️ Pilih Kota Pengiriman
              </label>
              <select 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white shadow-sm text-gray-700 font-medium transition-colors"
              >
                {['Jakarta','Bandung','Surabaya','Yogyakarta','Lainnya'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Voucher */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                🎫 Kode Voucher
              </label>
              <div className="flex gap-3">
                <input 
                  value={voucher} 
                  onChange={(e)=>setVoucher(e.target.value)} 
                  placeholder="ECO10 / FREESHIP" 
                  className="flex-1 p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none shadow-sm transition-colors" 
                />
                <button className="px-6 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 font-medium transition-all duration-300 hover:shadow-md">
                  Terapkan
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="font-bold text-lg">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">Ongkos Kirim</span>
                <span className="font-bold text-lg">Rp {shipping.toLocaleString("id-ID")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center py-2 text-green-600 bg-green-50 rounded-lg px-4">
                  <span className="font-medium flex items-center gap-2">
                    🎉 Diskon
                  </span>
                  <span className="font-bold text-lg">- Rp {discount.toLocaleString("id-ID")}</span>
                </div>
              )}
            </div>

            <hr className="border-2 border-gray-100 my-6" />

            <div className="flex justify-between items-center py-4 bg-green-50 rounded-xl px-6 mb-8">
              <span className="text-xl font-bold text-gray-800">Total Pembayaran</span>
              <span className="text-2xl font-bold text-green-600">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <button className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
              <span>💳</span>
              Lanjutkan ke Pembayaran
              <span>→</span>
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">🔒 Pembayaran aman & terenkripsi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;