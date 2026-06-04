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
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Upload Notes
        </h1>

        <p className="text-slate-500 mt-2">
          Upload study materials and let AI create
          summaries, quizzes and flashcards instantly.
        </p>
      </div>

      {/* Upload Card */}
      <form
        onSubmit={handleUpload}
        className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8"
      >
        <div className="border-2 border-dashed border-indigo-300 rounded-3xl p-12 text-center bg-gradient-to-br from-indigo-50 to-cyan-50">
          <UploadCloud
            size={70}
            className="mx-auto text-indigo-600 mb-4"
          />

          <h2 className="text-xl font-semibold text-black mb-2">
            Drag & Drop Notes
          </h2>

          <p className="text-slate-500 mb-6">
            PDF or TXT files supported
          </p>

          <label className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl cursor-pointer transition">
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
            <div className="mt-6 flex justify-center items-center gap-2 text-green-600">
              <FileText size={18} />
              {file.name}
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="bg-white border border-slate-200 rounded-xl p-4 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Tags (Physics, Math)"
            value={tags}
            onChange={(e) =>
              setTags(e.target.value)
            }
            className="bg-white border border-slate-200 rounded-xl p-4 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full mt-6 h-32 bg-white border border-slate-200 rounded-xl p-4 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {message && (
          <div className="mt-4 text-center text-indigo-600 font-medium">
            {message}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 transition"
          >
            {loading
              ? "Uploading..."
              : "Upload Note"}
          </button>
        </div>
      </form>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
          <h3 className="text-slate-500">
            Files Uploaded
          </h3>

          <p className="text-3xl font-bold text-black mt-2">
            {stats.notes}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
          <h3 className="text-slate-500">
            AI Summaries
          </h3>

          <p className="text-3xl font-bold text-black mt-2">
            {stats.summaries}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;