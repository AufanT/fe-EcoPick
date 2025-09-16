import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// (BARU) Impor fungsi API kita
import { getCartItems, updateCartItemQty, deleteCartItem } from "../services/api"; 

export default function CartPage() {
  const [items, setItems] = useState([]);
  // (BARU) State untuk menyimpan total harga dari backend
  const [totalPrice, setTotalPrice] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // (BARU) Fungsi untuk mengambil data keranjang dari API
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      // Panggil GET /api/cart
      const res = await getCartItems(); 
      
      // Backend mengembalikan { cartItems: [...], totalPrice: ... }
      // Kita tambahkan properti 'checked: true' di sisi frontend untuk UI
      const itemsWithChecked = res.data.cartItems.map(item => ({
        ...item,
        // (PENTING) Backend mengembalikan data Produk dalam properti "Product" (huruf P besar)
        // Kita "ratakan" (flatten) datanya agar lebih mudah digunakan di UI
        id: item.Product.id,
        name: item.Product.name,
        price: parseFloat(item.Product.price),
        img: item.Product.image_url,
        qty: item.quantity, // qty dari CartItem
        checked: true, // Default semua tercentang
      }));
      
      setItems(itemsWithChecked);
      setTotalPrice(res.data.totalPrice);

      // Hapus localStorage LAMA (PENTING!)
      localStorage.removeItem("ecopick_cart");

    } catch (err) {
      console.error("Gagal mengambil keranjang:", err);
      // Jika error 401/403 (belum login), paksa ke login
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
         setError("Anda harus login untuk melihat keranjang. Mengalihkan...");
         setTimeout(() => navigate("/login"), 2000);
      } else {
         setError("Gagal memuat keranjang. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  // (BARU) Ambil data cart dari API saat halaman dibuka
  useEffect(() => {
    fetchCart();
  }, []);

  // (BARU) Update Qty via API
  const handleQtyChange = async (id, type) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    let newQty;
    if (type === "inc") {
      newQty = item.qty + 1;
    } else {
      newQty = item.qty > 1 ? item.qty - 1 : 1; // Minimal 1
    }
    
    if (newQty === item.qty) return; // Tidak ada perubahan

    try {
      // Update state FE dulu agar responsif
      const optimisticItems = items.map(i => i.id === id ? { ...i, qty: newQty } : i);
      setItems(optimisticItems);
      recalculateTotals(optimisticItems); // Hitung ulang total di FE

      // Panggil API PUT /api/cart/:productId
      await updateCartItemQty(id, newQty);
      // Jika sukses, data sudah sinkron. Jika gagal, panggil fetchCart() lagi untuk rollback.
    } catch (error) {
      console.error("Gagal update qty:", error);
      alert("Gagal update keranjang. Memuat ulang data...");
      fetchCart(); // Rollback jika API gagal
    }
  };

  // (BARU) Delete Item via API
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus item ini?")) return;

    try {
      // Update state FE dulu
      const optimisticItems = items.filter((i) => i.id !== id);
      setItems(optimisticItems);
      recalculateTotals(optimisticItems);

      // Panggil API DELETE /api/cart/:productId
      await deleteCartItem(id);
      
    } catch (error) {
       console.error("Gagal hapus item:", error);
       alert("Gagal hapus item. Memuat ulang data...");
       fetchCart(); // Rollback jika API gagal
    }
  };


  // Logika centang (HANYA di frontend, tidak perlu API call)
  const handleCheck = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
    recalculateTotals(updated); // Hitung ulang total saat centang diubah
  };
  
  // (DIUBAH) Fungsi ini sekarang hanya menghitung total di sisi FE berdasarkan item yg dicentang
  // Total harga asli (totalPrice) tetap dari backend
  const recalculateTotals = (currentItems) => {
     const subtotalChecked = currentItems
      .filter((item) => item.checked)
      .reduce((acc, item) => acc + item.price * item.qty, 0);
     setSubtotal(subtotalChecked);
  };

  // State baru untuk total yang dicentang
  const [subtotal, setSubtotal] = useState(0);

  // Update subtotal saat items (dari API) atau totalPrice (dari API) berubah
  useEffect(() => {
    recalculateTotals(items);
  }, [items]);
  
  // --- Kalkulasi untuk Summary Box ---
  const shipping = subtotal > 0 ? 30000 : 0; // Biarkan ongkir statis dulu
  const total = subtotal + shipping;

  // (DIUBAH) Checkout sekarang TIDAK mengirim data, karena BE sudah tahu isi cart dari DB
  const handleCheckout = () => {
    const selectedItems = items.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      alert("Pilih minimal 1 item untuk checkout!");
      return;
    }
    // Cukup navigasi. Halaman checkout yang akan memanggil API.
    navigate("/checkout"); 
  };

  // Loading dan Error handling
  if (loading) {
    return <div className="p-6 min-h-screen">Loading cart...</div>;
  }
  
  if (error) {
     return <div className="p-6 min-h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      {/* Button Back to Dashboard */}
      <Link
        to="/"
        className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-300 group"
      >
        <svg
          className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-gray-700 group-hover:text-green-600 font-medium transition-colors">
          Back to Dashboard
        </span>
      </Link>

      <h1 className="text-xl font-semibold mt-4 mb-4">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500">Keranjang Anda kosong. 😢</p>
          ) : (
            items.map((item) => (
              <div
                // (PENTING) key sekarang menggunakan item.id (Product ID)
                key={item.id} 
                className="flex items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={!!item.checked} // Pastikan boolean
                  onChange={() => handleCheck(item.id)}
                  className="mr-3 w-5 h-5"
                />
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => handleQtyChange(item.id, "dec")}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => handleQtyChange(item.id, "inc")}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 flex items-center space-x-1 ml-4"
                >
                  <Trash2 size={18} /> <span>Delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal (Items checked)</span>
            <span>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping Fee</span>
            <span>Rp {shipping.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={subtotal === 0} // (BARU) Disable jika tidak ada yg dicentang
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition disabled:bg-gray-400"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}