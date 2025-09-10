import React, { useState } from "react";

const Checkout = () => {
  const [delivery, setDelivery] = useState("JNE");
  const [payment, setPayment] = useState("BNI");

  const items = [
    { id: 1, name: "Stainless Steel Tumbler - White", price: 130000, qty: 1, image: "/tumbler1.jpg" },
    { id: 2, name: "Stainless Steel Tumbler - Pink", price: 130000, qty: 1, image: "/tumbler2.jpg" },
  ];

  const deliveryOptions = {
    JNE: 23000,
    JNT: 30000,
    SiCepat: 28000,
    TIKI: 27000,
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const shipping = deliveryOptions[delivery] ?? 0;
  const serviceFee = 1000;
  const total = subtotal + shipping + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {/* Shipping Address */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-semibold text-gray-800 mb-2">Shipping Address</h2>
            <p className="font-bold">Mikayla Pramudya</p>
            <p className="text-sm text-gray-700 leading-snug">
              Jl. Melati No. 25, RT 04 / RW 07, Kelurahan Sukamaju, Kecamatan
              Cilodong, Kota Depok, Jawa Barat, 16415, Indonesia
            </p>
            <p className="font-semibold mt-1">08127765443</p>
          </div>
          <button className="text-green-600 font-medium hover:underline">
            Edit
          </button>
        </div>
      </div>

      {/* Items Ordered */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Items Ordered</h2>
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-3">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <p className="w-10 text-center">{item.qty}</p>
              <p className="font-semibold">
                Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message + Delivery Option */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Message */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3">Message</h2>
          <input
            type="text"
            placeholder="Optional"
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Delivery Option */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-3">Delivery Option</h2>
          <div className="space-y-2">
            {Object.entries(deliveryOptions).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === key}
                    onChange={() => setDelivery(key)}
                    className="accent-green-600"
                  />
                  <span>{key}</span>
                </div>
                <span>Rp {value.toLocaleString("id-ID")}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h2 className="font-semibold text-gray-800 mb-3">Payment Methods</h2>
        <div className="space-y-2">
          {["BNI", "BRI", "Mandiri", "BCA", "COD"].map((bank) => (
            <label
              key={bank}
              className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50"
            >
              <input
                type="radio"
                name="payment"
                checked={payment === bank}
                onChange={() => setPayment(bank)}
                className="accent-green-600"
              />
              <span>{bank === "COD" ? "COD (Cash On Delivery)" : bank}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between py-2 text-gray-700">
          <span>Order Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-700">
          <span>Shipping Subtotal</span>
          <span>Rp {shipping.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between py-2 text-gray-700">
          <span>Service Fee</span>
          <span>Rp {serviceFee.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between py-3 border-t border-gray-200 font-bold text-lg">
          <span>Total Payment</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
        <button className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
