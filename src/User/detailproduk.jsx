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

  // state review
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Amanda Putri",
      sentiment: "Positif",
      text: "Tumbler ini cocok banget untuk dipakai sehari-hari. Bahannya kokoh, mudah dibersihkan, dan tidak bocor. Ukurannya juga pas untuk dibawa di kuliah.",
    },
    {
      id: 2,
      name: "Mikael Perdana",
      sentiment: "Positif",
      text: "Tumbler ini sangat membantu saya mengurangi penggunaan botol plastik sekali pakai. Desainnya elegan dan tahan lama, benar-benar ramah lingkungan.",
    },
    {
      id: 3,
      name: "Akmal Sanjaya",
      sentiment: "Negatif",
      text: "Saya kurang puas dengan kualitas tutupnya. Baru seminggu dipakai sudah bocor. Menurut saya tidak sebanding dengan harganya.",
    },
    {
      id: 4,
      name: "Arifia Mentari",
      sentiment: "Negatif",
      text: "Warnanya cepat pudar setelah beberapa kali dicuci, jadi terlihat seperti barang lama padahal baru dibeli.",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newSentiment, setNewSentiment] = useState("Positif");

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newName || !newText) return;

    const newReview = {
      id: reviews.length + 1,
      name: newName,
      sentiment: newSentiment,
      text: newText,
    };

    setReviews([...reviews, newReview]);
    setNewName("");
    setNewText("");
    setNewSentiment("Positif");
  };

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
            <li>Premium Stainless Steel: Durable, rust-resistant, and safe for all beverages.</li>
            <li>Eco-Friendly Choice: Reusable and sustainable, reducing plastic waste.</li>
            <li>Double-Wall Insulation: Keeps drinks cold for up to 24 hours or hot for up to 12 hours.</li>
            <li>Elegant & Minimalist Design: Available in Black, White, and Rose Gold.</li>
            <li>Portable & Practical: Perfect for daily use, sports, school, or travel.</li>
          </ul>
        </div>
      </div>

      {/* Review Product */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-lg font-semibold mb-4">Review Product</h2>
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
            >
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {r.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{r.name}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      r.sentiment === "Positif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.sentiment}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{r.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form Tambah Review */}
        <form
          onSubmit={handleAddReview}
          className="mt-8 p-6 border rounded-lg bg-gray-50"
        >
          <h3 className="text-lg font-semibold mb-4">Tambah Review</h3>
         
          <textarea
            placeholder="Tulis review kamu..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
    
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Kirim Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
