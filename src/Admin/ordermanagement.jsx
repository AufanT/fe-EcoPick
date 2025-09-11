import React from 'react'
import { FaHome, FaUsers, FaBoxOpen, FaRegUserCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam, BsArrowRight } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLineChart } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const stats = [
  { title: "Total Order", value: "180", icon: <TbTruckDelivery className="w-6 h-6" />, percent: "+1.90%", up: true },
  { title: "Total Produk", value: "200", icon: <BsBoxSeam className="w-6 h-6" />, percent: "-1.05%", up: false },
  { title: "Total User", value: "150", icon: <HiOutlineUserGroup className="w-6 h-6" />, percent: "+1.00%", up: true },
  { title: "Total Revenue", value: "Rp 150.000", icon: <BiLineChart className="w-6 h-6" />, percent: "+2.00%", up: true },
];

const orders = [
  { orderId: "#OR1A5", name: "Raja Wijaya", product: "Stainless Steel Tumbler", date: "12/07/2025", total: "Rp 130.000", status: "Delivered" },
  { orderId: "#OR2B7", name: "Budi Sanjaya", product: "Stainless Steel Straw", date: "17/07/2025", total: "Rp 7.000", status: "Delivered" },
  { orderId: "#OR3C9", name: "Putri Amelia", product: "Stainless Steel Tumbler", date: "18/07/2025", total: "Rp 260.000", status: "Delivered" },
  { orderId: "#OR4D2", name: "Lina Marlina", product: "Ceramic Cup", date: "20/07/2025", total: "Rp 25.000", status: "Packed" },
  { orderId: "#OR5E8", name: "Fajar Maulana", product: "Bamboo Toothbrush", date: "21/07/2025", total: "Rp 12.500", status: "Paid" }
];

export default function OrderManagement() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Order Management</h2>
          <div className="flex items-center gap-4">
            <span>Admin Profile</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <Link to="/login" className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border-1 border-green-800 cursor-pointer">
              Logout
            </Link>
          </div>
        </header>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 w-full h-auto"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg text-xl">
                  {item.icon}
                </div>

                {/* Title + Value + Percent */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">{item.title}</span>
                  <span className="text-xl font-semibold">{item.value}</span>
                  <span className={`text-sm text-right ${item.up ? "text-green-500" : "text-red-500"}`}>
                    {item.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white mt-6 rounded-lg shadow-2xl">
            <table className="w-full text-left border-gray-400">
              <thead className="border-b border-gray-300">
                <tr className="text-black border-gray-200">
                  <th className="p-4">ORDER ID</th>
                  <th className="p-4">NAME</th>
                  <th className="p-4">NAME PRODUCT</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">TOTAL</th>
                  <th className="p-4">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="items-center border-b hover:bg-gray-50">
                    <td className="p-4">{order.orderId}</td>
                    <td className="p-4">{order.name}</td>
                    <td className="p-4">{order.product}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{order.total}</td>
                    <td className={`p-4 ${order.status === "Delivered" ? "inline-flex bg-green-200 mt-3 mb-3 text-green-400 text-sm rounded-2xl py-1.5 text-center shadow" : order.status === "Packed" ? "inline-flex text-red-400 text-sm bg-red-200 mt-3 mb-3 rounded-2xl py-1.5 text-center shadow" : "inline-flex text-blue-400 text-sm bg-blue-200 rounded-2xl mt-3 mb-3 py-1.5 text-center shadow"}`}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button className="border px-3 py-1 rounded-md text-gray-400">&lt;</button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded-md ${num === 1 ? "bg-black text-white" : "border text-gray-600"
                  }`}
              >
                {num}
              </button>
            ))}
            <button className="border px-3 py-1 rounded-md text-gray-400">&gt;</button>
          </div>

        </div>

        {/* Footer */}
        <footer className="text-center text-gray-600 mt-8">
          ©2025 EcoPick. All Rights Reserved
        </footer>

      </main>
    </div>
  )
};


export { OrderManagement };