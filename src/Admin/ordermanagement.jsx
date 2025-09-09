import React from 'react'
import { FaHome, FaUsers, FaBoxOpen, FaRegUserCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLineChart } from "react-icons/bi";

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
      {/* Sidebar */}
      <aside className="w-64 bg-[#15803D] p-6 text-white">
        <h1 className="text-2xl font-bold mb-8">EcoPick</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 hover:text-green-800">
            <FaHome /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 bg-[#355317] p-2 rounded-md">
            <FaBoxOpen /> Order Management
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-800">
            <FaUsers /> User Management
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-800">
            <FaRegUserCircle /> Edit Profile
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4 w-full h-auto"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md text-xl">
                {item.icon}
              </div>

              {/* Title + Value + Percent (vertikal) */}
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{item.title}</span>
                <span className="text-xl font-semibold">{item.value}</span>
                <span className={`text-sm text-right ${item.up ? "text-green-500" : "text-red-500"}`}>
                  {item.percent}
                </span>
              </div>
            </div>
          ))}
        </div>


        <div className="bg-white rounded-2xl shadow">
          <table className="w-full text-left border p-4 border-gray-400">
            <thead className="bg-gray-200 border-b border-gray-600">
              <tr className="text-gray-700 ">
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
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{order.orderId}</td>
                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.productName}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">{order.total}</td>
                <td className="p-4 ">{order.status}</td>
              </tr>
            ))}
          </tbody>
          </table>

        </div>
      </div>
    </div>
  )
};


export { OrderManagement };