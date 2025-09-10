import React from "react";

const OrderDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* Order Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold w-32 inline-block">Recipient Name</span>
            : Mikayla Pramudya
          </p>
          <p>
            <span className="font-semibold w-32 inline-block">Product</span>
            : Stainless Steel Tumbler
          </p>
          <p>
            <span className="font-semibold w-32 inline-block">Address</span>
            : Jl. Melati No. 25, RT 04 / RW 07, Kelurahan Sukamaju, Kecamatan
            Cilodong, Kota Depok, Jawa Barat, 16415, Indonesia
          </p>
          <p>
            <span className="font-semibold w-32 inline-block">Shipping Service</span>
            : J&T
          </p>
          <p>
            <span className="font-semibold w-32 inline-block">Payment</span>
            : BNI
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Order Status</h2>
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((step, idx) => (
            <div key={step} className="flex-1 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-bold">
                {step}
              </div>
              {idx < 4 && (
                <div className="flex-1 h-[2px] bg-black"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
