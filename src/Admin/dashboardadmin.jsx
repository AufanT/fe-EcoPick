import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import FooterAdmin from "../Components/FooterAdmin";
import Header from "../Components/Header";

const products = [
  { photo: "/images/tumbler.png", name: "Stainless Steel Tumbler", category: "Tumbler", price: "Rp 130.000", stock: 120 },
  { photo: "/images/straw.png", name: "Stainless Steel Straw", category: "Straw", price: "Rp 3.500", stock: 150 },
  { photo: "/images/spoon.png", name: "Stainless Steel Spoon", category: "Spoon", price: "Rp 7.500", stock: 1810 },
  { photo: "/images/cup.png", name: "Ceramic Cup", category: "Cup", price: "Rp 25.000", stock: 115 },
  { photo: "/images/plate.png", name: "Ceramic Plate", category: "Plate", price: "Rp 40.000", stock: 110 },
  { photo: "/images/toothbrush.png", name: "Bamboo Toothbrush", category: "Toothbrush", price: "Rp 12.500", stock: 125 },
];

export default function DashboardAdmin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar di kiri */}
      <Sidebar />

      {/* Konten kanan */}
      <div className="flex flex-col flex-1">
        {/* Header selalu di atas */}
        <Header />

      <div className="bg-white border-t-4 border-black shadow-md p-3">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Isi konten utama */}
        <main className="flex-grow p-6">
          {/* Add Product */}
          <button className="bg-black text-white px-4 py-2 rounded-md mb-6">
            <Link to="/addproduct">Add Product</Link>
          </button>

          {/* Product Table */}
          <div className="bg-white rounded-lg shadow">
            <table className="w-full text-left border-collapse">
              <thead className="border-b">
                <tr className="text-gray-700">
                  <th className="p-4">PHOTO</th>
                  <th className="p-4">PRODUCT NAME</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">PRICE</th>
                  <th className="p-4">STOCK</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="w-12 h-12 object-contain"
                      />
                    </td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.price}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <button className="border rounded-md px-3 py-1">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="border px-3 py-1 rounded-md text-gray-400">&lt;</button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded-md ${
                  num === 1 ? "bg-black text-white" : "border text-gray-600"
                }`}
              >
                {num}
              </button>
            ))}
            <button className="border px-3 py-1 rounded-md text-gray-400">&gt;</button>
          </div>
        </main>

        {/* Footer selalu di bawah */}
        <FooterAdmin />
      </div>
    </div>
  );
}
