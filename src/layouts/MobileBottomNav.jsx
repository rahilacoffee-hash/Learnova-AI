import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
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
    path: "/upload",
    icon: Upload,
    label: "Upload",
    isCenter: true,
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
        fixed
        bottom-5
        left-4
        right-4
        z-50
      "
    >
      <div
        className="
          relative
          flex
          items-center
          justify-around
          bg-[#0B1020]/95
          backdrop-blur-2xl
          border
          border-white/10
          rounded-[30px]
          px-2
          py-3
          shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        "
      >
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                  relative
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  transition-all
                  duration-300
                  ${
                    link.isCenter
                      ? `
                        w-14
                        h-14
                        rounded-2xl
                        ${
                          isActive
                            ? `
                              bg-gradient-to-r
                              from-indigo-600
                              to-cyan-500
                              text-white
                              shadow-lg
                            `
                            : `
                              bg-white/5
                              text-slate-300
                            `
                        }
                      `
                      : `
                        w-16
                        py-2
                        ${
                          isActive
                            ? "text-cyan-400"
                            : "text-slate-400"
                        }
                      `
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {!link.isCenter && isActive && (
                    <span
                      className="
                        absolute
                        -top-1
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-cyan-400
                      "
                    />
                  )}

                  <Icon size={22} />

                  {!link.isCenter && (
                    <span className="text-[11px] font-medium">
                      {link.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;