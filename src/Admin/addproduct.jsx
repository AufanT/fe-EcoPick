import React from "react";
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from "react-icons/fa";

export default function AddProduct() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#15803D] p-6 text-white">
        <h1 className="text-2xl font-bold mb-8">EcoPick</h1>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 bg-[#355317] p-2 rounded-md"
          >
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
          </div>
        </header>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

          <div className="bg-white shadow rounded-lg p-6">
            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name (full width) */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
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
