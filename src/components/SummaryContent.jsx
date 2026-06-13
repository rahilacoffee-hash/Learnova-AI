import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { generateSummary } from "../services/api";

import { ArrowLeft, BookOpen, Brain, Sparkles } from "lucide-react";

const SummaryPage = () => {
  const { noteId } = useParams();

  const [summary, setSummary] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await generateSummary(noteId);

      const data = res.data.summary;

      if (typeof data === "object") {
        setSummary(data);
      } else {
        const lines = data.split("\n").filter((l) => l.trim());

        const points = lines.filter(
          (l) => l.trim().startsWith("-") || l.trim().startsWith("•"),
        );

        const prose = lines.filter(
          (l) => !l.trim().startsWith("-") && !l.trim().startsWith("•"),
        );

        setSummary({
          overview: prose.join(" "),
          keyPoints: points.map((p) => p.replace(/^[-•]\s*/, "")),
        });
      }

      setNoteTitle(res.data.noteTitle);
    } catch (err) {
      console.log(err);
      setError("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl">
          <Sparkles
            className="animate-pulse text-indigo-600 mx-auto mb-4"
            size={40}
          />
          <p className="text-slate-600">Generating AI Summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-32 left-96 w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-10">
        {/* Back */}
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Notes
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
            <Brain size={16} />
            Learnova AI Summary
          </div>

          <h1 className="text-4xl font-bold text-slate-900">{noteTitle}</h1>

          <p className="text-slate-500 mt-2">
            Smart breakdown of your study material
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl mb-6">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
            <BookOpen className="text-indigo-600 mb-3" size={28} />
            <p className="text-slate-500">Key Points</p>
            <h2 className="text-3xl font-bold text-slate-900">
              {summary?.keyPoints?.length || 0}
            </h2>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
            <Brain className="text-cyan-600 mb-3" size={28} />
            <p className="text-slate-500">Summary Type</p>
            <h2 className="text-xl font-bold text-slate-900">AI Generated</h2>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg">
            <Sparkles className="text-purple-600 mb-3" size={28} />
            <p className="text-slate-500">Study Ready</p>
            <h2 className="text-xl font-bold text-slate-900">Yes</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-2xl transition ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white/70 backdrop-blur-xl text-slate-600"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("keypoints")}
            className={`px-6 py-3 rounded-2xl transition ${
              activeTab === "keypoints"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white/70 backdrop-blur-xl text-slate-600"
            }`}
          >
            Key Points
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8">
          {activeTab === "overview" ? (
            <div className="prose max-w-none">
              <p className="text-slate-700 text-lg leading-9">
                {summary?.overview || "No overview available"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {summary?.keyPoints?.length ? (
                summary.keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-slate-50 rounded-2xl"
                  >
                    <div className="w-3 h-3 rounded-full bg-indigo-600 mt-2" />

                    <p className="text-slate-700">{point}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No key points available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
