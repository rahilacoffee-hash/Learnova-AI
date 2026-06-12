import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
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
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isLoggedIn = !!user?.name;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside
      className="
        hidden lg:flex
        fixed
        top-6
        left-6
        bottom-6
        w-72
        flex-col
        justify-between
        bg-[#0B1020]
        border
        border-white/10
        rounded-[36px]
        p-7
        shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        overflow-hidden
        z-50
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            -top-20
            -left-20
            w-72
            h-72
            bg-cyan-500/10
            blur-[120px]
            rounded-full
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            w-72
            h-72
            bg-indigo-600/10
            blur-[120px]
            rounded-full
          "
        />
      </div>

      {/* Top */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="mb-14">
          <h1 className="text-4xl font-bold text-white">
            Learn
            <span className="text-cyan-400">
              ova AI
            </span>
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Smart Learning Platform
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-4
                  px-5
                  py-4
                  rounded-2xl
                  transition-all
                  duration-300
                  group
                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-indigo-600
                        to-cyan-500
                        text-white
                        shadow-lg
                        shadow-cyan-500/20
                      `
                      : `
                        text-slate-400
                        hover:bg-white/5
                        hover:text-white
                      `
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

      {/* Bottom */}
      <div className="relative z-10">
        {/* User Card */}
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-4
            backdrop-blur-xl
            mb-5
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                flex
                items-center
                justify-center
                text-white
                font-bold
                text-lg
              "
            >
             <img
                src={ "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSatxU0q9eadOAPWotvfcEY6MSpeJmU7QS0husqy2VrEw&s=10" || user.avatar}
                />

            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">
                {user?.name ||
                  "Guest User"}
              </h3>

              <p className="text-xs text-slate-400 truncate">
                {user?.email ||
                  "Sign in to continue"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout / Login */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              py-4
              rounded-2xl
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              hover:bg-red-500
              hover:text-white
              transition-all
            "
          >
            <LogOut size={18} />

            Logout
          </button>
        ) : (
          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-indigo-600
              to-cyan-500
              text-white
              font-semibold
              shadow-lg
              shadow-cyan-500/20
              hover:scale-[1.02]
              transition-all
            "
          >
            Login
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;