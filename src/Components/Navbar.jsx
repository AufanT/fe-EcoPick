import React from 'react'

const Navbar = () => {
  return (
    <nav
      className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      {/* Kiri: Logo */}
      <a className="font-bold text-xl tracking-tight" href="#">
        EcoPick
      </a>

      {/* Tengah: Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 px-3 py-1 rounded-full text-white-900 focus:outline-none border-amber-50 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Kanan: Menu */}
      <div className="flex items-center space-x-2">
        <a
          className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"
          href="#"
        >
          Home
        </a>
        <a
          className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"
          href="#"
        >
          About
        </a>
        <a
          className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700"
          href="#"
        >
          Contact
        </a>
      </div>
    </nav>
  )
}

export default Navbar
