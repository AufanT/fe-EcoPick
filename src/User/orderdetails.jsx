import React from "react";
import { Link } from "react-router-dom";

const OrderDetailsPage = () => {
  return (
    <div className="min-h-screen bg-white p-10">

      {/* Button Back to Dashboard */}
      <div className="pt-8 pb-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 
                     hover:shadow-md hover:border-green-400 transition-all duration-300 group w-fit"
        >
          <svg
            className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-gray-700 group-hover:text-green-600 font-medium transition-colors">
            Back to Dashboard
          </span>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

      {/* Order Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 shadow-sm">
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold inline-block w-36">Recipient Name</span>
            : Mikayla Pramudya
          </p>
          <p>
            <span className="font-semibold inline-block w-36">Product</span>
            : Stainless Steel Tumbler
          </p>
          <p>
            <span className="font-semibold inline-block w-36">Address</span>
            : Jl. Melati No. 25, RT 04 / RW 07, Kelurahan Sukamaju, Kecamatan
            Cilodong, Kota Depok, Jawa Barat, 16415, Indonesia
          </p>
          <p>
            <span className="font-semibold inline-block w-36">Shipping Service</span>
            : J&T
          </p>
          <p>
            <span className="font-semibold inline-block w-36">Payment</span>
            : BNI
          </p>
        </div>
      </div>
      {/* Tracking */}
      <h2 className="text-2xl font-semibold mb-4">Tracking</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          {["Pending", "Paid", "Packed", "Shipped", "Delivered"].map(
            (label, idx) => (
              <div key={label} className="flex-1 flex items-center">
                {/* Step Circle + Label */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
                ${idx === 0 ? "bg-black text-white" : "bg-gray-300 text-gray-600"}
              `}
                  >
                    {idx + 1}
                  </div>
                  <div className="mt-2 text-xs text-gray-700 text-center">
                    {label}
                  </div>
                </div>

                {/* Line Connector */}
                {idx < 4 && <div className="flex-1 h-[2px] bg-gray-300"></div>}
              </div>
            )
          )}
        </div>
      </div>

      {/* Cancel Button */}
      <div className="flex justify-center">
        <button className="border border-red-500 text-red-500 px-10 rounded-lg hover:bg-red-50">
          Cancel Order
        </button>
      </div>

    </div>
  );
};

export default OrderDetailsPage;
