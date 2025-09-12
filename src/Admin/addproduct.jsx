// src/pages/AddProduct.jsx
import React, { useState, useEffect } from "react";
import { getCategories, addProduct } from "../services/api";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import FooterAdmin from "../Components/FooterAdmin";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category_id: "",
    ml_category: "",
    description: "",
    price: "",
    stock_quantity: "",
    image_url: "",
    materials: "",
    origin: "",
    is_eco_friendly_ml: false,
    is_eco_friendly_admin: false,
    main_material: "",
    is_biodegradable: false,
    recycled_content: "",
    packaging_type: "",
    is_reusable: false,
    has_eco_certification: false,
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = await getCategories();
        // menyesuaikan struktur: coba cek res.data.data atau res.data
        const payload = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data;
        if (Array.isArray(payload)) {
          setCategories(payload);
        } else {
          setCategories([{ id: 1, name: "Default" }]);
        }
      } catch (err) {
        console.error("❌ Gagal ambil kategori:", err.message || err);
        setCategories([{ id: 1, name: "Default" }]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple client-side validation contoh
    if (!form.name.trim()) {
      alert("Nama produk wajib diisi");
      return;
    }
    if (!form.price || Number(form.price) < 0) {
      alert("Harga harus berupa angka >= 0");
      return;
    }
    if (!form.stock_quantity || Number(form.stock_quantity) < 0) {
      alert("Stock harus berupa angka >= 0");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name || "");
      formData.append(
        "category_id",
        form.category_id ? Number(form.category_id) : ""
      );
      formData.append("ml_category", form.ml_category || "");
      formData.append("description", form.description || "");
      formData.append("price", form.price ? Number(form.price) : 0);
      formData.append(
        "stock_quantity",
        form.stock_quantity ? Number(form.stock_quantity) : 0
      );
      formData.append("image_url", form.image_url || "");
      // materials - backend mengharapkan JSON → kirim sebagai string JSON
      // kalau input sederhana, kita bungkus jadi array berisi string
      const materialsPayload = form.materials ? [form.materials] : [];
      formData.append("materials", JSON.stringify(materialsPayload));
      formData.append("origin", form.origin || "");

      // boolean flags
      formData.append(
        "is_eco_friendly_ml",
        form.is_eco_friendly_ml ? true : false
      );
      formData.append(
        "is_eco_friendly_admin",
        form.is_eco_friendly_admin ? true : false
      );
      formData.append("main_material", form.main_material || "");
      formData.append("is_biodegradable", form.is_biodegradable ? true : false);
      formData.append(
        "recycled_content",
        form.recycled_content ? Number(form.recycled_content) : 0
      );
      formData.append("packaging_type", form.packaging_type || "");
      formData.append("is_reusable", form.is_reusable ? true : false);
      formData.append(
        "has_eco_certification",
        form.has_eco_certification ? true : false
      );

      if (form.image) {
        formData.append("image", form.image);
      }

      // Kirim FormData → addProduct menangani setting header multipart
      const res = await addProduct(formData);
      console.log("✅ response:", res.data);
      alert("✅ Produk berhasil ditambahkan!");
      // optional: reset form or redirect
    } catch (err) {
      // tampilkan pesan dari backend kalau ada detail validasi
      console.error("❌ Error tambah produk:", err);
      const serverData = err?.response?.data;
      if (serverData) {
        // jika server mengirim array errors
        if (Array.isArray(serverData?.errors)) {
          const messages = serverData.errors
            .map((er) => (er?.msg ? er.msg : JSON.stringify(er)))
            .join("\n");
          alert("Gagal menambahkan produk:\n" + messages);
          console.error("Server validation errors:", serverData.errors);
        } else if (serverData.message) {
          alert("Gagal menambahkan produk:\n" + serverData.message);
        } else {
          alert("Gagal menambahkan produk. Cek console untuk detail.");
        }
      } else {
        alert("Gagal menambahkan produk. (Network/Error)");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        <div className="bg-white border-t-4 border-black shadow-md p-3">
          <h1 className="text-2xl font-bold">Add Product</h1>
        </div>

        {/* Main Form */}
        <main className="p-6 flex-1">
          <div className="bg-white shadow rounded-lg p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="col-span-2">
                <label className="block text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category_id"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {loadingCategories ? (
                    <option>Loading...</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">ML Category</label>
                <select
                  name="ml_category"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                >
                  <option value="BEAUTY">Beauty</option>
                  <option value="FOOD_BEVERAGE">Food & Beverage</option>
                  <option value="OFFICE_SUPPLIES">Office Supplies</option>
                  <option value="ELECTRONICS">Electronics</option>
                  <option value="FASHION">Fashion</option>
                  <option value="HOUSEHOLD">Household</option>
                  {/* TODO: kalau ada endpoint backend untuk ML categories, ambil pakai API */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  name="stock_quantity"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Materials (comma or single)
                </label>
                <input
                  type="text"
                  name="materials"
                  onChange={handleChange}
                  placeholder="e.g. bamboo, stainless-steel"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Origin</label>
                <input
                  type="text"
                  name="origin"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Main Material
                </label>
                <input
                  type="text"
                  name="main_material"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Packaging Type
                </label>
                <input
                  type="text"
                  name="packaging_type"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Recycled Content (%)
                </label>
                <input
                  type="number"
                  name="recycled_content"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="is_eco_friendly_ml"
                    onChange={handleChange}
                  />
                  <span>Eco Friendly (ML)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="is_eco_friendly_admin"
                    onChange={handleChange}
                  />
                  <span>Eco Friendly (Admin)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="is_biodegradable"
                    onChange={handleChange}
                  />
                  <span>Biodegradable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="is_reusable"
                    onChange={handleChange}
                  />
                  <span>Reusable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="has_eco_certification"
                    onChange={handleChange}
                  />
                  <span>Eco Certification</span>
                </label>
              </div>

              <div className="col-span-2 mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  {submitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </main>

        <FooterAdmin />
      </div>
    </div>
  );
}