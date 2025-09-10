import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Sample products data (same as Products page)
  const allProducts = [
    { id: 1, name: 'Bamboo Toothbrush Set', price: 29000, category: 'personal-care', image: '/product-1.jpg', rating: 4.8, reviews: 124, inStock: true },
    { id: 2, name: 'Reusable Straw Set', price: 35000, category: 'kitchen', image: '/product-2.jpg', rating: 4.6, reviews: 89, inStock: true },
    { id: 3, name: 'Organic Soap Bar', price: 25000, category: 'personal-care', image: '/product-3.jpg', rating: 4.9, reviews: 156, inStock: true },
    { id: 4, name: 'Cotton Tote Bag', price: 49000, category: 'lifestyle', image: '/product-4.jpg', rating: 4.7, reviews: 67, inStock: true },
    { id: 5, name: 'Bamboo Cutlery Set', price: 45000, category: 'kitchen', image: '/product-5.jpg', rating: 4.5, reviews: 92, inStock: false },
    { id: 6, name: 'Eco-Friendly Water Bottle', price: 75000, category: 'lifestyle', image: '/product-6.jpg', rating: 4.8, reviews: 203, inStock: true },
    { id: 7, name: 'Natural Shampoo Bar', price: 32000, category: 'personal-care', image: '/product-7.jpg', rating: 4.6, reviews: 78, inStock: true },
    { id: 8, name: 'Bamboo Phone Case', price: 55000, category: 'lifestyle', image: '/product-8.jpg', rating: 4.4, reviews: 45, inStock: true },
  ];

  // Load favorites and cart from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('ecopick_favorites');
    const savedCart = localStorage.getItem('ecopick_cart');
    
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      const favoriteProducts = allProducts.filter(product => favoriteIds.includes(product.id));
      setFavorites(favoriteProducts);
    }
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const toggleFavorite = (productId) => {
    const savedFavorites = localStorage.getItem('ecopick_favorites');
    let favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (favoriteIds.includes(productId)) {
      // Remove from favorites
      favoriteIds = favoriteIds.filter(id => id !== productId);
      setFavorites(prev => prev.filter(product => product.id !== productId));
    } else {
      // Add to favorites
      favoriteIds.push(productId);
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        setFavorites(prev => [...prev, product]);
      }
    }
    
    localStorage.setItem('ecopick_favorites', JSON.stringify(favoriteIds));
    
    // Update favorites counter in navbar
    window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
      detail: { favoritesCount: favoriteIds.length }
    }));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('ecopick_cart', JSON.stringify(newCart));
    
    // Update cart counter in navbar
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { cartCount: newCart.reduce((total, item) => total + item.quantity, 0) }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-gray-700 group-hover:text-green-600 font-medium transition-colors">Back to Dashboard</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Favorites</h1>
                <p className="text-gray-600 text-lg">Products you've saved for later</p>
              </div>
            </div>
          </div>

          {/* Favorites Content */}
          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start exploring our eco-friendly products and add them to your favorites by clicking the heart icon.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors"
              >
                <Eye className="w-5 h-5" />
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Your Favorites</h3>
                      <p className="text-gray-600">{favorites.length} product{favorites.length !== 1 ? 's' : ''} saved</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Value</p>
                      <p className="text-xl font-bold text-green-600">
                        Rp {favorites.reduce((total, product) => total + product.price, 0).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(product.id);
                            }}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                          >
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </button>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-green-600 transition-colors mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-green-600">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                            product.inStock
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-12 text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/products" 
                    className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Continue Shopping
                  </Link>
                  <button 
                    onClick={() => {
                      const allFavoriteIds = favorites.map(p => p.id);
                      localStorage.setItem('ecopick_favorites', JSON.stringify([]));
                      setFavorites([]);
                      window.dispatchEvent(new CustomEvent('favoritesUpdated', { 
                        detail: { favoritesCount: 0 }
                      }));
                    }}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
                  >
                    Clear All Favorites
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
