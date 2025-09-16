import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Impor useNavigate
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// (BARU) Impor fungsi API yang kita buat di Langkah 1
import { fetchPublicProducts, addItemToCart } from "../services/api"; 

export const dashboard = () => {
  const navigate = useNavigate(); // (BARU) Untuk redirect ke login

  // (BARU) State untuk data dinamis
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: "", variant: "success" });
  
  // State untuk favorites (Wishlist) - Biarkan ini tetap pakai localStorage untuk sekarang
  // Kita akan integrasikan ini di langkah berikutnya
  const [favorites, setFavorites] = useState([]);

  // Init AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // (BARU) Load data produk dari Backend saat halaman dibuka
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Panggil API untuk produk homepage (ini akan otomatis memberi rekomendasi jika user login)
        //
        const res = await fetchPublicProducts(true);
        
        // Backend mengembalikan struktur data: { data: { products: [], message: "..." } }
        const productData = res.data?.data?.products || [];
        
        setProducts(productData);
        
        // Kita bisa gunakan 5 produk pertama sebagai "Recommendation" dan sisanya sebagai "Best Seller" (atau sebaliknya)
        // Untuk saat ini kita tampilkan saja semua di "Recommendation" dan "Best Seller"
        setRecommendations(productData.slice(0, 5)); // Ambil 5 untuk demo

      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        setToast({ open: true, message: "Gagal memuat produk dari server.", variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  // (BARU) Logika "Add to Cart" (MURNI API)
  const addToCart = async (product) => {
    // 1. Cek apakah user sudah login (apakah ada token)
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika tidak ada token, paksa user ke halaman login
      alert("Anda harus login untuk menambahkan barang ke keranjang.");
      navigate("/login");
      return;
    }

    // 2. Jika sudah login, panggil API backend
    try {
      //
      // Panggil API untuk menambah ke keranjang DB
      const res = await addItemToCart(product.id, 1); 
      
      console.log("Respon Add Cart:", res.data);

      // 3. Tampilkan notifikasi sukses
      setToast({
        open: true,
        message: `${product.name} ditambahkan ke keranjang!`,
        variant: "success",
      });

      // 4. (Opsional tapi penting) Update counter di Navbar
      // Karena kita tidak lagi pakai localStorage, kita perlu cara lain untuk update navbar
      // Kita bisa panggil API GET /api/cart lagi, atau kita panggil event global
      // Mari kita coba panggil event global (Navbar.jsx sudah mendengarkan event ini)
      
      // (Kita tidak tahu jumlah total cart sekarang, jadi kita minta Navbar untuk refresh datanya)
      // NOTE: Ini perlu perbaikan di Navbar agar mengambil data dari API, bukan localStorage.
      // Untuk sementara, kita biarkan logic lama di navbar:
       const savedCart = localStorage.getItem('ecopick_cart_dummy_count') || 0;
       const newCount = parseInt(savedCart) + 1;
       localStorage.setItem('ecopick_cart_dummy_count', newCount);
       window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cartCount: newCount } }));
       // INI HANYA SEMENTARA agar counter di navbar tetap naik. Idealnya, Navbar.jsx juga harus fetch ke GET /api/cart

    } catch (error) {
      console.error("Gagal menambah ke keranjang:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || "Anda harus login untuk menambah item.";
      setToast({ open: true, message: errorMsg, variant: "error" });
      
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
         navigate("/login"); // Token tidak valid atau tidak ada, paksa login
      }
    }

    // Hapus toast setelah beberapa detik
    clearTimeout(window._db_toast_timer);
    window._db_toast_timer = setTimeout(
      () => setToast((t) => ({ ...t, open: false })),
      3000
    );
  };


  // Logika Favorites (masih pakai localStorage, belum diubah)
  useEffect(() => {
    const savedFavorites = localStorage.getItem("ecopick_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (product) => {
    let newFavorites;
    if (favorites.some((fav) => fav.id === product.id)) {
      newFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      newFavorites = [...favorites, product];
    }
    setFavorites(newFavorites);
    localStorage.setItem("ecopick_favorites", JSON.stringify(newFavorites));
  };


  // --- Helper Tampilan ---
  const renderProductCard = (p, idx) => (
     <div
        key={p.id}
        className="relative flex flex-col bg-white rounded-2xl border border-gray-200 p-5 
       hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
        data-aos="zoom-in"
        data-aos-delay={idx * 100}
      >
        <button
          onClick={() => toggleFavorite(p)}
          className={`absolute top-4 right-4 transition ${
            favorites.some((fav) => fav.id === p.id)
              ? "text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart
            className="w-5 h-5"
            fill={
              favorites.some((fav) => fav.id === p.id) ? "red" : "none"
            }
          />
        </button>

        <div className="flex justify-center mb-4 h-32 items-center">
          <img
            src={p.image_url} // (DIUBAH) Pakai image_url dari API
            alt={p.name}
            className="max-h-32 object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
        <p className="text-xs text-gray-500 mb-5 truncate">{p.description}</p>
        <h3 className="text-l font-semibold mb-2 text-gray-900">
          Rp {parseFloat(p.price).toLocaleString("id-ID")} {/* (DIUBAH) Parsing harga dari API */}
        </h3>

        <div className="flex justify-between gap-2 mt-auto">
          <button className="flex-1 py-1.5 text-sm border border-black rounded-full hover:bg-gray-100 transition">
            {/* (DIUBAH) Link ke detail produk dinamis */}
            <Link to={`/product/${p.id}`}>Quick View</Link>
          </button>
          <button
            onClick={() => addToCart(p)} // (DIUBAH) Memanggil fungsi API baru
            className="flex-1 py-1.5 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section (Tidak berubah) */}
      <section className="relative w-full h-screen" id="home">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videoproduk.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videoproduk-poster.jpg"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
          <div data-aos="fade-up">
            <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow">
              Our Products
            </h1>
            <p className="mt-4 text-white/90 max-w-2xl mx-auto">
              Choose your favorite eco-friendly products and start small steps
              for a better earth.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="#shop"
                className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition"
              >
                Shop Now
              </a>
              <a
                href="#about"
                className="px-6 py-3 rounded-full border border-white/70 text-white hover:bg-white hover:text-green-700 transition"
              >
                What is EcoPick?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section (DIUBAH) */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-14">
        <div
          className="flex items-center justify-between mb-8"
          data-aos="fade-up"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Recommendation
          </h2>
          <Link
            to="/products"
            className="text-green-700 hover:text-green-800 hover:underline font-medium"
          >
            See more...
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            recommendations.map((p, idx) => renderProductCard(p, idx))
          )}
        </div>
      </section>

      {/* Best Seller (DIUBAH) */}
      <section id="shop" className="max-w-7xl mx-auto px-6" data-aos="fade-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Best Seller
          </h2>
          <Link
            to="/products"
            className="text-green-700 hover:text-green-800 hover:underline font-medium"
          >
            See more...
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
           {loading ? (
            <p>Loading products...</p>
          ) : (
            // (Kita gunakan semua produk lagi untuk demo, idealnya ini adalah API call yang berbeda)
            products.map((p, idx) => renderProductCard(p, idx))
          )}
        </div>
      </section>

      {/* About (Tidak berubah) */}
      <section id="about" className="bg-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center mt-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              About EcoPick
            </h2>
            <p className="mt-3 text-gray-600">
              EcoPick is here to make it easier for you to switch to more
              sustainable products without hassle. We choose eco-friendly
              materials, responsible production processes, and minimal plastic
              packaging.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>• Natural & recyclable materials</li>
              <li>• Local & ethical suppliers</li>
              <li>• Every transaction contributes to tree planting</li>
            </ul>
          </div>
          <div
            className="rounded-2xl overflow-hidden shadow"
            data-aos="zoom-in"
          >
            <img
              src="/public/eco.jpeg"
              alt="Eco mission"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Toast (Notifikasi) */}
      {toast.open && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow ${
            toast.variant === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;