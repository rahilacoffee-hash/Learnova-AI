import React, {
  useEffect,
  useState,
} from "react";

import {
  Sparkles,
  ArrowRight,
  Brain,
  Upload,
  FileText,
  Layers3,
  Pencil,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getDashboard,
} from "../../services/api";

const AICoach = () => {
  const navigate =
    useNavigate();

  const [coach, setCoach] =
    useState({
      title:
        "Loading recommendations...",
      recommendation: "",
      action: "/dashboard",
      icon: Brain,
      buttonText:
        "Loading...",
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCoach();
  }, []);

  const fetchCoach =
    async () => {
      try {
        const res =
          await getDashboard();

        const {
          overview,
          averageScore,
        } = res.data.data;

        // No notes
        if (
          overview.notes === 0
        ) {
          setCoach({
            title:
              "Start Your Journey 🚀",

            recommendation:
              "Upload your first study notes so Learnova can begin helping you.",

            action:
              "/upload",

            icon: Upload,

            buttonText:
              "Upload Notes",
          });
        }

        // Notes but no summaries
        else if (
          overview.notes >
            0 &&
          overview.summaries ===
            0
        ) {
          setCoach({
            title:
              "Generate Summaries 📚",

            recommendation:
              "Transform your notes into concise summaries to save revision time.",

            action:
              "/notes",

            icon: FileText,

            buttonText:
              "Generate Summary",
          });
        }

        // Summaries but no flashcards
        else if (
          overview.summaries >
            0 &&
          overview.flashcards ===
            0
        ) {
          setCoach({
            title:
              "Boost Retention 🧠",

            recommendation:
              "Create flashcards to strengthen memory using active recall.",

            action:
              "/flashcards",

            icon: Layers3,

            buttonText:
              "Create Flashcards",
          });
        }

        // Low quiz score
        else if (
          averageScore <
            70 &&
          averageScore > 0
        ) {
          setCoach({
            title:
              "Review Weak Areas ⚠️",

            recommendation: `Your average quiz score is ${averageScore}%. Focus on topics you struggle with.`,

            action:
              "/analytics",

            icon: Brain,

            buttonText:
              "View Analysis",
          });
        }

        // User is progressing well
        else {
          setCoach({
            title:
              "Ready for a Challenge? 🔥",

            recommendation:
              "You're making excellent progress. Test your knowledge with a new quiz.",

            action:
              "/quiz",

            icon: Pencil,

            buttonText:
              "Take Quiz",
          });
        }
      } catch (err) {
        console.error(
          "AI Coach Error:",
          err
        );

        setCoach({
          title:
            "Learnova AI Coach",

          recommendation:
            "Continue your study streak today.",

          action:
            "/dashboard",

          icon: Brain,

          buttonText:
            "Go to Dashboard",
        });
      } finally {
        setLoading(false);
      }
    };

  const Icon =
    coach.icon;

  return (
    <div
      className="
        rounded-[32px]
        bg-[#0B1022]
        border border-white/5
        p-6
        text-white
        shadow-xl
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Sparkles className="text-purple-400" />

          <h2 className="text-xl font-bold">
            Learnova AI Coach
          </h2>
        </div>

        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-purple-500/10
            flex
            items-center
            justify-center
          "
        >
          <Icon
            className="text-purple-400"
            size={22}
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-8">
        {loading ? (
          <div>
            <p className="text-slate-300 animate-pulse">
              Analyzing your learning patterns...
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold">
              {coach.title}
            </h3>

            <p
              className="
                mt-6
                text-slate-300
                leading-relaxed
              "
            >
              {
                coach.recommendation
              }
            </p>
          </>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() =>
          navigate(
            coach.action
          )
        }
        disabled={loading}
        className="
          mt-8
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          py-4
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          hover:opacity-90
          transition
          disabled:opacity-50
        "
      >
        {coach.buttonText}

        {!loading && (
          <ArrowRight
            size={18}
          />
        )}
      </button>
    </div>
  );
};

export default AICoach;