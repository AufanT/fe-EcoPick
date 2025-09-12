import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.items || [];

  // State
  const [delivery, setDelivery] = useState("jne");
  const [payment, setPayment] = useState("bni");
  const [message, setMessage] = useState("");

  // Hitung subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Ongkir sesuai pilihan
  const shippingOptions = {
    jne: 23000,
    tiki: 27000,
    jnt: 30000,
    sicepat: 28000,
  };
  const shipping = shippingOptions[delivery] || 0;

  const serviceFee = 1000;
  const total = subtotal + shipping + serviceFee;

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-6">Checkout</h1>

      {/* Shipping Address */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <span>📍</span> Shipping Address
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

      {/* Items Ordered */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <span>📦</span> Items Ordered
        </h2>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3 last:mb-0 last:pb-0 last:border-none"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p>x{item.qty}</p>
              <p className="font-medium">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message + Delivery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Message */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-2">💬 Message:</h2>
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
          <h2 className="font-semibold mb-2">🚚 Delivery Option:</h2>
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

      {/* Payment Methods */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold mb-2">💳 Payment Methods:</h2>
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

      {/* Summary */}
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

      {/* Checkout Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
      >
        Checkout
      </button>
    </div>
  );
}
