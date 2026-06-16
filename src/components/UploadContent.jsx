import React, { useState, useEffect } from "react";
import { UploadCloud, FileText } from "lucide-react";

import {
  uploadNote,
  getNotes,
  getAllSummaries,
} from "../services/api";

const UploadContent = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [stats, setStats] = useState({
    notes: 0,
    summaries: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [notesRes, summariesRes] =
        await Promise.all([
          getNotes(),
          getAllSummaries(),
        ]);

      setStats({
        notes: notesRes.data.count || 0,
        summaries: summariesRes.data.count || 0,
      });
    } catch (error) {
      console.log("Stats Error:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!file || !title) {
      setMessage("Title and file are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);

      await uploadNote(formData);

      await fetchStats();

      setMessage("Note uploaded successfully ✅");

      setFile(null);
      setTitle("");
      setDescription("");
      setTags("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="space-y-8 text-black">
    {/* Header */}
    <div>
      <h1 className="text-4xl  font-bold">
        Upload Study Material
      </h1>

      <p className="text-slate-900 mt-2">
        Turn your notes into AI summaries,
        flashcards, quizzes, and study plans.
      </p>
    </div>

    {/* Upload Card */}
    <form
      onSubmit={handleUpload}
      className="
        rounded-[32px]
        bg-[#0B1022]
        border border-white/10
        p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
    >
      {/* Drop Zone */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border-2 border-dashed border-indigo-500/30
          bg-gradient-to-br
          from-indigo-500/5
          to-cyan-500/5
          p-12
          text-center
        "
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-indigo-500/10 blur-[100px] rounded-full" />

          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-cyan-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10">
          <div
            className="
              w-24 h-24
              mx-auto
              rounded-3xl
              bg-indigo-500/10
              flex items-center justify-center
              mb-6
            "
          >
            <UploadCloud
              size={50}
              className="text-indigo-400"
            />
          </div>

          <h2 className="text-2xl text-white font-bold">
            Upload Notes
          </h2>

          <p className="text-slate-400 mt-3 mb-8">
            PDF or TXT files supported
          </p>

          <label
            className="
              inline-flex
              items-center
              gap-2
              px-6 py-3
              rounded-2xl
              bg-gradient-to-r
              from-indigo-600
              to-cyan-500
              text-white
              font-medium
              cursor-pointer
              hover:scale-105
              transition
            "
          >
            Browse Files

            <input
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />
          </label>

          {file && (
            <div
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                px-5 py-3
                rounded-2xl
                bg-green-500/10
                border border-green-500/20
              "
            >
              <FileText
                size={20}
                className="text-green-400"
              />

              <span className="text-green-300">
                {file.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div>
          <label className="text-sm text-slate-400">
            Note Title
          </label>

          <input
            type="text"
            placeholder="Aerodynamics Lecture 3"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              mt-2
              rounded-2xl
              bg-white/5
              border border-white/10
              borde
              px-5 py-4
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:border-indigo-500
            "
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Tags
          </label>

          <input
            type="text"
            placeholder="Physics, Math"
            value={tags}
            onChange={(e) =>
              setTags(e.target.value)
            }
            className="
              w-full
              mt-2
              rounded-2xl
               borde
              bg-white/5
              border border-white/10
              px-5 py-4
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:border-cyan-500
            "
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="text-sm text-slate-400">
          Description
        </label>

        <textarea
          placeholder="Brief description of this study material..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="
            w-full
            h-36
            mt-2
            rounded-2xl
            bg-white/5
            border border-white/10
            p-5
            text-white
            placeholder:text-slate-500
            resize-none
             borde
            focus:outline-none
            focus:border-purple-500
          "
        />
      </div>

      {/* Message */}
      {message && (
        <div
          className="
            mt-6
            rounded-2xl
            bg-indigo-500/10
            border border-indigo-500/20
            px-5 py-4
            text-indigo-300
          "
        >
          {message}
        </div>
      )}

      {/* Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="
            px-8 py-4
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-cyan-500
            font-semibold
            hover:scale-105
            disabled:opacity-50
            transition
          "
        >
          {loading
            ? "Uploading..."
            : "Upload Note"}
        </button>
      </div>
    </form>

    {/* Stats */}
    <div className="grid md:grid-cols-2 gap-6">
      <div
        className="
          rounded-[28px]
          bg-[#0B1022]
          border border-white/10
          p-6
        "
      >
        <p className="text-slate-400">
          Total Notes
        </p>

        <h3 className="text-4xl text-white font-bold mt-3">
          {stats.notes}
        </h3>
      </div>

      <div
        className="
          rounded-[28px]
          bg-[#0B1022]
          border border-white/10
          p-6
        "
      >
        <p className="text-slate-400">
          AI Summaries
        </p>

        <h3 className="text-4xl text-white font-bold mt-3">
          {stats.summaries}
        </h3>
      </div>
    </div>
  </div>
);
};

export default UploadContent;