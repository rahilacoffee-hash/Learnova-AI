import React, { useEffect, useState } from "react";
import {
  FileText,
  Eye,
  MoreVertical,
  Layers3,
} from "lucide-react";

import { MdOutlineSummarize } from "react-icons/md";

import {
  getNotes,
  getAllSummaries,
  getAllFlashcards,
} from "../services/api";

const DashboardContent = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [
        notesRes,
        summariesRes,
        flashcardsRes,
      ] = await Promise.all([
        getNotes(),
        getAllSummaries(),
        getAllFlashcards(),
      ]);

      const notes = notesRes.data.notes || [];

      const summaries =
        summariesRes.data.summaries || [];

      const flashcards =
        flashcardsRes.data.flashcards || [];

      setStats([
        {
          label: "Notes",
          value: notes.length,
          icon: FileText,
          color: "bg-blue-100 text-blue-600",
        },
        {
          label: "Summaries",
          value: summaries.length,
          icon: MdOutlineSummarize,
          color: "bg-purple-100 text-purple-600",
        },
        {
          label: "Flashcards",
          value: flashcards.length,
          icon: Layers3,
          color: "bg-green-100 text-green-600",
        },
        {
          label: "AI Usage",
          value:
            notes.length +
            summaries.length +
            flashcards.length,
          icon: Eye,
          color: "bg-orange-100 text-orange-600",
        },
      ]);

      setRecentNotes(
        notes.slice(0, 5)
      );

      const activity = [];

      summaries.slice(0, 3).forEach((item) => {
        activity.push({
          type: "Summary Generated",
          title:
            item.noteId?.title ||
            "Study Note",
          date: item.createdAt,
        });
      });

      flashcards.slice(0, 2).forEach((item) => {
        activity.push({
          type: "Flashcards Generated",
          title:
            item.noteId?.title ||
            "Study Note",
          date: item.createdAt,
        });
      });

      notes.slice(0, 2).forEach((note) => {
        activity.push({
          type: "Note Uploaded",
          title: note.title,
          date: note.createdAt,
        });
      });

      activity.sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );

      setRecentActivity(activity);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
        <p className="text-black">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-4xl font-bold text-black">
          Welcome back 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Continue learning,
          {" "}
          {user?.name || "Student"}
        </p>
      </div>

      {/* Quick Analytics */}
      <div className="grid md:grid-cols-4 gap-6">

        {stats.map(
          ({
            label,
            value,
            icon: Icon,
            color,
          }) => (
            <div
              key={label}
              className="
                bg-white/70
                backdrop-blur-xl
                border border-white/40
                rounded-3xl
                p-6
                shadow-xl
              "
            >
              <div className="flex justify-between items-center">

                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}
                >
                  <Icon size={22} />
                </div>

              </div>

              <h2 className="text-3xl font-bold text-black mt-5">
                {value}
              </h2>

              <p className="text-slate-500 mt-1">
                {label}
              </p>
            </div>
          )
        )}

      </div>

      {/* Main Grid */}
      <div className="grid xl:grid-cols-3 gap-6">

        {/* Recent Notes */}
        <div
          className="
          xl:col-span-2
          bg-white/70
          backdrop-blur-xl
          border border-white/40
          rounded-3xl
          p-6
          shadow-xl
        "
        >
          <h2 className="text-xl font-bold text-black mb-6">
            Recent Notes
          </h2>

          <div className="space-y-4">

            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div
                  key={note._id}
                  className="
                  flex
                  items-center
                  justify-between
                  p-4
                  rounded-2xl
                  hover:bg-slate-50
                  transition
                "
                >
                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <FileText
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-black">
                        {note.title}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {new Date(
                          note.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                  </div>

                  <MoreVertical
                    size={18}
                    className="text-slate-400"
                  />
                </div>
              ))
            ) : (
              <p className="text-slate-500">
                No notes uploaded yet.
              </p>
            )}

          </div>
        </div>

        {/* Recent Activity */}
        <div
          className="
          bg-white/70
          backdrop-blur-xl
          border border-white/40
          rounded-3xl
          p-6
          shadow-xl
        "
        >
          <h2 className="text-xl font-bold text-black mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5">

            {recentActivity.length > 0 ? (
              recentActivity.map(
                (activity, index) => (
                  <div
                    key={index}
                    className="border-b border-slate-100 pb-4"
                  >
                    <h4 className="font-medium text-black">
                      {activity.type}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {activity.title}
                    </p>

                    <span className="text-xs text-slate-400">
                      {new Date(
                        activity.date
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )
              )
            ) : (
              <p className="text-slate-500">
                No activity yet.
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardContent;