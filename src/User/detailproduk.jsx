import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Stainless Steel Tumbler - Black",
    price: "Rp 130.000",
    img: "/public/image 24 (1).png",
    description:
      "Switch to a more eco-friendly lifestyle with this stainless steel reusable bottle. Designed for long-term use, it helps reduce single-use plastic waste while keeping your drinks at the perfect temperature.",
    stock: 1810,
    rating: 4.0,
    reviews: "2.5K",
    sold: "3K",
    variants: ["Black", "White", "Rose Gold"],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h2 className="text-2xl font-bold">Produk tidak ditemukan</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-6 text-sm text-gray-600">
        <nav className="flex items-center gap-2">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">View Product</span>
        </nav>
      </div>

      {/* Konten Utama */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-start">
        {/* Gambar Produk */}
        <div className="rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 p-6">
          <img
            src={product.img}
            alt={product.name}
            className="max-h-[300px] w-auto object-contain"
          />
        </div>
        {/* Detail Produk */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
            <span>(4,0)</span>
            <span>★★★★☆</span>
            <span>{product.reviews} Reviews</span>
            <span>{product.sold} Sold</span>
          </div>

          {/* Harga */}
          <p className="mt-4 text-2xl font-bold text-black">{product.price}</p>

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border border-gray-300 rounded"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border border-gray-300 rounded"
            >
              +
            </button>
            <span className="text-gray-500">{product.stock} in Stock</span>
          </div>

          {/* Tombol */}
          <div className="mt-6 flex gap-3">
            <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700">
              + Favorite
            </button>
            <button className="px-6 py-3 rounded-xl bg-black text-white">
              Add to Cart
            </button>
          </div>

          {/* Return Policy */}
          <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
            <span>↺</span> 15-Day Free Return
          </p>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-3">
            Description & Specification
          </h2>
          <p className="text-gray-700">{product.description}</p>
          <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
            <li>
              Premium Stainless Steel: Durable, rust-resistant, and safe for all
              beverages.
            </li>
            <li>
              Eco-Friendly Choice: Reusable and sustainable, reducing plastic
              waste.
            </li>
            <li>
              Double-Wall Insulation: Keeps drinks cold for up to 24 hours or
              hot for up to 12 hours.
            </li>
            <li>
              Elegant & Minimalist Design: Available in Black, White, and Rose
              Gold.
            </li>
            <li>
              Portable & Practical: Perfect for daily use, sports, school, or
              travel.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
