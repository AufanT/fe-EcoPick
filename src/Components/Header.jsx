import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const [adminData, setAdminData] = useState(null);

  // Ambil data admin dari localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("adminData");
    if (savedData) {
      setAdminData(JSON.parse(savedData));
    }
  }, []);

  return (
    <header className="flex justify-end items-center bg-black p-2 shadow-md">
      {/* Kanan: Profile */}
      <div className="flex items-center gap-3 text-white">
        <span className="text-sm">
          {adminData?.name || "Admin Profile"}
        </span>

        <div className="w-8 h-8 bg-gray-400 rounded-full overflow-hidden flex items-center justify-center">
          {adminData?.photo ? (
            <img
              src={adminData.photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle className="text-black text-2xl" />
          )}
        </div>

        <Link
          to="/login"
          className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border border-green-800 cursor-pointer 
          hover:bg-green-700 active:bg-green-800 transition duration-200"
        >
          Logout
        </Link>
      </div>
    </header>
  );
}
