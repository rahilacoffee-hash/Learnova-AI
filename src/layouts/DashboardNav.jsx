import React from "react";
import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const DashboardNav = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isLoggedIn = !!user?.name;

  return (
   <header
  className="
    hidden lg:flex
    fixed
    top-0
    right-0
    left-[280px]
    h-24
    px-8
    items-center
    justify-end
    z-50
    bg-[#f8f9fc]/80
    backdrop-blur-xl
  "
>
      <div className="flex items-center  ">
      
       

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <BiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
            />

            <input
              type="text"
              placeholder="Search notes, quizzes..."
              className="
                w-80
                h-12
                rounded-full
                bg-black/80
                backdrop-blur-xl
                border
                border-white/50
                pl-12
                pr-4
                shadow-md
                outline-none
              "
            />
          </div>

          {/* Notifications */}
          <button
            className="
              relative
              w-12
              h-12
              rounded-full
              bg-black
              shadow-md
              flex
              items-center
              justify-center
            "
          >
            <Bell size={18} />

            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User or Login */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-white rounded-full px-3 py-2 shadow-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="hidden md:block">
                <p className="font-semibold text-sm">
                  {user.name}
                </p>

                <p className="text-xs text-gray-500">
                  Learnova
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="
                h-12
                px-6
                rounded-full
                bg-gradient-to-r
                from-purple-600
                to-pink-600
                text-white
                font-semibold
                shadow-md
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;