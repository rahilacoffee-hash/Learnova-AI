import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FileText,
  Trash2,
  MessageSquare,
  Brain,
  Search,
  Plus,
  Calendar,
  Layers3,
  ChevronDown,
} from "lucide-react";

import { getNotes, deleteNote } from "../services/api";

import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";

const MyNotesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("newest");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const res = await getNotes();

      setNotes(res.data.notes || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (note) => {
    setSelectedNote(note);

    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedNote) return;

    try {
      await deleteNote(selectedNote._id);

      setNotes((prev) => prev.filter((note) => note._id !== selectedNote._id));

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete note");
    } finally {
      setShowDeleteModal(false);

      setSelectedNote(null);
    }
  };

  const filteredNotes = useMemo(() => {
    let filtered = [...notes];

    if (searchTerm) {
      filtered = filtered.filter(
        (note) =>
          note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return filtered;
  }, [notes, searchTerm, sortBy]);

  const totalNotes = notes.length;

  const totalTags = new Set(notes.flatMap((note) => note.tags || [])).size;

  const recentNotes = notes.filter((note) => {
    const diff = Date.now() - new Date(note.createdAt).getTime();

    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex">
        <Sidebar />

        <div className="flex-1 lg:ml-[320px] flex items-center justify-center">
          <div
            className="
              bg-[#0B1022]
              border
              border-white/10
              rounded-[32px]
              px-10
              py-8
              text-white
            "
          >
            Loading notes...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] relative overflow-hidden">
      {/* Glow Effects */}

      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[180px] rounded-full" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/10 blur-[150px] rounded-full" />

      <Sidebar />

      <div className="lg:hidden">
        <MobileBottomNav />
      </div>

      <div
        className="
          relative
          z-10
          lg:ml-[320px]
          p-6
          lg:p-10
          pb-32
        "
      >
        {/* Header */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
            mb-10
          "
        >
          <div>
            <h1 className="text-4xl font-bold text-white">My Notes</h1>

            <p className="text-slate-400 mt-2">
              Organize and study your learning materials
            </p>
          </div>
          <div className="mb-10">
            <div
              className="
      rounded-3xl
      border
      border-white/10
      bg-[#0B1022]/80
      backdrop-blur-xl
      p-2
    "
            >
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
        w-full
        bg-transparent
        px-4
        py-3
        text-white
        placeholder:text-slate-500
        outline-none
      "
              />
            </div>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="
              bg-gradient-to-r
              from-indigo-600
              to-cyan-500
              text-white
              px-6
              py-4
              rounded-2xl
              flex
              items-center
              gap-3
              font-semibold
              shadow-lg
              shadow-cyan-500/20
            "
          >
            <Plus size={20} />
            Upload Notes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="
          group
          relative
          overflow-hidden
          rounded-[32px]
          border border-white/10
          bg-[#0B1022]/80
          backdrop-blur-xl
          p-6
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-cyan-500/30
          hover:shadow-[0_25px_80px_rgba(6,182,212,0.12)]
        "
            >
              {/* Glow */}
              <div
                className="
            absolute
            inset-0
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-500
            bg-gradient-to-br
            from-cyan-500/5
            via-transparent
            to-indigo-500/5
            pointer-events-none
          "
              />

              {/* Top */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div
                    className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                flex
                items-center
                justify-center
                shadow-lg
                shadow-cyan-500/20
              "
                  >
                    <FileText className="text-white" />
                  </div>

                  <div>
                    <h2 className="font-bold text-white text-lg line-clamp-1">
                      {note.title}
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                {note.description || "No description available for this note."}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {note.tags?.length > 0 ? (
                  note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="
                  px-3
                  py-1
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  text-cyan-400
                  text-xs
                "
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500">No tags</span>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate(`/summary/${note._id}`)}
                  className="
              rounded-2xl
              py-3
              bg-gradient-to-r
              from-indigo-600
              to-cyan-500
              text-white
              font-medium
              transition-all
              hover:scale-[1.02]
            "
                >
                  Summary
                </button>

                <button
                  onClick={() => navigate(`/chat/${note._id}`)}
                  className="
              rounded-2xl
              py-3
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
              flex
              items-center
              justify-center
              gap-2
              transition-all
              hover:bg-green-500
              hover:text-white
            "
                >
                  <MessageSquare size={16} />
                  Chat
                </button>

                <button
                  onClick={() => navigate(`/flashcards/${note._id}`)}
                  className="
              rounded-2xl
              py-3
              bg-cyan-500/10
              border
              border-cyan-500/20
              text-cyan-400
              transition-all
              hover:bg-cyan-500
              hover:text-white
            "
                >
                  Flashcards
                </button>

                <button
                  onClick={() => navigate(`/quiz/${note._id}`)}
                  className="
              rounded-2xl
              py-3
              bg-orange-500/10
              border
              border-orange-500/20
              text-orange-400
              flex
              items-center
              justify-center
              gap-2
              transition-all
              hover:bg-orange-500
              hover:text-white
            "
                >
                  <Brain size={16} />
                  Quiz
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(note._id)}
                className="
            mt-4
            w-full
            rounded-2xl
            py-3
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            flex
            items-center
            justify-center
            gap-2
            transition-all
            hover:bg-red-500
            hover:text-white
          "
              >
                <Trash2 size={16} />
                Delete Note
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyNotesPage;
