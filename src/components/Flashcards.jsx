import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Trash2, MessageSquare, Brain } from "lucide-react";

import { getNotes, deleteNote } from "../services/api";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";

const Flashcards = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data.notes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmDelete) return;

    try {
      await deleteNote(id);

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#050816]">
        <Sidebar />

        <div className="flex-1 md:ml-[320px] flex items-center justify-center">
          <div className="bg-white rounded-3xl px-8 py-6 shadow-xl">
            Loading notes...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden">
      {/* Glow Effects */}
      <div
        className="
          absolute
          top-0
          left-1/3
          w-[500px]
          h-[500px]
          bg-indigo-600/10
          blur-[180px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-cyan-600/10
          blur-[180px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[350px]
          h-[350px]
          bg-purple-600/10
          blur-[150px]
          rounded-full
        "
      />

      <Sidebar />

      <div className="md:hidden">
        <MobileBottomNav />
      </div>

      <div className="relative z-10 flex-1 md:ml-[320px] p-6 lg:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">My Notes</h1>

          <p className="text-gray-500 mt-2">
            Manage all your uploaded study materials
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl text-center border border-white/50">
            <FileText size={60} className="mx-auto text-violet-500 mb-5" />

            <h2 className="text-2xl font-bold mb-2 text-black">No Notes Yet</h2>

            <p className="text-gray-500 mb-6">
              Upload your first study material to begin.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                text-white
                px-8
                py-3
                rounded-2xl
                font-medium
              "
            >
              Upload Notes
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="
                  bg-white/80
                  backdrop-blur-xl
                  rounded-3xl
                  border
                  border-white/50
                  shadow-xl
                  p-6
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >
                {/* Note Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                    <FileText size={22} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-gray-900 line-clamp-1">
                      {note.title}
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm line-clamp-3 mb-5">
                  {note.description || "No description available."}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {note.tags?.length > 0 ? (
                    note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="
                          bg-violet-100
                          text-violet-600
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                        "
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No tags</span>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate(`/flashcards/${note._id}`)}
                    className="
    bg-cyan-600
    text-white
    py-2
    rounded-xl
  "
                  >
                    Flashcards
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="
                      bg-red-500
                      text-white
                      py-3
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
