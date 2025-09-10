import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Stainless Steel Tumbler",
    price: "Rp130.000",
    img: "/public/image 24.png",
  },
  {
    id: 2,
    name: "Ceramic Cup",
    price: "Rp25.000",
    img: "/public/image 4.png",
  },
  {
    id: 3,
    name: "Ceramic Plate",
    price: "Rp40.000",
    img: "/public/image 23.png",
  },
  { 
    id: 4, 
    name: "Bamboo Toothbrush", 
    price: "Rp12.500", 
    img: "/public/image 10.png" 
  },
  { 
    id: 5, 
    name: "Stainless Steel Straw", 
    price: "Rp3.500", 
    img: "/public/Group 19.png" 
  },
];

const testimonials = [
  {
    id: 1,
    name: "Alya",
    text: "Kualitas bagus, pengiriman cepat, dan benar-benar ramah lingkungan!",
    avatar: "/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Rama",
    text: "Sikat bambunya nyaman dipakai. Repeat order deh!",
    avatar: "/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Intan",
    text: "Senang bisa belanja sambil peduli lingkungan 🌱",
    avatar: "/avatar-3.jpg",
  },
];

const posts = [
  {
    id: 1,
    title: "5 Cara Mengurangi Plastik Sekali Pakai",
    img: "/blog-1.jpg",
  },
  { id: 2, title: "Kenapa Bambu Lebih Berkelanjutan?", img: "/blog-2.jpg" },
  { id: 3, title: "Tips Hidup Minimalis & Eco-Friendly", img: "/blog-3.jpg" },
];

export const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ecopick_cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);

      // Update cart counter in navbar
      const cartCount = parsedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      window.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: { cartCount },
        })
      );
    }
  }, []);

  const handleSubscribe = () => {
    const isValid = /.+@.+\..+/.test(email);
    if (!isValid) {
      setToast({ open: true, message: "Invalid email", variant: "error" });
    } else {
      setToast({
        open: true,
        message: "Successfully subscribed!",
        variant: "success",
      });
      setEmail("");
    }
    clearTimeout(window._db_toast_timer);
    window._db_toast_timer = setTimeout(
      () => setToast((t) => ({ ...t, open: false })),
      2000
    );
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);

    // Simpan ke localStorage
    localStorage.setItem("ecopick_cart", JSON.stringify(newCart));

    // Update cart counter di navbar
    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: {
          cartCount: newCart.reduce((total, item) => total + item.quantity, 0),
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

      {/* Hero Video Section */}
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
          <div>
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
                Learn Our Mission
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="pt-4" />

      {/* Shop Section */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
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
          {products.map((p) => (
            <div
              key={p.id}
              className="relative flex flex-col bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition"
            >
              {/* Heart Icon */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-h-32 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
              <p className="text-xs text-gray-500 mb-5">Description</p>
              <h3 className="text-l font-semibold mb-2 text-gray-900">
                {p.price}
              </h3>

              {/* Buttons */}
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

      {/* Best Seller Section */}
      <section id="shop" className="max-w-7xl mx-auto px-6 ">
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
          {products.map((p) => (
            <div
              key={p.id}
              className="relative flex flex-col bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition"
            >
              {/* Heart Icon */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-h-32 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
              <p className="text-xs text-gray-500 mb-5">Description</p>

              {/* Buttons */}
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

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* About Section */}
      <section id="about" className="bg-white">
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
            <a
              href="#impact"
              className="inline-block mt-6 px-5 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              See Our Impact
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden shadow">
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

      {/* Impact Section */}
      <section id="impact" className="bg-green-700">
        <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-8 text-center text-white">
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">1.2K+</div>
            <div className="mt-1 opacity-90">Caring Customers</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">8.5 Ton</div>
            <div className="mt-1 opacity-90">Plastic Waste Saved</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold">1.000+</div>
            <div className="mt-1 opacity-90">Trees Planted</div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          What They Say
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover bg-gray-200"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-yellow-500 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Start Small Changes Today
          </h2>
          <p className="mt-2 text-gray-600">
            Join our newsletter for promotions & sustainable living tips.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white shadow w-full sm:w-80 outline-none ring-2 ring-transparent focus:ring-green-300"
            />
            <button
              onClick={handleSubscribe}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              Subscribe
            </button>
          </div>
          <div aria-live="polite" className="sr-only">
            {toast.open ? toast.message : ""}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-6xl mx-auto px-6 py-16" id="faq">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Articles & Tips
            </h2>
            <p className="text-gray-600 mt-1">
              Learn to live more environmentally friendly.
            </p>
          </div>
          <Link to="/blog" className="text-green-700 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-[16/10] bg-gray-200">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 line-clamp-2">
                  {p.title}
                </h3>
                <Link
                  to={`/blog/${p.id}`}
                  className="inline-block mt-3 text-green-700 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
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
