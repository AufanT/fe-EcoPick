import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Ambil data cart dari localStorage saat halaman cart dibuka
  useEffect(() => {
    const savedCart = localStorage.getItem("ecopick_cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  const handleQtyChange = (id, type) => {
    const updated = items.map((item) =>
      item.id === id
        ? {
            ...item,
            qty: type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1,
          }
        : item
    );
    setItems(updated);
    localStorage.setItem("ecopick_cart", JSON.stringify(updated)); // update localStorage juga
  };

  const handleCheck = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
    localStorage.setItem("ecopick_cart", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("ecopick_cart", JSON.stringify(updated));
  };

  const subtotal = items
    .filter((item) => item.checked)
    .reduce((acc, item) => acc + item.price * item.qty, 0);

  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  // >>> fungsi checkout <<<
  const handleCheckout = () => {
    const selectedItems = items.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      alert("Pilih minimal 1 item untuk checkout!");
      return;
    }
    navigate("/checkout", { state: { items: selectedItems } });
  };

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
            <p className="text-gray-500">Cart is empty 😢</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
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
            <span>Subtotal</span>
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
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
