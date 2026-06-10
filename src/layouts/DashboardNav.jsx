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
          top-4
          left-4
          right-4
          h-16
          px-4
          flex
          items-center
          justify-between
          bg-[#0B1020]/95
          backdrop-blur-2xl
          border border-white/10
          rounded-3xl
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          z-50
        "
      >
        {/* Logo */}
        <div>
          <h1 className="text-lg font-bold text-white">
            Learn
            <span className="text-cyan-400">
              ova AI
            </span>
          </h1>

          <p className="text-[10px] text-slate-400">
            Smart Learning
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="
              relative
              w-10
              h-10
              rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
            "
          >
            <Bell
              size={18}
              className="text-slate-300"
            />

            <span
              className="
                absolute
                top-2
                right-2
                w-2
                h-2
                rounded-full
                bg-cyan-400
              "
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
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                text-white
                font-bold
                shadow-lg
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
                rounded-2xl
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
          top-6
          left-[320px]
          right-6
          h-20
          px-8
          items-center
          justify-between
          bg-[#0B1020]/95
          backdrop-blur-2xl
          border border-white/10
          rounded-[32px]
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          z-50
          overflow-hidden
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="
              absolute
              -top-10
              left-20
              w-52
              h-52
              bg-cyan-500/10
              blur-[100px]
              rounded-full
            "
          />

          <div
            className="
              absolute
              top-0
              right-20
              w-52
              h-52
              bg-indigo-500/10
              blur-[100px]
              rounded-full
            "
          />
        </div>

        {/* Left */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white">
            Dashboard
          </h2>

          <p className="text-sm text-slate-400">
            Welcome back,
            {" "}
            {user?.name || "Student"}
          </p>
        </div>

        {/* Right */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <BiSearch
              size={18}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search notes, quizzes..."
              className="
                w-80
                h-12
                rounded-2xl
                bg-white/5
                border border-white/10
                pl-12
                pr-4
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-400/50
                transition-all
              "
            />
          </div>

          {/* Notifications */}
          <button
            className="
              relative
              w-12
              h-12
              rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              text-slate-300
              hover:bg-white/10
              transition-all
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                top-3
                right-3
                w-2
                h-2
                rounded-full
                bg-cyan-400
              "
            />
          </button>

          {/* User */}
          {isLoggedIn ? (
            <button
              onClick={() =>
                navigate("/profile")
              }
              className="
                flex
                items-center
                gap-3
                px-3
                py-2
                rounded-2xl
                bg-white/5
                border border-white/10
                hover:bg-white/10
                transition-all
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-cyan-500
                  flex items-center
                  justify-center
                  text-white
                  font-bold
                "
              >
                {user.name
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <div className="text-left">
                <p className="font-semibold text-white">
                  {user.name}
                </p>

                <p className="text-xs text-slate-400">
                  Premium Student
                </p>
              </div>
            </button>
          ) : (
            <button
              onClick={() =>
                navigate("/login")
              }
              className="
                px-6
                h-12
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                text-white
                font-semibold
                shadow-lg
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