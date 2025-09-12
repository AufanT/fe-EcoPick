import React, { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io"; // pakai heart solid
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Load data dari localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("ecopick_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedCart = localStorage.getItem("ecopick_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Tambah / Hapus favorite
  const toggleFavorite = (product) => {
    let newFavorites;

    if (favorites.some((fav) => fav.id === product.id)) {
      newFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      newFavorites = [...favorites, product];
    }

    setFavorites(newFavorites);
    localStorage.setItem("ecopick_favorites", JSON.stringify(newFavorites));

    window.dispatchEvent(
      new CustomEvent("favoritesUpdated", {
        detail: { favoritesCount: newFavorites.length },
      })
    );
  };

  // Tambah ke keranjang
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("ecopick_cart", JSON.stringify(updatedCart));

    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: { cartCount: updatedCart.length },
      })
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Button Back to Dashboard */}
      <div className="px-6 pt-6 pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300 group w-fit"
        >
          <svg
            className="w-4 h-4 text-gray-600 group-hover:text-green-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-gray-700 group-hover:text-green-600 font-medium transition-colors">
            Back to Dashboard
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-6 pt-2 mb-24">
        <h1 className="text-xl font-semibold mb-6">Favorite</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-600">
            You don’t have any favorite products yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col hover:shadow-md transition"
              >
                {/* Gambar produk */}
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4"
                />

                {/* Nama + Hati */}
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-semibold">{product.name}</h2>
                  <button onClick={() => toggleFavorite(product)}>
                    <IoMdHeart
                      size={20}
                      className={
                        favorites.some((fav) => fav.id === product.id)
                          ? "text-black"
                          : "text-gray-400"
                      }
                    />
                  </button>
                </div>

                {/* Deskripsi */}
                <p className="text-gray-500 text-xs mb-1">Description</p>

                {/* Harga */}
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </p>

                {/* Tombol */}
                <div className="flex gap-2 mt-auto">
                  <button className="flex-1 border border-gray-400 text-sm font-medium px-3 py-0.5 rounded-lg hover:bg-gray-100 transition">
                    Quick View
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-black text-white text-sm font-medium px-3 py-0.5 rounded-lg hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Favorites;
