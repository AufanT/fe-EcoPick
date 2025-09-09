import React from 'react';
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from 'react-icons/fa';

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
                    </div>
                </header>
            </main>
        </div>
    );
}
export { EditProfile };