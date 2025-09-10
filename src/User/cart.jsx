import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// The main App component that renders the cart page.
const CartPage = () => {
  // Hardcoded cart data, similar to the provided component.
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Stainless Steel Tumbler",
      price: 130000,
      quantity: 1,
      image: "https://placehold.co/100x100/A7F3D0/065F46?text=Tumbler",
    },
    {
      id: 2,
      name: "Stainless Steel Tumbler",
      price: 130000,
      quantity: 1,
      image: "https://placehold.co/100x100/A7F3D0/065F46?text=Tumbler",
    },
    {
      id: 3,
      name: "Ceramic Plate",
      price: 40000,
      quantity: 1,
      image: "https://placehold.co/100x100/A7F3D0/065F46?text=Plate",
    },
  ]);

  // Function to calculate shipping cost based on the city.
  const shippingByCity = (city) =>
    ({
      Jakarta: 10000,
      Bandung: 12000,
      Surabaya: 15000,
      Yogyakarta: 13000,
    }[city] ?? 10000); // Default to Jakarta's shipping if city is not found

  // State for city selection.
  const [city, setCity] = useState("Jakarta");

  // Calculate subtotal using useMemo for performance.
  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  // Calculate shipping cost using useMemo.
  const shipping = useMemo(() => shippingByCity(city), [city]);

  // Calculate total price.
  const total = subtotal + shipping;

  // Handles incrementing an item's quantity.
  const increment = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };

  // Handles decrementing an item's quantity, with a minimum of 1.
  const decrement = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it
      )
    );
  };

  // Handles removing an item from the cart.
  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Formats a number to Indonesian Rupiah currency.
  const formatRupiah = (value) => {
    return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
  };

  return (
    <div className="bg-gray-100 font-sans p-8 min-h-screen">
      <div className="max-w-7xl mx-auto py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            My Cart
          </h1>
          <p className="text-gray-500 text-lg">
            Your selected eco-friendly products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-6">
            {items.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl shadow-lg text-center">
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mx-auto mb-6">
                  <span className="text-5xl text-green-600">🛒</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Cart is Empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some products to continue shopping.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-600 text-white font-semibold transition-all hover:bg-green-700"
                >
                  <span className="text-xl">←</span> Back to Shop
                </a>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-6"
                >
                  {/* Checkbox and Image */}
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-green-600 rounded-full border-gray-300 focus:ring-green-500"
                      defaultChecked
                    />
                    <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/100x100/A7F3D0/065F46?text=Image+Not+Found";
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-green-600 text-xl md:text-2xl font-bold">
                      {formatRupiah(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center md:justify-end gap-2 my-4 md:my-0">
                    <div className="inline-flex items-center bg-gray-100 rounded-full shadow-inner">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-200 transition-colors font-bold text-lg"
                      >
                        −
                      </button>
                      <div className="w-12 h-10 flex items-center justify-center text-gray-800 font-bold text-lg">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-200 transition-colors font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="md:ml-auto px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 rounded-full transition-all duration-300 font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3 bg-white p-8 rounded-3xl shadow-xl sticky top-8 h-fit">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-lg">
                  {formatRupiah(subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="font-medium">Shipping Fee</span>
                <span className="font-bold text-lg">
                  {formatRupiah(shipping)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-green-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-8">
              <Link to={`/checkout`}></Link>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
