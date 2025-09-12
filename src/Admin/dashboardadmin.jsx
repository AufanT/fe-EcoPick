import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import FooterAdmin from "../Components/FooterAdmin";
import Header from "../Components/Header";
import { getProducts } from "../services/api";

export default function DashboardAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (pageNum) => {
    setLoading(true);
    try {
      const res = await getProducts(pageNum, limit);

      console.log("🔗 URL dipanggil:", res.config?.url);
      console.log("📦 Full response:", res);

      // Pastikan respon berupa JSON
      const contentType = res.headers["content-type"] || "";
      if (!contentType.includes("application/json")) {
        console.error("❌ Response bukan JSON:", res.data);
        setProducts([]);
        return;
      }

      // Normalisasi struktur data
      const data = res.data;
      const items =
        data.products || // kalau pakai pagination {products, totalPages, currentPage}
        data.data || // fallback kalau API pakai "data"
        (Array.isArray(data) ? data : []); // fallback kalau langsung array

      setProducts(items);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || pageNum);
    } catch (err) {
      console.error("❌ Error fetch produk:", err.response || err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <div className="bg-white border-t-4 border-black shadow-md p-3">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <main className="flex-grow p-6">
          <button className="bg-black text-white px-4 py-2 rounded-md mb-6">
            <Link to="/addproduct">Add Product</Link>
          </button>

          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <p className="p-4">Loading products...</p>
            ) : Array.isArray(products) && products.length > 0 ? (
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
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={product.image_url || "/no-image.png"}
                          alt={product.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => (e.target.src = "/no-image.png")}
                        />
                      </td>
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">{product.category_id || "-"}</td>
                      <td className="p-4">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </td>
                      <td className="p-4">{product.stock_quantity}</td>
                      <td className="p-4">
                        <button className="border rounded-md px-3 py-1">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-4">Belum ada produk.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="border px-3 py-1 rounded-md text-gray-400"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={`px-3 py-1 rounded-md ${
                  page === idx + 1
                    ? "bg-black text-white"
                    : "border text-gray-600"
                }`}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              className="border px-3 py-1 rounded-md text-gray-400"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              &gt;
            </button>
          </div>
        </main>

        <FooterAdmin />
      </div>
    </div>
  );
}
