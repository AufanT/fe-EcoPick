import { React, useState } from "react";
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";

export default function AddProduct()
 {
   const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  // handle perubahan input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value, // khusus file
    });
  };

  // handle submit ke API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // kalau ada upload file → pakai FormData
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock_quantity", form.stock);
      if (form.image) formData.append("image", form.image);

      const res = await addProduct(formData);
      alert("Produk berhasil ditambahkan!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Gagal menambahkan produk!");
    }
  }
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span>Admin Profile</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <Link to="/login" className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border-1 cursor-pointer border-green-800">
              Logout
            </Link>
          </div>
        </header>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

          <div className="bg-white shadow rounded-lg p-6">
            {/* Form */}
            <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name (full width) */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>  

              {/* Price */}
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                  placeholder="Rp 0"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="block text-sm font-medium">Upload</label>
                <input
                  type="file"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                />
              </div>
            </form>
            {/* Classification Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Classification</h2>
              <p className="mt-2">
                Prediction:{" "}
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                  Eco-Friendly
                </span>
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button className="bg-black text-white px-4 py-2 rounded-md">
              Save Product
            </button>
          </div>
        </div>


      </main>
    </div>
  );
}
