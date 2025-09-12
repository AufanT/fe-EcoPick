import { FaHome, FaBoxOpen, FaUsers, FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/dashboard-admin", label: "Dashboard", icon: <FaHome /> },
    { to: "/ordermanagement", label: "Order Management", icon: <FaBoxOpen /> },
    { to: "/usermanagement", label: "User Management", icon: <FaUsers /> },
    { to: "/editprofile", label: "Edit Profile", icon: <FaRegUserCircle /> },
  ];

  return (
    <aside className="w-64 bg-[#15803D] p-6 text-white">
      <h1 className="text-2xl font-bold mb-8">EcoPick</h1>
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-2 rounded-md 
              ${location.pathname === link.to ? "bg-[#355317]" : "hover:text-green-800"}`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
