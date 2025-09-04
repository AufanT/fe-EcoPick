import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    price: "Rp 29.000",
    img: "/product-1.jpg",
    description: "Sikat gigi ramah lingkungan berbahan bambu alami.",
    stock: 15,
    rating: 4.8,
    reviews: [
      { id: 1, user: "Alya", text: "Kualitasnya bagus banget, nyaman dipakai.", stars: 5 },
      { id: 2, user: "Rama", text: "Worth it dengan harga segini!", stars: 4 }
    ],
    variants: ["Natural", "Hitam", "Coklat"]
  },
  {
    id: 2,
    name: "Reusable Straw Set",
    price: "Rp 35.000",
    img: "/product-2.jpg",
    description: "Sedotan stainless steel set lengkap dengan sikat pembersih.",
    stock: 30,
    rating: 4.6,
    reviews: [],
    variants: ["Silver", "Gold"]
  },
  {
    id: 3,
    name: "Organic Soap Bar",
    price: "Rp 25.000",
    img: "/product-3.jpg",
    description: "Sabun alami tanpa bahan kimia berbahaya.",
    stock: 50,
    rating: 4.9,
    reviews: [],
    variants: ["Lavender", "Lemon", "Mint"]
  },
  {
    id: 4,
    name: "Cotton Tote Bag",
    price: "Rp 49.000",
    img: "/product-4.jpg",
    description: "Tas kain serbaguna untuk belanja harianmu.",
    stock: 20,
    rating: 4.7,
    reviews: [],
    variants: ["Putih", "Hitam"]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "");
  const [reviews, setReviews] = useState(product?.reviews || []);
  const [newReview, setNewReview] = useState({ user: "", text: "", stars: 5 });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Produk tidak ditemukan</h2>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.text) return;

    setReviews((prev) => [
      ...prev,
      { id: prev.length + 1, user: newReview.user, text: newReview.text, stars: newReview.stars }
    ]);
    setNewReview({ user: "", text: "", stars: 5 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Gambar Produk */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Detail Produk */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <span>⭐ {product.rating}</span>
            <span>•</span>
            <span>{reviews.length} Ulasan</span>
            <span>•</span>
            <span>Stok: {product.stock}</span>
          </div>
          <p className="mt-4 text-green-700 text-2xl font-semibold">{product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Variasi */}
          {product.variants?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Pilih Varian:</h3>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      selectedVariant === variant
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Jumlah:</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition">
              Tambah ke Keranjang
            </button>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>

      {/* Ulasan Produk */}
      <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-6">Ulasan Produk</h2>

        {/* Daftar Ulasan */}
        {reviews.length > 0 ? (
          <div className="space-y-4 mb-8">
            {reviews.map((r) => (
              <div key={r.id} className="border-b pb-3">
                <div className="font-semibold">{r.user}</div>
                <div className="text-yellow-500 text-sm">{"★".repeat(r.stars)}</div>
                <p className="text-gray-700">{r.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mb-8">Belum ada ulasan. Jadilah yang pertama!</p>
        )}

        {/* Form Tambah Ulasan */}
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-300 focus:border-green-400"
              placeholder="Masukkan nama Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ulasan</label>
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-300 focus:border-green-400"
              rows="3"
              placeholder="Tulis ulasan Anda di sini..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <select
              value={newReview.stars}
              onChange={(e) => setNewReview({ ...newReview, stars: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-green-300 focus:border-green-400"
            >
              {[5, 4, 3, 2, 1].map((s) => (
                <option key={s} value={s}>{s} ★</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
          >
            Kirim Ulasan
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
