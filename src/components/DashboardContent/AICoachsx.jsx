import React from "react";
import { Sparkles } from "lucide-react";

const AICoach = () => {
  return (
    <div
      className="
        rounded-[32px]
        bg-[#0B1022]
        p-6
        text-white
      "
    >
      <div className="flex justify-between">

        <div className="flex items-center gap-2">

          <Sparkles className="text-purple-400" />

          <h2 className="text-xl font-bold">
            Learnova AI Coach
          </h2>

        </div>

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-purple-500/10
            flex
            items-center
            justify-center
          "
        >
          ✨
        </div>

      </div>

      <div className="mt-8">

        <p className="text-slate-300 leading-relaxed">
          You performed better in GST111
          this week! 📈
        </p>

        <p className="mt-6 text-slate-400 leading-relaxed">
          Based on your study patterns,
          reviewing Thermodynamics
          tonight could improve your
          retention score.
        </p>

      </div>

      <button
        className="
          mt-8
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          py-4
          font-semibold
        "
      >
        View Study Plan
      </button>

    </div>
  );
};

export default AICoach;