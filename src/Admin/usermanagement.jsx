import React from 'react'
import Sidebar from '../Components/Sidebar';
import { FooterAdmin } from '../Components/FooterAdmin';
import Header from '../Components/Header';

const users = [
  { name: "Raja Wijaya", username: "@rajawjy_", email: "rajawijaya12@gmail.com", phone: "08123456789", date: "12/07/2025", total: "1" },
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
      {/* Sidebar */}
      <Sidebar />

      {/* Konten kanan */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        <div className="bg-white border-t-4 border-black shadow-md p-3">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* User Table */}
          <div className="bg-white rounded-lg shadow">
            <table className="w-full text-left shadow-xl rounded-2xl">
              <thead className="bg-white border-b rounded-2xl border-gray-600">
                <tr className="text-gray-700">
                  <th className="p-4">NAME</th>
                  <th className="p-4">EMAIL</th>
                  <th className="p-4">PHONE</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">TOTAL ORDERS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">{user.name}</td>
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
                className={`px-3 py-1 rounded-md ${num === 1 ? "bg-black text-white" : "border text-gray-600"}`}
              >
                {num}
              </button>
            ))}
            <button className="border px-3 py-1 rounded-md text-gray-400">&gt;</button>
          </div>
        </main>

        {/* Footer */}
        <FooterAdmin />
      </div>
    </div>
  );
}

export { UserManagement };
