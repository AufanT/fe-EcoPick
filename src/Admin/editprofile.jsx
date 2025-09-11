import React, { useState, useEffect } from 'react';
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        phoneNumber: ""
    });

    useEffect(() => {
        // Ambil data dari localStorage
        const savedData = localStorage.getItem("adminData");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setFormData({
                name: parsed.firstName + " " + parsed.lastName,
                username: parsed.username || "",
                email: parsed.email || "",
                phoneNumber: parsed.phoneNumber || ""
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated profile:", formData);
        // Simpan kembali ke localStorage (atau kirim ke API)
        localStorage.setItem("adminData", JSON.stringify(formData));
        alert("Profile updated!");
    };

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
                        <Link to="/login" className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border-1.5 border-green-800">
                            Logout
                        </Link>
                    </div>
                </header>
                <div className="flex">
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-50 h-80">
                        <div className="bg-gray-300 h-28 w-28 mt-13 flex items-center justify-center rounded-full">
                            <HiUser className="text-7xl text-white" />
                        </div>
                        <button className="bg-black text-white text-center rounded-md w-20 mt-4">
                            Edit
                        </button>
                    </div>
                    <div className="flex ml-6 items-center justify-center max-w-lg w-full">
                        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg">
                            <form onSubmit={handleSubmit} className="margin-20">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    />
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                                    />
                                 </div>
                            </form>   
                        </div>

                    </div>

                </div>

                {/* Footer */}
                <footer className="text-center text-gray-600 mt-8">
                    ©2025 EcoPick. All Rights Reserved
                </footer>

            </main>
        </div>
    );
}

export default EditProfile;