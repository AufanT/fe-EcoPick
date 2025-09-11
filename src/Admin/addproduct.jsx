import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from "react-icons/fa";
import { addProduct } from "../services/api"; // pastikan path api.js benar

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    materials: "",
    origin: "",
    eco_friendly: false,
    image: null,
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : files
          ? files[0]
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock_quantity", form.stock);
      formData.append("description", form.description);
      formData.append("materials", form.materials);
      formData.append("origin", form.origin);
      formData.append("eco_friendly", form.eco_friendly);
      formData.append("image_url", form.image_url);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await addProduct(formData);
      alert("✅ Produk berhasil ditambahkan!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Gagal menambahkan produk!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#15803D] p-6 text-white">
        <h1 className="text-2xl font-bold mb-8">EcoPick</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 bg-[#355317] p-2 rounded-md">
            <FaHome /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-800">
            <FaBoxOpen /> Order Management
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-800">
            <FaUsers /> User Management
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-800">
            <FaRegUserCircle /> Edit Profile
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span>Admin Profile</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <Link
              to="/login"
              className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border-2 border-green-800"
            >
              Logout
            </Link>
          </div>
        </header>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

          <div className="bg-white shadow rounded-lg p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Product Name */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                  placeholder="Rp 0"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  name="stock"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                  rows="3"
                />
              </div>

              {/* Materials */}
              <div>
                <label className="block text-sm font-medium">Materials</label>
                <input
                  type="text"
                  name="materials"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              {/* Origin */}
              <div>
                <label className="block text-sm font-medium">Origin</label>
                <input
                  type="text"
                  name="origin"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              {/* Upload Image */}
              <div>
                <label className="block text-sm font-medium">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium">Image URL (opsional)</label>
                <input
                  type="text"
                  name="image_url"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Eco-Friendly Checkbox */}
              <div className="col-span-1 md:col-span-2 flex items-center">
                <input
                  type="checkbox"
                  name="eco_friendly"
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Eco-Friendly</label>
              </div>

              {/* Submit */}
              <div className="col-span-1 md:col-span-2 mt-6">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
