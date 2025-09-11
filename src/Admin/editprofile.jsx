import React from 'react';
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";

export default function EditProfile() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#15803D] p-6 text-white">
                <h1 className="text-2xl font-bold mb-8">EcoPick</h1>
                <nav className="space-y-4">
                    <a href="#" className="flex items-center gap-3 hover:text-green-800">
                        <FaHome /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:text-green-800">
                        <FaBoxOpen /> Order Management
                    </a>
                    <a href="#" className="flex items-center gap-3 hover:text-green-800">
                        <FaUsers /> User Management
                    </a>
                    <a href="#" className="flex items-center gap-3 bg-[#355317] p-2 rounded-md">
                        <FaRegUserCircle /> Edit Profile
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Edit Profile</h2>
                    <div className="flex items-center gap-4">
                        <span>Admin Profile</span>
                        <div className="w-8 h-8 bg-gray-300 rounded-full" />
                        <Link to="/login" className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border-2 border-green-800">
                            Logout
                        </Link>
                    </div>
                </header>
                <div className="flex">
                    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center w-50 h-80">
                        <div className="bg-gray-300 h-28 w-28 mt-13 flex items-center justify-center rounded-full">
                            <HiUser className="text-6xl text-white" />
                        </div>
                        <button className="bg-black text-white px-4 py-2 rounded-md mt-4">
                            Edit
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
export { EditProfile };