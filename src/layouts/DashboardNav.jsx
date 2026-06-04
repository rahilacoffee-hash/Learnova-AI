import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const DashboardNav = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isLoggedIn = !!user?.name;

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <header
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          h-20
          px-5
          flex
          items-center
          justify-between
          bg-[#f8f9fc]/80
          backdrop-blur-xl
          border-b border-white/20
          z-50
        "
      >
        {/* Logo */}
        <div>
          <h1 className="text-lg font-bold text-black">
            AI Study
          </h1>

          <p className="text-xs text-slate-500">
            Learn Smarter
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            className="
              w-10
              h-10
              rounded-full
              bg-white
              shadow-md
              flex
              items-center
              justify-center
            "
          >
            <Bell
              size={18}
              className="text-black"
            />
          </button>

          {isLoggedIn ? (
            <button
              onClick={() =>
                navigate("/profile")
              }
              className="
                w-10
                h-10
                rounded-full
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
            >
              {user.name
                ?.charAt(0)
                .toUpperCase()}
            </button>
          ) : (
            <button
              onClick={() =>
                navigate("/login")
              }
              className="
                px-4
                py-2
                rounded-full
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                text-white
                text-sm
                font-medium
              "
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* ================= DESKTOP HEADER ================= */}
      <header
        className="
          hidden
          lg:flex
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
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <BiSearch
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search notes, summaries..."
              className="
                w-80
                h-12
                rounded-full
                bg-white
                border
                border-slate-200
                pl-12
                pr-4
                shadow-sm
                outline-none
                text-black
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
              bg-white
              shadow-sm
              flex
              items-center
              justify-center
            "
          >
            <Bell
              size={18}
              className="text-black"
            />

            <span
              className="
                absolute
                top-3
                right-3
                w-2
                h-2
                bg-red-500
                rounded-full
              "
            />
          </button>

          {/* User / Login */}
          {isLoggedIn ? (
            <button
              onClick={() =>
                navigate("/profile")
              }
              className="
                flex
                items-center
                gap-3
                bg-white
                rounded-full
                px-3
                py-2
                shadow-sm
                hover:shadow-md
                transition-all
              "
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-600
                  to-cyan-500
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div className="text-left">
                <p className="font-semibold text-sm text-black">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">
                  Student
                </p>
              </div>
            </button>
          ) : (
            <button
              onClick={() =>
                navigate("/login")
              }
              className="
                h-12
                px-6
                rounded-full
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                text-white
                font-semibold
                hover:scale-105
                transition-all
              "
            >
              Login
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default DashboardNav;