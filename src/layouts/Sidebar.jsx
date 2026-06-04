import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Brain,
  MessageSquare,
  User,
  LogOut,
  Upload,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "My Notes",
    path: "/notes",
    icon: <FileText size={20} />,
  },
  {
    name: "Upload",
    path: "/upload",
    icon: <Upload size={20} />,
  },
 
  {
    name: "AI Chat",
    path: "/chat",
    icon: <MessageSquare size={20} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <User size={20} />,
  },
];

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside
      className="
      hidden lg:flex
      fixed
      left-6
      top-6
      bottom-6
      w-72
      flex-col
      justify-between
      bg-white/50
      backdrop-blur-xl
      rounded-[32px]
      border border-white/50
      shadow-2xl
      p-6
      z-50
    "
    >
      <div>
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Learn<span className="text-primary">ova AI</span>
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Smart Learning
          </p>
        </div>

        <div className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                px-5 py-4
                rounded-2xl
                transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `
              }
            >
              {link.icon}
              <span className="font-medium">
                {link.name}
              </span>
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <div className="bg-white rounded-3xl border p-4 shadow-sm mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h3 className="font-semibold text-sm">
                {user?.name || "Student"}
              </h3>

              <p className="text-xs text-gray-500 truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;