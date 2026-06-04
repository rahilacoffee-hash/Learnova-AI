import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Mail,
  BookOpen,
  Brain,
  FileText,
  Trophy,
} from "lucide-react";

import { getNotes, getAllSummaries, } from "../services/api";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [stats, setStats] = useState({
    notes: 0,
    summaries: 0,
    quizzes: 0,
    averageScore: "0%",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [notesRes, summariesRes, ] =
        await Promise.all([
          getNotes(),
          getAllSummaries(),
          
        ]);

      const notes = notesRes.data.notes || [];
      const summaries =
        summariesRes.data.summaries || [];
    

      let completedQuizzes = quizzes.filter(
        (q) => q.score !== undefined
      );

      let avgScore =
        completedQuizzes.length > 0
          ? Math.round(
              completedQuizzes.reduce(
                (acc, quiz) =>
                  acc +
                  (quiz.score /
                    quiz.questions.length) *
                    100,
                0
              ) / completedQuizzes.length
            ) + "%"
          : "0%";

      setStats({
        notes: notes.length,
        summaries: summaries.length,
        quizzes: quizzes.length,
        averageScore: avgScore,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const statCards = [
    {
      label: "Notes",
      value: stats.notes,
      icon: FileText,
      bg: "from-blue-500 to-cyan-500",
    },
    {
      label: "Summaries",
      value: stats.summaries,
      icon: BookOpen,
      bg: "from-purple-500 to-pink-500",
    },
    {
      label: "Quizzes",
      value: stats.quizzes,
      icon: Brain,
      bg: "from-orange-500 to-red-500",
    },
    {
      label: "Average Score",
      value: stats.averageScore,
      icon: Trophy,
      bg: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb] relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-40 left-80 w-96 h-96 bg-purple-500/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 blur-[180px] rounded-full" />

      <div className="relative z-10 lg:ml-[320px] px-4 md:px-8 pt-28 pb-10">

        {/* Profile Hero */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl mb-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="flex items-center gap-6">

              <div className="w-28 h-28 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name || "Student"}
                </h1>

                <p className="text-gray-500 mt-2 flex items-center gap-2">
                  <Mail size={16} />
                  {user.email}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <User size={16} />
                  Active Learner
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:scale-105 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-5 shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${card.bg} flex items-center justify-center text-white mb-4`}
                >
                  <Icon size={22} />
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>

                <p className="text-gray-500 mt-1">
                  {card.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Account Details */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg">

          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Full Name
              </p>

              <div className="bg-white rounded-2xl p-4 border">
                {user.name}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Email Address
              </p>

              <div className="bg-white rounded-2xl p-4 border break-all">
                {user.email}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Account Type
              </p>

              <div className="bg-white rounded-2xl p-4 border">
                Student
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                Learning Status
              </p>

              <div className="bg-white rounded-2xl p-4 border">
                Active
              </div>
            </div>

          </div>

          <div className="mt-10 pt-8 border-t">

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;