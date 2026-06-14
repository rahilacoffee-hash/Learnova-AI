import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FileText, Trash2, MessageSquare, Brain,
  Search, Plus, Layers3, X, AlertTriangle,
} from "lucide-react";
import { getNotes, deleteNote } from "../services/api";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";

export default function MyNotesPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      setNotes(res.data.notes || []);
    } catch (error) {
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
      setNotes(prev => prev.filter(n => n._id !== selectedNote._id));
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete note");
    } finally {
      setShowDeleteModal(false);
      setSelectedNote(null);
    }
  };

  const filteredNotes = useMemo(() => {
    let filtered = [...notes];
    if (searchTerm) {
      filtered = filtered.filter(n =>
        n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    filtered.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    return filtered;
  }, [notes, searchTerm, sortBy]);

  const recentNotes = notes.filter(n => Date.now() - new Date(n.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B14] flex">
        <Sidebar />
        <div className="flex-1 lg:ml-[320px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm">Loading notes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B14] relative overflow-hidden">

      {/* glow blobs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/8 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/8 blur-[180px] rounded-full pointer-events-none" />

      {/* grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />

      <Sidebar />
      <div className="lg:hidden"><MobileBottomNav /></div>

      <div className="relative z-10 lg:ml-[320px] px-4 md:px-8 pt-6 pb-32 lg:pt-10">

        {/* ── HEADER ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.5px" }}>
                My Notes
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {notes.length} note{notes.length !== 1 ? "s" : ""} · {recentNotes} added this week
              </p>
            </div>
            <button
              onClick={() => navigate("/upload")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-px"
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                background: "linear-gradient(135deg,#6366F1,#4F46E5)",
                boxShadow: "0 0 24px rgba(99,102,241,0.35)"
              }}>
              <Plus size={16} />
              <span className="hidden sm:inline">Upload</span>
            </button>
          </div>

          {/* search + sort row */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60 focus-within:border-indigo-500/50 transition-colors">
              <Search size={15} className="text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-600 outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="text-slate-500 hover:text-slate-300">
                  <X size={14} />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-400 text-sm outline-none focus:border-indigo-500/50 transition-colors cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Total notes", value: notes.length, color: "#6366F1" },
            { label: "This week", value: recentNotes, color: "#22D3EE" },
            { label: "Tags", value: new Set(notes.flatMap(n => n.tags || [])).size, color: "#A78BFA" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-4 text-center">
              <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif", color: s.color }}>{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── EMPTY STATE ── */}
        {filteredNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mb-5">
              <Layers3 size={28} className="text-slate-600" />
            </div>
            <h3 className="text-slate-300 font-semibold text-lg mb-2"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              {searchTerm ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">
              {searchTerm ? `No notes match "${searchTerm}"` : "Upload your first note and let AI do the rest."}
            </p>
            {!searchTerm && (
              <button onClick={() => navigate("/upload")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                style={{ background: "linear-gradient(135deg,#6366F1,#4F46E5)" }}>
                <Plus size={15} /> Upload note
              </button>
            )}
          </div>
        )}

        {/* ── NOTES GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <div key={note._id}
              className="group relative rounded-2xl border border-slate-700/50 bg-[#0E1220]/80 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 overflow-hidden">

              {/* hover top shine */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)" }}
              />

              {/* note header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,#6366F1,#4F46E5)" }}>
                  <FileText size={18} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-white text-base truncate"
                    style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                    {note.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(note.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              {/* description */}
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                {note.description || "No description available for this note."}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {note.tags?.length > 0
                  ? note.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
                      #{tag}
                    </span>
                  ))
                  : <span className="text-xs text-slate-600">No tags</span>
                }
              </div>

              {/* action buttons — 2x2 */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button onClick={() => navigate(`/summary/${note._id}`)}
                  className="py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#6366F1,#4F46E5)" }}>
                  Summary
                </button>

                <button onClick={() => navigate(`/chat/${note._id}`)}
                  className="py-2.5 rounded-xl text-xs font-semibold text-emerald-400 border border-emerald-500/20 bg-emerald-500/8 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-1.5">
                  <MessageSquare size={13} /> Chat
                </button>

                <button onClick={() => navigate(`/flashcards/${note._id}`)}
                  className="py-2.5 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/20 bg-cyan-500/8 hover:bg-cyan-500 hover:text-white transition-all">
                  Flashcards
                </button>

                <button onClick={() => navigate(`/quiz/${note._id}`)}
                  className="py-2.5 rounded-xl text-xs font-semibold text-orange-400 border border-orange-500/20 bg-orange-500/8 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-1.5">
                  <Brain size={13} /> Quiz
                </button>
              </div>

              {/* delete */}
              <button onClick={() => openDeleteModal(note)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-red-400 border border-red-500/20 bg-red-500/8 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-1.5">
                <Trash2 size={13} /> Delete note
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── DELETE MODAL ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-700/60 bg-[#0E1220] p-7 text-center">
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(239,68,68,0.5),transparent)" }}
            />
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-red-400" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2"
              style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Delete note?
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              <span className="text-white font-medium">"{selectedNote?.title}"</span> will be permanently deleted. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-700/60 text-slate-300 text-sm font-medium hover:bg-slate-800/50 transition-all">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}