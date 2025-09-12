import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Footer from "../Components/Footer";

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
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6">
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
                className="border rounded-lg shadow p-4 flex flex-col items-center relative"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-32 h-32 object-contain mb-4"
                />
                <h2 className="text-base font-semibold text-center">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">Description</p>
                <p className="font-medium mb-3">{product.price}</p>

                {/* Favorite toggle */}
                <button
                  onClick={() => toggleFavorite(product)}
                  className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
                >
                  <Heart
                    size={20}
                    fill={
                      favorites.some((fav) => fav.id === product.id)
                        ? "red"
                        : "none"
                    }
                  />
                </button>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="border border-gray-400 text-sm px-3 py-1 rounded hover:bg-gray-100">
                    Quick View
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
