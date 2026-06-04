import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import { getFlashcardsByNote } from "../services/api";

const FlashcardsPage = () => {
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
      const res =
        await getFlashcardsByNote(noteId);

      setFlashcards(
        res.data.flashcards || []
      );
    } catch (err) {
      console.log(err);
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
      <div className="text-black">
        Loading Flashcards...
      </div>
    );
  }

  if (!flashcards.length) {
    return (
      <div className="text-black">
        No flashcards found.
      </div>
    );
  }

  const card = flashcards[current];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-black">
          Flashcards
        </h1>

        <p className="text-slate-500 mt-2">
          Review and memorize faster
        </p>
      </div>

      {/* Progress */}

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4">
        <div className="flex justify-between mb-3">

          <span className="text-black">
            Card {current + 1} of{" "}
            {flashcards.length}
          </span>

          <span className="text-slate-500">
            {Math.round(
              ((current + 1) /
                flashcards.length) *
                100
            )}
            %
          </span>

        </div>

        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500"
            style={{
              width: `${
                ((current + 1) /
                  flashcards.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Card */}

      <div
        onClick={() =>
          setFlipped(!flipped)
        }
        className="
          min-h-[400px]
          cursor-pointer
          bg-white/70
          backdrop-blur-xl
          rounded-3xl
          shadow-xl
          border border-white/40
          flex items-center
          justify-center
          p-10
          text-center
          transition-all
          hover:scale-[1.01]
        "
      >
        <div>
          <p className="text-sm text-slate-500 mb-4">
            {flipped
              ? "Answer"
              : "Question"}
          </p>

          <h2 className="text-3xl font-bold text-black leading-relaxed">
            {flipped
              ? card.back
              : card.front}
          </h2>

          <p className="mt-8 text-indigo-600">
            Click card to flip
          </p>
        </div>
      </div>

      {/* Controls */}

      <div className="flex justify-center gap-4">

        <button
          onClick={prevCard}
          disabled={current === 0}
          className="
            bg-white/70
            backdrop-blur-xl
            p-4
            rounded-2xl
            shadow
          "
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() =>
            setFlipped(!flipped)
          }
          className="
            bg-indigo-600
            text-white
            px-8
            rounded-2xl
            flex items-center gap-2
          "
        >
          <RotateCcw size={18} />
          Flip
        </button>

        <button
          onClick={nextCard}
          disabled={
            current ===
            flashcards.length - 1
          }
          className="
            bg-white/70
            backdrop-blur-xl
            p-4
            rounded-2xl
            shadow
          "
        >
          <ChevronRight />
        </button>

      </div>

    </div>
  );
};

export default FlashcardsPage;