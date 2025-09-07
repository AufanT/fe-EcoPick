import React from 'react'
import { FaHome, FaBoxOpen, FaUsers } from 'react-icons/fa';
import { UserCircle2 } from 'lucide-react';

export default function AddProduct() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#15803D] p-6 text-white">
                <h1 className="text-2xl font-bold mb-8">EcoPick</h1>
                <nav className="space-y-4">
                    <a href="#" className="flex items-center gap-3 bg-[#355317] p-2 rounded-md">
                        <FaHome /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:text-green-800">
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
            {/* Main Content */}

            <div className="w-full">
                {/* Bar Hitam */}
                <div className="bg-black text-white flex justify-end items-center px-6 py-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Admin Profile</span>
                        <div className="bg-gray-400 rounded-full p-1">
                            <UserCircle2 className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* Bar Putih */}
                <div className="bg-white shadow-md px-6 py-3">
                    <h1 className="text-lg font-bold">Dashboard</h1>
                </div>
                
            </div>
        </div>
    );
};