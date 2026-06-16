import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { loginUser, getProfile } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  let handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const normalizeUser = (data) => {
    const rawAvatar = data?.avatar || data?.profilePicture || data?.image;
    const avatar = rawAvatar
      ? rawAvatar.startsWith("http")
        ? rawAvatar
        : `${import.meta.env.VITE_API_URL}/${rawAvatar}`
      : "";

    return { ...data, avatar };
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);

      let userToSave = normalizeUser(res.data.user);
      try {
        const profileRes = await getProfile();
        if (profileRes.data?.user) {
          userToSave = normalizeUser(profileRes.data.user);
        }
      } catch (profileError) {
        console.log("Profile refresh failed", profileError);
      }

      localStorage.setItem("user", JSON.stringify(userToSave));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center px-4 relative overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.045) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(99,102,241,0.12) 0%,rgba(34,211,238,0.04) 50%,transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="font-bold text-2xl text-slate-100"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}
          >
            Learn<span className="text-indigo-400">ova</span> AI
          </Link>
          <p className="text-slate-500 text-sm mt-2">
            Welcome back — continue your journey
          </p>
        </div>

        {/* card */}
        <div className="rounded-2xl border border-slate-700/50 bg-[#0E1220]/90 backdrop-blur-xl p-8 relative overflow-hidden">
          {/* top shine */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)",
            }}
          />

          <h2
            className="font-bold text-slate-100 text-2xl mb-2 text-center"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            Sign in
          </h2>
          <p className="text-slate-500 text-sm text-center mb-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Create one free
            </Link>
          </p>

          {/* error */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* email */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-100 text-sm placeholder-slate-600 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* password */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-100 text-sm placeholder-slate-600 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                background: "linear-gradient(135deg,#6366F1,#4F46E5)",
                boxShadow: "0 0 32px rgba(99,102,241,0.35)",
              }}
            >
              {loading ? (
                <>
                  <Loader size={15} className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in →"
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          © 2026 LearnOva AI · Built by{" "}
          <span className="text-indigo-400">BYTECODE</span>
        </p>
      </div>
    </div>
  );
}
