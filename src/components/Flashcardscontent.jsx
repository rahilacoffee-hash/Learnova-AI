import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, RotateCcw, Brain, Layers3 } from "lucide-react";
import { getFlashcardsByNote, generateFlashcards } from "../services/api";

export default function Flashcardscontent() {
  const { noteId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  useEffect(() => { fetchCards(); }, []);

  const fetchCards = async () => {
    try {
      let res;
      try {
        res = await getFlashcardsByNote(noteId);
      } catch (err) {
        if (err.response?.status === 404) {
          await generateFlashcards(noteId);
          res = await getFlashcardsByNote(noteId);
        } else throw err;
      }
      let cards = res.data?.flashcard?.cards || [];
      if (typeof cards === "string") {
        try { cards = JSON.parse(cards); } catch { cards = []; }
      }
      if (!Array.isArray(cards)) cards = [];
      setFlashcards(cards);
    } catch (err) {
      console.error("Flashcard Error:", err);
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setFlipped(false);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 200);
  };

  const nextCard = () => { if (current < flashcards.length - 1) goTo(current + 1); };
  const prevCard = () => { if (current > 0) goTo(current - 1); };

  const handleFlip = () => {
    if (animating) return;
    setFlipped(!flipped);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.5px" }}>
            Flashcards
          </h1>
          <p className="text-slate-500 mt-2 text-sm">Preparing your study cards...</p>
        </div>
        <div className="rounded-2xl border border-slate-700/50 bg-[#0E1220]/80 p-14 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
            <Brain size={28} className="text-indigo-400 animate-pulse" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            Generating flashcards...
          </h2>
          <p className="text-slate-500 text-sm">AI is building your study deck</p>
        </div>
      </div>
    );
  }

  if (!flashcards.length) {
    return (
      <div className="rounded-2xl border border-slate-700/50 bg-[#0E1220]/80 p-14 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mx-auto mb-5">
          <Layers3 size={28} className="text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2"
          style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          No flashcards available
        </h2>
        <p className="text-slate-500 text-sm">AI could not generate flashcards for this note.</p>
      </div>
    );
  }

  const card = flashcards[current];
  const progress = ((current + 1) / flashcards.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white"
          style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.5px" }}>
          Flashcards
        </h1>
        <p className="text-slate-500 mt-1 text-sm">Learn faster with active recall</p>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-slate-700/50 bg-[#0E1220]/80 p-5 mb-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-slate-300"
            style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
            Card {current + 1} <span className="text-slate-600">/ {flashcards.length}</span>
          </span>
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg,#6366F1,#22D3EE)"
            }}
          />
        </div>

        {/* dot indicators — show up to 10 */}
        {flashcards.length <= 20 && (
          <div className="flex gap-1.5 justify-center mt-4 flex-wrap">
            {flashcards.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-indigo-400 scale-125"
                    : i < current
                    ? "bg-indigo-500/40"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── FLIP CARD ── */}
      <div
        onClick={handleFlip}
        className="relative cursor-pointer select-none mb-5"
        style={{ perspective: "1200px", height: 340 }}
      >
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-2xl border border-slate-700/50 bg-[#0E1220]/90 flex flex-col items-center justify-center p-8 text-center overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* top shine */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)" }}
            />
            {/* bg glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.08),transparent 70%)" }}
            />

            <div className="relative z-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full mb-6">
                Question
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                {card.front}
              </h2>
              <p className="text-slate-600 text-xs mt-8 flex items-center gap-1.5 justify-center">
                <RotateCcw size={11} /> Click to reveal answer
              </p>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-2xl border border-cyan-500/25 bg-[#0A1020]/90 flex flex-col items-center justify-center p-8 text-center overflow-hidden"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(34,211,238,0.6),transparent)" }}
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(34,211,238,0.07),transparent 70%)" }}
            />

            <div className="relative z-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-6">
                Answer
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed"
                style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                {card.back}
              </h2>
              <p className="text-slate-600 text-xs mt-8 flex items-center gap-1.5 justify-center">
                <RotateCcw size={11} /> Click to flip back
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">

        <button onClick={prevCard} disabled={current === 0}
          className="w-12 h-12 rounded-xl border border-slate-700/60 bg-slate-800/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronLeft size={20} />
        </button>

        <button onClick={handleFlip}
          className="flex-1 h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-px"
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            background: "linear-gradient(135deg,#6366F1,#4F46E5)",
            boxShadow: "0 0 24px rgba(99,102,241,0.3)"
          }}>
          <RotateCcw size={15} />
          {flipped ? "Show question" : "Flip card"}
        </button>

        <button onClick={nextCard} disabled={current === flashcards.length - 1}
          className="w-12 h-12 rounded-xl border border-slate-700/60 bg-slate-800/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* keyboard hint */}
      <p className="text-center text-xs text-slate-600 mt-4">
        Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-500 font-mono text-xs">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-500 font-mono text-xs">→</kbd> to navigate · <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-500 font-mono text-xs">Space</kbd> to flip
      </p>

      {/* keyboard support */}
      <KeyboardHandler
        onLeft={prevCard}
        onRight={nextCard}
        onSpace={handleFlip}
      />
    </div>
  );
}

function KeyboardHandler({ onLeft, onRight, onSpace }) {
  useEffect(() => {
    let handler = (e) => {
      if (e.key === "ArrowLeft") onLeft();
      if (e.key === "ArrowRight") onRight();
      if (e.key === " ") { e.preventDefault(); onSpace(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onLeft, onRight, onSpace]);
  return null;
}