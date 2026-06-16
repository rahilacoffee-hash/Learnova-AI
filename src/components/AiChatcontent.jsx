import React, { useEffect, useRef, useState } from "react";
import { Send, Plus, Sparkles, BookOpen, Bot } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { askAI, getNotes } from "../services/api";

const AiChatContent = () => {
  const { noteId: paramNoteId } = useParams();
  const messagesEndRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(paramNoteId || "");
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      type: "ai",
      text: "👋 Welcome to Learnova AI. Select a study material and ask me anything about your notes.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      const fetchedNotes = res.data.notes || [];
      setNotes(fetchedNotes);

      if (paramNoteId) {
        setSelectedNote(paramNoteId);
      } else if (fetchedNotes.length > 0) {
        setSelectedNote(fetchedNotes[0]._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load notes");
    }
  };

  const handleSendMessage = async () => {
    if (!question.trim()) return;

    if (!selectedNote) {
      toast.error("Please select a study material first");
      return;
    }

    const currentQuestion = question;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: currentQuestion,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      setLoading(true);

      const res = await askAI(selectedNote, currentQuestion);

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        text: res.data.answer || "I couldn't generate a response.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "ai",
          text: "Something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      toast.error("Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: "ai",
        text: "👋 New conversation started. Ask anything about your selected study material.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    toast.success("New chat started");
  };

  const selectedNoteData = notes.find((note) => note._id === selectedNote);

  return (
    <div className="relative min-h-screen">

      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10">

        {/* Mobile New Chat Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">

          {/* ===== NOTES SIDEBAR ===== */}
          <div
            className="
              w-full xl:w-[340px] 2xl:w-[380px]
              rounded-[32px]
              bg-[#0B1020]
              border border-white/10
              backdrop-blur-2xl
              overflow-hidden
              flex flex-col
              h-[40vh] xl:h-[calc(100vh-140px)]
              flex-shrink-0
            "
          >
            {/* Sidebar Header */}
            <div className="p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Study Materials</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {notes.length} note{notes.length !== 1 && "s"} available
                  </p>
                </div>

                <button
                  onClick={handleNewChat}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12 px-6">
                  <BookOpen size={40} className="text-slate-600 mb-4" />
                  <h3 className="text-white font-semibold">No Notes Found</h3>
                  <p className="text-slate-400 text-sm mt-2">
                    Upload study materials to start chatting with Learnova AI.
                  </p>
                </div>
              ) : (
                notes.map((note) => {
                  let isActive = selectedNote === note._id;

                  return (
                    <button
                      key={note._id}
                      onClick={() => setSelectedNote(note._id)}
                      className={`
                        w-full text-left p-4 sm:p-5 rounded-3xl border transition-all duration-300
                        ${isActive
                          ? "bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 border-cyan-400/40 shadow-lg shadow-cyan-500/10"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div
                          className={`
                            w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0
                            ${isActive ? "bg-gradient-to-r from-indigo-600 to-cyan-500" : "bg-white/5"}
                          `}
                        >
                          <BookOpen size={18} className={isActive ? "text-white" : "text-slate-400"} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className={`font-semibold truncate text-sm sm:text-base ${isActive ? "text-white" : "text-slate-200"}`}>
                            {note.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
                            {note.description || "No description available"}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-slate-500">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </span>

                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300">
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Selected Note Footer */}
            {/* {selectedNoteData && (
              <div className="p-4 sm:p-5 border-t border-white/10">
                <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles size={16} className="text-cyan-400" />
                    <span className="font-medium text-white text-sm">Current Context</span>
                  </div>

                  <h4 className="font-semibold text-white truncate text-sm sm:text-base">
                    {selectedNoteData.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2">
                    {selectedNoteData.description || "AI is using this study material for answers."}
                  </p>
                </div>
              </div>
            )} */}
          </div>

          {/* ===== CHAT PANEL ===== */}
          <div
            className="
              flex-1 min-w-0
              rounded-[32px]
              bg-[#0B1020]
              border border-white/10
              backdrop-blur-2xl
              overflow-hidden
              flex flex-col
              h-[60vh] xl:h-[calc(100vh-140px)]
            "
          >
            {/* Chat Header */}
            <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Bot size={22} className="text-white" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold text-white">Learnova AI</h2>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">
                    {selectedNoteData
                      ? `Connected to "${selectedNoteData.title}"`
                      : "Select a study material"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNewChat}
                className="hidden md:flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all text-sm shrink-0"
              >
                <Plus size={16} />
                New Chat
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[92%] sm:max-w-[85%] lg:max-w-[75%]
                      rounded-[24px] sm:rounded-[28px]
                      px-4 sm:px-6 py-4 sm:py-5
                      shadow-lg
                      ${msg.type === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white"
                        : "bg-white/[0.04] border border-white/10 text-slate-200"
                      }
                    `}
                  >
                    {msg.type === "ai" && (
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Sparkles size={14} className="text-cyan-400" />
                        <span className="text-xs sm:text-sm font-semibold text-cyan-400">Learnova AI</span>
                      </div>
                    )}

                    <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                      {msg.text}
                    </p>

                    <span className={`mt-3 block text-xs ${msg.type === "user" ? "text-white/70" : "text-slate-500"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* AI Typing Indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-[24px] sm:rounded-[28px] px-4 sm:px-6 py-4 sm:py-5 bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-cyan-400" />
                      <span className="text-xs sm:text-sm text-slate-400">Learnova AI is thinking...</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 sm:p-6 border-t border-white/10 bg-[#0B1020]/80 backdrop-blur-xl">
              <div className="flex items-end gap-3 sm:gap-4">
                <textarea
                  rows={1}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask anything about your notes..."
                  className="
                    flex-1 resize-none
                    rounded-2xl sm:rounded-3xl
                    bg-white/[0.04] border border-white/10
                    px-4 sm:px-6 py-3 sm:py-4
                    text-sm sm:text-base text-white
                    placeholder:text-slate-500
                    outline-none focus:border-cyan-400/50
                    transition-all
                  "
                />

                <button
                  onClick={handleSendMessage}
                  disabled={loading || !question.trim()}
                  className="
                    w-11 h-11 sm:w-14 sm:h-14 shrink-0
                    rounded-2xl
                    bg-gradient-to-r from-indigo-600 to-cyan-500
                    flex items-center justify-center
                    text-white shadow-lg shadow-cyan-500/20
                    hover:scale-105 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  "
                >
                  <Send size={18} />
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-3 text-center">
                Learnova AI can make mistakes. Verify important information.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AiChatContent;