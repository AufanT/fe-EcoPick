import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    price: "Rp 29.000",
    img: "/public/sikatgigi.jpeg",
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
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [showToast, setShowToast] = useState(false);
  const galleryImages = (product && product.images && product.images.length > 0) ? product.images : [product?.img].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(galleryImages[0] || "");

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-8 text-sm text-gray-600">
        <nav className="flex items-center gap-2" aria-label="Breadcrumb">
          <Link to="/" className="hover:underline">Beranda</Link>
          <span>›</span>
          <Link to="/products" className="hover:underline">Produk</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
        {/* Gambar Produk */}
        <div className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200/60 hover:ring-green-300/60 transition relative self-start">
          <div className="aspect-[4/3] bg-gray-200 group overflow-hidden">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover transition duration-300 ease-out group-hover:scale-105" loading="lazy" decoding="async" />
          </div>
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.stock > 0 ? 'Stok Tersedia' : 'Stok Habis'}
          </div>
          {galleryImages.length > 1 && (
            <div className="px-2 pb-2">
              <div className="mt-3 grid grid-cols-6 sm:grid-cols-8 gap-2">
                {galleryImages.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-lg overflow-hidden ring-1 transition ${selectedImage === img ? 'ring-green-500' : 'ring-gray-200 hover:ring-green-300'}`}
                    aria-label="Pilih gambar"
                  >
                    <img src={img} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detail Produk */}
        <div className="md:sticky md:top-24 self-start">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-700">
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-gray-600">{product.rating.toFixed(1)}</span>
            <span className="text-gray-400">•</span>
            <span>{reviews.length} Ulasan</span>
            <span className="text-gray-400">•</span>
            <span>Stok: {product.stock}</span>
          </div>
          <p className="mt-4 text-green-700 text-2xl font-semibold">{product.price}</p>

          {/* Tabs Konten */}
          <div className="mt-6">
            <div className="flex gap-2 text-sm">
              {[
                { key: 'deskripsi', label: 'Deskripsi' },
                { key: 'spesifikasi', label: 'Spesifikasi' },
                { key: 'ulasan', label: 'Ulasan' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-full border transition ${activeTab === tab.key ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  aria-pressed={activeTab === tab.key}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === 'deskripsi' && (
              <p className="mt-4 text-gray-700">{product.description}</p>
            )}
            {activeTab === 'spesifikasi' && (
              <div className="mt-4 text-gray-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Rating: {product.rating.toFixed(1)} / 5</li>
                  <li>Stok: {product.stock} unit</li>
                  {product.variants?.length > 0 && (
                    <li>Varian: {product.variants.join(', ')}</li>
                  )}
                  <li>Ramah lingkungan dan mudah didaur ulang</li>
                </ul>
              </div>
            )}
          </div>

          {/* Variasi */}
          {product.variants?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Pilih Varian:</h3>
              <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Pilih varian produk">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded-full border transition will-change-transform ${
                      selectedVariant === variant
                        ? 'bg-green-600 text-white border-green-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:scale-[1.02]'
                    }`}
                    aria-pressed={selectedVariant === variant}
                    aria-label={`Pilih varian ${variant}`}
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
            <button
              disabled={product.stock === 0}
              onClick={() => {
                if (product.stock === 0) return;
                setShowToast(true);
                window.clearTimeout((window)._toastTimer);
                (window)._toastTimer = window.setTimeout(() => setShowToast(false), 2000);
              }}
              aria-label="Tambah produk ke keranjang"
              className={`px-6 py-3 rounded-xl font-medium transition ${product.stock === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
              Tambah ke Keranjang
            </button>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Kembali
            </Link>
          </div>

          {/* Info pengiriman & pengembalian */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="font-semibold text-gray-900">Pengiriman</div>
              <p className="text-gray-600 mt-1">Estimasi 1-3 hari kerja. Gratis ongkir di atas Rp100.000.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="font-semibold text-gray-900">Pengembalian</div>
              <p className="text-gray-600 mt-1">Garansi 7 hari. Tukar/retur mudah jika ada kendala.</p>
            </div>
          </div>
          {/* Trust badges */}
          <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
              <span role="img" aria-label="Eco">🌱</span>
              <span className="text-gray-700">Ramah lingkungan</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
              <span role="img" aria-label="Shield">🛡️</span>
              <span className="text-gray-700">Garansi 7 hari</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
              <span role="img" aria-label="Box">📦</span>
              <span className="text-gray-700">Pengemasan minim plastik</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ulasan Produk (Tab) */}
      {activeTab === 'ulasan' && (
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
      )}

      {/* Produk terkait */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-green-700 mt-1">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Toast sukses */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Berhasil ditambahkan ke keranjang
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
