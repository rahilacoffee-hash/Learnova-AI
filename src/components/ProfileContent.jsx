import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Mail,
  BookOpen,
  Brain,
  FileText,
  Trophy,
  Camera,
  Save,
  X,
  Edit3,
  Loader,
} from "lucide-react";

import { getNotes, getAllSummaries, uploadAvatar } from "../services/api";
import toast from "react-hot-toast";

const ProfileContent = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [stats, setStats] = useState({
    notes: 0,
    summaries: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setEditForm({ name: parsed.name, email: parsed.email });
      const savedAvatar =
        parsed.avatar || parsed.profilePicture || parsed.image;
      if (savedAvatar) setAvatarPreview(savedAvatar);
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [notesRes, summariesRes] = await Promise.all([
        getNotes(),
        getAllSummaries(),
      ]);
      setStats({
        notes: (notesRes.data.notes || []).length,
        summaries: (summariesRes.data.summaries || []).length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setAvatarPreview(preview);

    try {
      setAvatarLoading(true);

      const formData = new FormData();

      formData.append("avatar", file);

      const res = await uploadAvatar(formData);

      if (res.data.success) {
        const updatedUser = res.data.user;

        setUser(updatedUser);

        setAvatarPreview(updatedUser.avatar);

        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.log(error.response?.data || error);

      toast(error.response?.data?.message || "Failed to upload avatar");
    } finally {
      setAvatarLoading(false);
    }
  };
  const handleSaveProfile = () => {
    const updated = { ...user, ...editForm };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const statCards = [
    {
      label: "Total Notes",
      value: stats.notes,
      icon: FileText,
      color: "#6366f1",
      light: "#eef2ff",
    },
    {
      label: "Summaries",
      value: stats.summaries,
      icon: BookOpen,
      color: "#8b5cf6",
      light: "#f5f3ff",
    },
    {
      label: "Quizzes",
      value: "—",
      icon: Brain,
      color: "#f59e0b",
      light: "#fffbeb",
    },
    {
      label: "Avg Score",
      value: "—",
      icon: Trophy,
      color: "#10b981",
      light: "#ecfdf5",
    },
  ];

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute top-40 left-80 w-96 h-96 bg-purple-500/20 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 blur-[180px] rounded-full pointer-events-none" />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <div className="relative z-10 lg:ml-[320px] px-4 md:px-8 pt-28 pb-16 max-w-5xl">
        {/* Profile Hero */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl overflow-hidden mb-6 borde">
          <div className="h-28 bg-slate-900" />

          <div className="px-8 pb-8 bg-slate-900">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-14">
              {/* Avatar */}
              <div className="relative w-fit">
                <div
                  onClick={handleAvatarClick}
                  className="w-24 h-24 borde rounded-2xl border-4 border-white shadow-lg overflow-hidden cursor-pointer group relative"
                >
                  {avatarPreview ? (
                    <img
                      src={
                        avatarPreview ||
                        "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(user.name || "User")
                      }
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                      {initials}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    {avatarLoading ? (
                      <Loader size={18} className="text-white animate-spin" />
                    ) : (
                      <Camera size={18} className="text-white" />
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAvatarClick}
                  className="absolute -bottom-2 -right-2 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
                >
                  {avatarLoading ? (
                    <Loader size={12} className="text-slate-400 animate-spin" />
                  ) : (
                    <Camera size={12} className="text-slate-500" />
                  )}
                </button>
              </div>

              {/* Edit / Save buttons */}
              <div className="flex gap-3 mb-1 0">
                {editing ? (
                  <>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                    >
                      <X size={15} />
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow hover:opacity-90 transition"
                    >
                      <Save size={15} />
                      Save changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow hover:opacity-90 transition"
                  >
                    <Edit3 size={15} />
                    Edit profile
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 ">
              <h1 className="text-2xl font-bold text-white">
                {user.name || "No name set"}
              </h1>
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5">
                <Mail size={13} />
                {user.email || "No email"}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
                <User size={12} />
                Active Learner
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {statCards.map((card) => {
            let Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-slate-900/80 backdrop-blur-xl border border-white/60 borde   rounded-2xl p-5 shadow-md"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: card.light }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-gray-400 text-sm mt-1">{card.label}</p>
              </div>
            );
          })}
        </div>

        {/* Account Info */}
        <div className="bg-slate-900/80  backdrop-blur-xl border border-white/60 borde rounded-3xl p-8 shadow-xl">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Account information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                Full name
              </p>
              {editing ? (
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-indigo-400 transition"
                />
              ) : (
                <div className="bg-slate-900 borde rounded-xl px-4 py-3 text-sm text-gray-200">
                  {user.name || "—"}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                Email address
              </p>
              {editing ? (
                <input
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-indigo-400 transition"
                />
              ) : (
                <div className="bg-slate-900 borde  rounded-xl px-4 py-3 text-sm text-gray-200 break-all">
                  {user.email || "—"}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                Account type
              </p>
              <div className="bg-slate-900 borde rounded-xl px-4 py-3 text-sm text-gray-200">
                Student
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide">
                Learning status
              </p>
              <div className="bg-slate-900 borde rounded-xl px-4 py-3 text-sm">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-500">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
