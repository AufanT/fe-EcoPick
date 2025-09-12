import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white">
  {/* Bagian Atas */}
  <div className="max-w-6xl mx-auto px-12 py-12 grid gap-10 md:grid-cols-3 place-items-start">
    
    {/* Kolom 1 */}
    <div className="md:pl-6">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
        <img
          src="/public/image 38.png"
          alt="EcoPick Logo"
          className="w-12 h-12 object-contain"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">EcoPick</h2>
      <p className="text-sm text-white/90 leading-relaxed mb-4 max-w-xs">
        EcoPick helps you choose eco-friendly products with ease. Together,
        we can create a more sustainable lifestyle 🌱
      </p>
      <div className="flex gap-4">
        <a href="#" className="text-2xl hover:text-green-300"><FaFacebook /></a>
        <a href="#" className="text-2xl hover:text-green-300"><FaLinkedin /></a>
        <a href="#" className="text-2xl hover:text-green-300"><FaInstagram /></a>
        <a href="#" className="text-2xl hover:text-green-300"><FaXTwitter /></a>
      </div>
    </div>

    {/* Kolom 2 */}
    <div className="md:pl-10">
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Support Number</p>
          <p className="text-sm">081234432100</p>
        </div>
        <div>
          <p className="font-semibold">Support Email</p>
          <p className="text-sm">ecopick@gmail.com</p>
        </div>
        <div>
          <p className="font-semibold">Address</p>
          <p className="text-sm">
            Jl. Dr. M. Hatta, Padang, West Sumatera, Indonesia
          </p>
        </div>
      </div>
    </div>

    {/* Kolom 3 */}
    <div className="md:pl-10">
      <p className="font-semibold mb-3">Navigation</p>
      <ul className="space-y-2">
        <li><Link to="/" className="text-sm hover:underline">Home</Link></li>
        <li><Link to="/products" className="text-sm hover:underline">Product</Link></li>
        <li><Link to="/cart" className="text-sm hover:underline">Cart</Link></li>
        <li><Link to="/about" className="text-sm hover:underline">About</Link></li>
      </ul>
    </div>
  </div>

  {/* Bottom */}
  <div className="bg-green-800">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
      <p className="text-sm">© 2025 EcoPick. All Rights Reserved</p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
