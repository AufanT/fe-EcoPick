import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
       <header className="flex justify-end items-center bg-black p-2 shadow-md">
            {/* Kanan: Profile */}
            <div className="flex items-center gap-3 text-white">
                <span className="text-sm">Admin Profile</span>
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <FaRegUserCircle className="text-black text-lg" />
                </div>
                <Link
                    to="/login"
                    className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border border-green-800 cursor-pointer"
                >
                    Logout
                </Link>
            </div>
        </header>
    );
}
