import React from 'react'
import { FaHome, FaUsers, FaBoxOpen, FaList } from "react-icons/fa";

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
            <FaUsers /> Edit Profile
          </a>
        </nav>
      </aside>
    </div>
  )
}

export { OrderManagement };