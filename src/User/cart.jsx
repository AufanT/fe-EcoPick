import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState([
    { id: 1, name: "Stainless Steel Tumbler", price: 130000, qty: 1, checked: true, img: "https://via.placeholder.com/60x150" },
    { id: 2, name: "Stainless Steel Tumbler", price: 130000, qty: 1, checked: true, img: "https://via.placeholder.com/60x150" },
    { id: 3, name: "Ceramic Plate", price: 40000, qty: 1, checked: false, img: "https://via.placeholder.com/100" },
  ]);

  const handleQtyChange = (id, type) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1,
            }
          : item
      )
    );
  };

  const handleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items
    .filter((item) => item.checked)
    .reduce((acc, item) => acc + item.price * item.qty, 0);

  const shipping = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
                className="mr-3 w-5 h-5"
              />
              <img src={item.img} alt={item.name} className="w-16 h-16 object-contain mr-4" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">Rp {item.price.toLocaleString("id-ID")}</p>
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
          ))}
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
          <button className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
