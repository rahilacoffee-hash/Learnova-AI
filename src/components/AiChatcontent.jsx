import React, { useState, useEffect } from "react";
import { askAI, getNotes } from "../services/api";
import {
  Send,
  Plus,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useParams } from "react-router-dom";

const AiChatContent = () => {
  const { noteId: paramNoteId } = useParams();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(
    paramNoteId || ""
  );

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "👋 Hello! Ask me anything about your uploaded notes.",
      time: "Now",
    },
  ]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();

      setNotes(res.data.notes);

      if (!paramNoteId && res.data.notes.length > 0) {
        setSelectedNote(res.data.notes[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = async () => {
    if (!question.trim()) return;

    if (!selectedNote) {
      alert("Please select a note first");
      return;
    }

    const userMessage = {
      type: "user",
      text: question,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;
    setQuestion("");

    try {
      setLoading(true);

      const res = await askAI(
        selectedNote,
        currentQuestion
      );

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: res.data.answer,
          time: "Now",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Something went wrong. Please try again.",
          time: "Now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        type: "ai",
        text: "👋 New chat started. Ask anything about your notes.",
        time: "Now",
      },
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold text-slate-900">
            AI Study Assistant
          </h1>

          <p className="text-slate-500 mt-2">
            Chat with AI using your uploaded notes
          </p>
        </div>

        <button
          onClick={handleNewChat}
          className="
            flex items-center gap-2
            px-6 py-3
            rounded-2xl
            text-white
            bg-gradient-to-r
            from-fuchsia-600
            to-cyan-500
            shadow-lg
            hover:scale-105
            transition
          "
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Note Selector */}
      <div
        className="
          bg-white
          rounded-[30px]
          p-6
          shadow-xl
          border border-white/40
        "
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen
            size={18}
            className="text-fuchsia-600"
          />

          <span className="font-semibold text-slate-900">
            Select Study Material
          </span>
        </div>

        <select
          value={selectedNote}
          onChange={(e) =>
            setSelectedNote(e.target.value)
          }
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            text-black
            outline-none
            focus:ring-2
            focus:ring-fuchsia-500
          "
        >
          <option value="">
            Choose a Note
          </option>

          {notes.map((note) => (
            <option
              key={note._id}
              value={note._id}
            >
              {note.title}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Container */}
      <div
        className="
          bg-white
          rounded-[30px]
          shadow-xl
          border border-white/40
          overflow-hidden
          
        "
      >
        {/* Chat Header */}
        <div className="flex items-center gap-2 p-6 border-b border-slate-200">
          <Sparkles
            size={18}
            className="text-fuchsia-600"
          />

          <h2 className="font-semibold text-slate-900">
            AI Conversation
          </h2>
        </div>

        {/* Messages */}
        <div
          className="
            h-[calc(100vh-380px)]
            min-h-[450px]
            max-h-[650px]
            overflow-y-auto
            p-6
            space-y-5
          "
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`
                  max-w-[80%]
                  rounded-3xl
                  px-5
                  py-4
                  shadow-sm
                  ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white"
                      : "bg-slate-50 text-black border border-slate-200"
                  }
                `}
              >
                <p className="whitespace-pre-wrap">
                  {msg.text}
                </p>

                <span className="text-xs opacity-70 mt-2 block">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-600 px-5 py-3 rounded-2xl">
                AI is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleSendMessage()
              }
              placeholder="Ask a question about your notes..."
              className="
                flex-1
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                bg-white
                text-black
                placeholder:text-slate-400
                focus:outline-none
                focus:ring-2
                focus:ring-fuchsia-500
              "
            />

            <button
              onClick={handleSendMessage}
              className="
                p-4
                rounded-2xl
                text-white
                bg-gradient-to-r
                from-fuchsia-600
                to-cyan-500
                shadow-lg
                hover:scale-105
                transition
              "
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        
      </div>
        <br/>
        <br/>
      
    </div>
  );
};

export default AiChatContent;