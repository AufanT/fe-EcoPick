import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from "react-icons/fa";
import { addProduct } from "../services/api";
import axios from "axios";
import FooterAdmin from "../Components/FooterAdmin";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category_id: "",
    price: "",
    stock: "",
    description: "",
    materials: "",
    origin: "",
    eco_friendly: false,
    image: null,
    image_url: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://19791ae92e50.ngrok-free.app/api/categories");
        if (Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          setCategories([
            { id: 1, name: "Tumbler" },
            { id: 2, name: "Piring" },
          ]);
        }
      } catch (err) {
        console.error("❌ Gagal ambil kategori:", err.message);
        setCategories([
          { id: 1, name: "Tumbler" },
          { id: 2, name: "Piring" },
        ]);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category_id", Number(form.category_id));
      formData.append("price", Number(form.price));
      formData.append("stock", Number(form.stock));
      formData.append("description", form.description);
      formData.append("materials", form.materials);
      formData.append("origin", form.origin);
      formData.append("eco_friendly", form.eco_friendly ? "true" : "false");
      formData.append("image_url", form.image_url);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await addProduct(formData);
      alert("✅ Produk berhasil ditambahkan!");
      console.log(res.data);
    } catch (err) {
      console.error("❌ Error tambah produk:", err.message);
      alert("❌ Gagal menambahkan produk!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten kanan */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        <div className="bg-white border-t-4 border-black shadow-md p-3">
          <h1 className="text-2xl font-bold">Add Product</h1>
        </div>

        {/* Main Content */}
        <main className="p-6 flex-1">
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
                <select
                  name="category_id"
                  onChange={handleChange}
                  value={form.category_id}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
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

              {/* Eco-Friendly */}
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
                  className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <FooterAdmin />
      </div>
    </div>
  );
}
