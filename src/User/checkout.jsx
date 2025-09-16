import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// (BARU) Impor API
import { processCheckout, getCartItems } from "../services/api"; 

export default function Checkout() {
  const navigate = useNavigate();
  
  // (BARU) State untuk data dinamis
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); // Untuk disable tombol

  // State UI (Biarkan statis untuk demo)
  const [delivery, setDelivery] = useState("jne");
  const [payment, setPayment] = useState("bni");
  const [message, setMessage] = useState("");

  // (BARU) Panggil GET /api/cart untuk memastikan kita checkout data terbaru dari DB
  useEffect(() => {
    const fetchCartSummary = async () => {
      setLoading(true);
      try {
        const res = await getCartItems(); //
        
        // Backend sudah menghitung total harga semua item di keranjang
        setSubtotal(res.data.totalPrice); 
        setItems(res.data.cartItems); // Simpan item untuk ditampilkan
        
        if (res.data.cartItems.length === 0) {
           setError("Keranjang Anda kosong. Tidak ada yang bisa di-checkout.");
        }

      } catch (err) {
        console.error("Gagal mengambil data checkout:", err);
        setError("Gagal memuat data keranjang. Silakan kembali.");
         if (err.response && (err.response.status === 401 || err.response.status === 403)) {
             navigate("/login");
         }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCartSummary();
  }, [navigate]);


  // (BARU) Kalkulasi Ongkir (sisi FE)
  const shippingOptions = { jne: 23000, tiki: 27000, jnt: 30000, sicepat: 28000 };
  const shipping = shippingOptions[delivery] || 0;
  const serviceFee = 1000;
  const total = subtotal + shipping + serviceFee;

  // (DIROMBAK TOTAL) Fungsi ini sekarang memanggil API Backend
  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      // Panggil POST /api/orders/checkout
      // Endpoint ini tidak butuh data apa-apa (body kosong),
      // karena backend akan membaca cart user dari DB berdasarkan token JWT mereka.
      const res = await processCheckout(); 

      console.log("Order sukses:", res.data);
      alert("Order placed successfully! Order ID: " + res.data.data.orderId);
      navigate("/"); // Kembali ke dashboard setelah sukses

    } catch (error) { {
      console.error("Gagal checkout:", error.response?.data || error.message);
      // Backend akan mengirim error jika stok tidak cukup atau keranjang kosong
      alert("Checkout Gagal: " + (error.response?.data?.message || "Terjadi kesalahan server."));
      setIsPlacingOrder(false);
    }
  }
  };
  
  if (loading) {
    return <div className="p-6 min-h-screen">Loading Checkout Summary...</div>;
  }
  
  if (error) {
     return <div className="p-6 min-h-screen text-red-600">{error}</div>;
  }


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-6">Checkout</h1>

      {/* Shipping Address (Masih Hardcode) */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <span>桃</span> Shipping Address
        </h2>
        <div>
          <p className="font-medium">Mikayla Pramudya</p>
          <p className="text-gray-600 text-sm">
            Jl. Melati No. 25, RT 04 / RW 07, Kelurahan Sukamaju, Kecamatan
            Cilodong, Kota Depok, Jawa Barat, 16415, Indonesia
          </p>
          <p className="text-gray-600 text-sm">081277665443</p>
        </div>
        <button className="text-green-600 text-sm font-medium mt-2 hover:underline">
          Edit
        </button>
      </div>

      {/* Items Ordered (DIUBAH - data dari API) */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <span>逃</span> Items Ordered
        </h2>
        {items.map((item) => (
          <div
            key={item.product_id} // (Key diubah)
            className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3 last:mb-0 last:pb-0 last:border-none"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.Product.image_url}
                alt={item.Product.name}
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <p className="font-medium">{item.Product.name}</p>
                <p className="text-gray-600">
                  Rp {parseFloat(item.Product.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p>x{item.quantity}</p>
              <p className="font-medium">
                Rp {(parseFloat(item.Product.price) * item.quantity).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message + Delivery (Tidak berubah) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Message */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-2">町 Message:</h2>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Optional"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-green-600"
          />
        </div>

        {/* Delivery */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-2">囹 Delivery Option:</h2>
          <div className="space-y-2">
            <label className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="jne"
                  checked={delivery === "jne"}
                  onChange={() => setDelivery("jne")}
                />
                JNE
              </div>
              <span>Rp 23.000</span>
            </label>
             <label className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="jnt"
                  checked={delivery === "jnt"}
                  onChange={() => setDelivery("jnt")}
                />
                J&T
              </div>
              <span>Rp 30.000</span>
            </label>
             <label className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="sicepat"
                  checked={delivery === "sicepat"}
                  onChange={() => setDelivery("sicepat")}
                />
                SiCepat
              </div>
              <span>Rp 28.000</span>
            </label>
             <label className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="tiki"
                  checked={delivery === "tiki"}
                  onChange={() => setDelivery("tiki")}
                />
                TIKI
              </div>
              <span>Rp 27.000</span>
            </label>
          </div>
        </div>
      </div>

      {/* Payment Methods (Tidak berubah) */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-2">諜 Payment Methods:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="bni"
              checked={payment === "bni"}
              onChange={() => setPayment("bni")}
            />
            <span>BNI</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="bri"
              checked={payment === "bri"}
              onChange={() => setPayment("bri")}
            />
            <span>BRI</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="mandiri"
              checked={payment === "mandiri"}
              onChange={() => setPayment("mandiri")}
            />
            <span>Mandiri</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="bca"
              checked={payment === "bca"}
              onChange={() => setPayment("bca")}
            />
            <span>BCA</span>
          </label>
           <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            <span>COD</span>
          </label>
        </div>
      </div>

      {/* Summary (DIUBAH - data dari API) */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Order Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Shipping Subtotal</span>
          <span>Rp {shipping.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Service Fee</span>
          <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total Payment</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {/* Checkout Button (DIUBAH) */}
      <button
        onClick={handlePlaceOrder}
        disabled={isPlacingOrder || loading || error} // Disable jika sedang loading, error, atau mengirim
        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:bg-gray-400"
      >
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}