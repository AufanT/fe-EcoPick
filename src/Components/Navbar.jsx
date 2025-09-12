import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { Link } from "react-router-dom";
import 'aos/dist/aos.css';

const Navbar = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 state search

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      setLastScrollY(window.scrollY);
    };

    // Load cart & favorites
    const savedCart = localStorage.getItem('ecopick_cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      const count = parsedCart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    }

    const savedFavorites = localStorage.getItem('ecopick_favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setFavoritesCount(favoriteIds.length);
    }

    // Event listener untuk cart & favorites
    const handleCartUpdate = (event) => setCartCount(event.detail.cartCount);
    const handleFavoritesUpdate = (event) => setFavoritesCount(event.detail.favoritesCount);

    window.addEventListener('scroll', controlNavbar);
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [lastScrollY]);

  // 🔍 Dispatch event global kalau search berubah
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("searchUpdated", { detail: { searchQuery } }));
  }, [searchQuery]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-6
                 bg-transparent text-white transition-transform duration-300
                 ${hideNav ? '-translate-y-full' : 'translate-y-0'}`}
      data-aos="fade-down"
    >
      {/* Logo */}
      <a href="#" className="flex items-center space-x-2">
        <img src="/logoep.png" alt="EcoPick Logo" className="h-8" />
        <span className="text-2xl font-bold tracking-wider">EcoPick</span>
      </a>

      {/* 🔍 Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 
                       rounded-full text-white placeholder-white/70 
                       focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {/* Kanan: Auth & Icon */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-green-700 transition-colors">
          Sign In
        </Link>

        <Link to="/register" className="px-4 py-2 bg-green-600 rounded-full hover:bg-green-700 transition-colors">
          Sign Up
        </Link>

        {/* Favorites */}
        <button className="relative ml-2">
          <Link to="/favorites">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {favoritesCount}
            </span>
          </Link>
        </button>

        {/* Cart */}
        <button className="relative ml-2">
          <Link to="/cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-1.5 12h-15L3 3z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
