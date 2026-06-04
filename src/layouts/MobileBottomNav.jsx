import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Brain,
  MessageSquare,
  User,
  Upload,
} from "lucide-react";

const links = [
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    label: "Home",
  },
  {
    path: "/notes",
    icon: FileText,
    label: "Notes",
  },
  {
    name: "Upload",
    path: "/upload",
    icon: Upload ,
  },
  {
    path: "/chat",
    icon: MessageSquare,
    label: "AI",
  },
  {
    path: "/profile",
    icon: User,
    label: "Profile",
  },
];

const MobileBottomNav = () => {
  return (
    <div
      className="
      lg:hidden
      fixed bottom-4 left-1/2
      -translate-x-1/2
      w-[95%]
      bg-white/90
      backdrop-blur-xl
      rounded-3xl
      shadow-xl
      border border-white/40
      px-2 py-3
      z-50
      "
    >
      <div className="flex justify-around">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                flex flex-col items-center
                text-xs
                ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-500"
                }
              `
              }
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;