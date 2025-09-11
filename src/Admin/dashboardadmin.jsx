import React from "react";
import { FaHome, FaUsers, FaBoxOpen, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

export default function EditProfile() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Admin Profile</h2>
          <div className="flex items-center gap-4">
            <span>Admin Profile</span>
            <FaRegUserCircle className="w-8 h-8 text-gray-600" />
            <Link
              to="/login"
              className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border border-green-800 cursor-pointer"
            >
              Logout
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex gap-6">
          {/* Profile Photo */}
          <div className="bg-white shadow-md rounded-lg p-6 w-1/3 flex flex-col items-center">
            <FaRegUserCircle className="w-32 h-32 text-gray-400" />
            <button className="mt-4 bg-black text-white px-4 py-2 rounded-md">
              Edit
            </button>
          </div>

          {/* Form */}
          <div className="bg-white shadow-md rounded-lg p-6 w-2/3">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-black text-white px-4 py-2 rounded-md"
              >
                Save Change
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center bg-black text-white mt-8">
          ©2025 EcoPick. All Rights Reserved
        </div>
      </main>
    </div>
  );
}

export { EditProfile };
