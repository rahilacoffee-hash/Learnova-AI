import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Brain,
} from "lucide-react";

import {
  getFlashcardsByNote,
  generateFlashcards,
} from "../services/api";

const Flashcardscontent = () => {
  const { noteId } = useParams();

  const [flashcards, setFlashcards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

 const fetchCards = async () => {
  try {
    let res;

    try {
      // Get existing flashcards
      res = await getFlashcardsByNote(noteId);
    } catch (err) {
      // Generate if none exist
      if (err.response?.status === 404) {
        console.log("No flashcards found. Generating...");

        await generateFlashcards(noteId);

        res = await getFlashcardsByNote(noteId);
      } else {
        throw err;
      }
    }

    console.log("Flashcard Response:", res.data);

    let cards = res.data?.flashcard?.cards || [];

    // Handle JSON string response
    if (typeof cards === "string") {
      try {
        cards = JSON.parse(cards);
      } catch (e) {
        console.error("Failed to parse cards:", e);
        cards = [];
      }
    }

    // Ensure cards is always an array
    if (!Array.isArray(cards)) {
      cards = [];
    }

    setFlashcards(cards);
  } catch (err) {
    console.error("Flashcard Error:", err);

    setFlashcards([]);
  } finally {
    setLoading(false);
  }
};

  const nextCard = () => {
    if (current < flashcards.length - 1) {
      setCurrent(current + 1);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setFlipped(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-black">
            Flashcards
          </h1>

          <p className="text-slate-500 mt-2">
            Preparing your study cards...
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 text-center shadow-xl">
          <Brain
            size={60}
            className="mx-auto text-indigo-600 animate-pulse mb-4"
          />

          <h2 className="text-xl font-semibold text-black">
            Generating Flashcards...
          </h2>
        </div>
      </div>
    );
  }

  if (!flashcards.length) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-black">
          No Flashcards Available
        </h2>

        <p className="text-slate-500 mt-3">
          AI could not generate flashcards for this note.
        </p>
      </div>
    );
  }

  const card = flashcards[current];

return (
  <div className="w-full">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-black">
        Flashcards
      </h1>

      <p className="text-slate-500 mt-2">
        Learn faster with active recall
      </p>
    </div>

    {/* Progress */}
    <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
      <div className="flex justify-between mb-3">
        <span className="font-medium text-black">
          Card {current + 1} of {flashcards.length}
        </span>

        <span className="text-slate-500">
          {Math.round(
            ((current + 1) / flashcards.length) * 100
          )}
          %
        </span>
      </div>

      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-500"
          style={{
            width: `${((current + 1) / flashcards.length) * 100}%`,
          }}
        />
      </div>
    </div>

    {/* Card */}
    <div
      onClick={() => setFlipped(!flipped)}
      className="
        min-h-[450px]
        bg-white
        rounded-3xl
        shadow-sm
        flex
        items-center
        justify-center
        text-center
        px-6
        md:px-12
        cursor-pointer
      "
    >
      <div className="max-w-4xl">
        <p className="uppercase text-xs tracking-wider text-indigo-600 mb-5">
          {flipped ? "Answer" : "Question"}
        </p>

        <h2 className="text-2xl md:text-4xl font-bold text-black leading-relaxed">
          {flipped ? card.back : card.front}
        </h2>

        <p className="mt-8 text-slate-500">
          Click anywhere to flip
        </p>
      </div>
    </div>

    {/* Controls */}
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={prevCard}
        disabled={current === 0}
        className="
          bg-white
          p-4
          rounded-2xl
          shadow-sm
          disabled:opacity-40
        "
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => setFlipped(!flipped)}
        className="
          bg-gradient-to-r
          from-indigo-600
          to-cyan-500
          text-white
          px-8
          py-4
          rounded-2xl
          flex
          items-center
          gap-2
        "
      >
        <RotateCcw size={18} />
        Flip Card
      </button>

      <button
        onClick={nextCard}
        disabled={current === flashcards.length - 1}
        className="
          bg-white
          p-4
          rounded-2xl
          shadow-sm
          disabled:opacity-40
        "
      >
        <ChevronRight />
      </button>
    </div>
  </div>
);
};

export default Flashcardscontent;