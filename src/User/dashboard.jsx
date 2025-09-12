import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Heart } from "lucide-react";

// ✅ Tambahin AOS
import AOS from "aos";
import "aos/dist/aos.css";

const products = [
  {
    id: 1,
    name: "Stainless Steel Tumbler",
    price: 130000,
    img: "/public/image 24.png",
  },
  {
    id: 2,
    name: "Ceramic Cup",
    price: 25000,
    img: "/public/image 4.png",
  },
  {
    id: 3,
    name: "Ceramic Plate",
    price: 40000,
    img: "/public/image 23.png",
  },
  {
    id: 4,
    name: "Bamboo Toothbrush",
    price: 12500,
    img: "/public/image 10.png",
  },
  {
    id: 5,
    name: "Stainless Steel Straw",
    price: 3500,
    img: "/public/Group 19.png",
  },
];

export const Dashboard = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // ✅ Init AOS sekali aja
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("ecopick_cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);

      const cartCount = parsedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      window.dispatchEvent(
        new CustomEvent("cartUpdated", { detail: { cartCount } })
      );
    }
  }, []);

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

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, qty: 1, checked: true }];
    }

    setCart(newCart);
    localStorage.setItem("ecopick_cart", JSON.stringify(newCart));

    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: {
          cartCount: newCart.reduce((total, item) => total + item.qty, 0),
        },
      })
    );

    setToast({
      open: true,
      message: `${product.name} ditambahkan ke keranjang!`,
      variant: "success",
    });

    clearTimeout(window._db_toast_timer);
    window._db_toast_timer = setTimeout(
      () => setToast((t) => ({ ...t, open: false })),
      2000
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
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

      {/* Shop Section */}
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
          {products.map((p, idx) => (
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

              <div className="flex justify-center mb-4">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-h-32 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
              <p className="text-xs text-gray-500 mb-5">Description</p>
              <h3 className="text-l font-semibold mb-2 text-gray-900">
                Rp {p.price.toLocaleString("id-ID")}
              </h3>

              <div className="flex justify-between gap-2 mt-auto">
                <button className="flex-1 py-1.5 text-sm border border-black rounded-full hover:bg-gray-100 transition">
                  <Link to={`/product/${p.id}`}>Quick View</Link>
                </button>
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 py-1.5 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Seller */}
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
          {products.map((p, idx) => (
            <div
              key={p.id}
              className="relative flex flex-col bg-white rounded-2xl border border-gray-200 p-5 
             hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
                <Heart className="w-5 h-5" />
              </button>

              <div className="flex justify-center mb-4">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-h-32 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
              <p className="text-xs text-gray-500 mb-5">Description</p>
                 <h3 className="text-l font-semibold mb-2 text-gray-900">
                Rp {p.price.toLocaleString("id-ID")}
              </h3>

              <div className="flex justify-between gap-2 mt-auto">
                <button className="flex-1 py-1.5 text-sm border border-black rounded-full hover:bg-gray-100 transition">
                  <Link to={`/product/${p.id}`}>View</Link>
                </button>
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 py-1.5 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
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
              src="/about.jpg"
              alt="Eco mission"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <Footer />

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
