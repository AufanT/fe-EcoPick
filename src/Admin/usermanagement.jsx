import React from 'react'
import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const users = [
    { name: "Raja Wijaya", username: "@rajawjy_", email: "rajawijaya12@gail.com", phone: "08123456789", date: "12/07/2025", total: "1" },
    { name: "Budi Sanjaya", username: "@budi_sanjaya", email: "budi_sanjaya@gmail.com", phone: "082298765432", date: "06/06/2025", total: "2" },
    { name: "Putri Amelia", username: "@ptr.amelia", email: "ptrameliaa@gmail.com", phone: "082354679810", date: "01/06/2025", total: "3" },
    { name: "Lina Marlina", username: "@marlinlina", email: "marlina1212@gmail.com", phone: "082356891011", date: "28/05/2025", total: "2" },
    { name: "Fajar Maulana", username: "@fjr.maul", email: "jarfajar1234@gmail.com", phone: "085210032002", date: "14/05/2025", total: "2" },
    { name: "Mikayla Pramudya", username: "@mikaylapra", email: "mikaylaprmdy@gmail.com", phone: "081277665443", date: "25/04/2025", total: "4" },
    { name: "Ridwan Putra", username: "@rdwn_ptr", email: "ridwanptr4@gmail.com", phone: "082211522045", date: "20/04/2025", total: "2" }
];

export default function UserManagement() {
    return (
        <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
     

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">User Management</h2>
                    <div className="flex items-center gap-4">
                        <span>Admin Profile</span>
                        <div className="w-8 h-8 bg-gray-300 rounded-full" />
                        <Link to="/login" className="bg-green-600 text-white font-bold px-4 py-2 rounded-xl border-1 border-green-800 cursor-pointer">
                            Logout
                        </Link>
                    </div>
                </header>


                {/* User Table */}
                <div className="bg-white rounded-2xl shadow">
                    <table className="w-full text-left shadow-2xl rounded-2xl">
                        <thead className="bg-white border-b rounded-2xl border-gray-600">
                            <tr className="text-gray-700 ">
                                <th className="p-4">NAME</th>
                                <th className="p-4">USERNAME</th>
                                <th className="p-4">EMAIL</th>
                                <th className="p-4">PHONE</th>
                                <th className="p-4">DATE</th>
                                <th className="p-4">TOTAL ORDERS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-b border-white-400 hover:bg-gray-50">
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.username}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.phone}</td>
                                    <td className="p-4">{user.date}</td>
                                    <td className="p-4">{user.total}</td>
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

                <footer className="text-center text-gray-600 mt-8">
                    ©2025 EcoPick. All Rights Reserved
                </footer>
          
            </main>
        </div>
    )
};

export { UserManagement };