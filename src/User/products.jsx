import React from "react";

const products = [
  {
    id: 1,
    name: "Stainless Steel Tumbler - Black",
    price: "Rp 130.000",
    img: "/images/tumbler-black.png",
  },
  {
    id: 2,
    name: "Ceramic Cup",
    price: "Rp 25.000",
    img: "/images/ceramic-cup.png",
  },
  {
    id: 3,
    name: "Ceramic Plate",
    price: "Rp 40.000",
    img: "/images/ceramic-plate.png",
  },
  {
    id: 4,
    name: "Bamboo Toothbrush",
    price: "Rp 12.500",
    img: "/images/bamboo-toothbrush.png",
  },
  {
    id: 5,
    name: "Stainless Steel Straw",
    price: "Rp 3.500",
    img: "/images/stainless-straw.png",
  },
  {
    id: 6,
    name: "Stainless Steel Tumbler - Pink",
    price: "Rp 130.000",
    img: "/images/tumbler-pink.png",
  },
  {
    id: 7,
    name: "Ceramic Cup",
    price: "Rp 25.000",
    img: "/images/ceramic-cup.png",
  },
  {
    id: 8,
    name: "Ceramic Plate",
    price: "Rp 40.000",
    img: "/images/ceramic-plate.png",
  },
];

export default function ProductPage() {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-6">Our Product</h2>
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="col-span-3 bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-5">Filter</h3>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium">Search</label>
            <input
              type="text"
              placeholder="Search product..."
              className="w-full border rounded-md p-2 mt-2 text-sm"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Category</p>
            <div className="flex flex-col gap-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="category" defaultChecked />
                All Products
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="category" />
                Personal Care
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="category" />
                Kitchen
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="category" />
                Lifestyle
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium">Price Range</label>
            <input
              type="text"
              placeholder="Min"
              className="w-full border rounded-md p-2 mt-2 text-sm"
            />
            <input
              type="text"
              placeholder="Max"
              className="w-full border rounded-md p-2 mt-2 text-sm"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium">Short By</label>
            <select className="w-full border rounded-md p-2 mt-2 text-sm">
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="col-span-9 grid grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-lg p-4 flex flex-col items-center shadow bg-white"
            >
              <img
                src={p.img}
                alt={p.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h4 className="font-medium text-center text-sm">{p.name}</h4>
              <p className="text-xs text-gray-500">Description</p>
              <p className="font-semibold text-sm mt-2">{p.price}</p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100">
                  Quick View
                </button>
                <button className="px-3 py-1 bg-black text-white rounded-md text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
