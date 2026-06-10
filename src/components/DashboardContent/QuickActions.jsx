import React, {
  useEffect,
  useState,
} from "react";

import {
  Upload,
  FileText,
  Layers3,
  Pencil,
  Brain,
  ArrowUpRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getDashboard,
} from "../../services/api";

const QuickActions = () => {
  const navigate = useNavigate();

  const [actions, setActions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations =
    async () => {
      try {
        const res =
          await getDashboard();

        const {
          overview,
          averageScore,
        } = res.data.data;

        const recommended =
          [];

        /*
         * Step 1
         */
        if (
          overview.notes === 0
        ) {
          recommended.push({
            title:
              "Upload Notes",

            subtitle:
              "Start learning by uploading study materials.",

            icon: Upload,

            color:
              "text-purple-400",

            path: "/upload",
          });
        }

        /*
         * Step 2
         */
        if (
          overview.notes >
            0 &&
          overview.summaries ===
            0
        ) {
          recommended.push({
            title:
              "Generate Summary",

            subtitle:
              "Convert your notes into concise summaries.",

            icon: FileText,

            color:
              "text-blue-400",

            path: "/notes",
          });
        }

        /*
         * Step 3
         */
        if (
          overview.summaries >
            0 &&
          overview.flashcards ===
            0
        ) {
          recommended.push({
            title:
              "Create Flashcards",

            subtitle:
              "Boost retention with active recall.",

            icon: Layers3,

            color:
              "text-green-400",

            path:
              "/flashcards",
          });
        }

        /*
         * Step 4
         */
        if (
          overview.flashcards >
          0
        ) {
          recommended.push({
            title:
              "Take Quiz",

            subtitle:
              "Test your understanding.",

            icon: Pencil,

            color:
              "text-orange-400",

            path: "/quiz",
          });
        }

        /*
         * Step 5
         */
        if (
          averageScore < 70 &&
          averageScore > 0
        ) {
          recommended.push({
            title:
              "Review Weak Areas",

            subtitle: `Your average score is ${averageScore}%.`,

            icon: Brain,

            color:
              "text-red-400",

            path:
              "/analytics",
          });
        }

        /*
         * Default state
         */
        if (
          recommended.length ===
          0
        ) {
          recommended.push({
            title:
              "Keep Learning",

            subtitle:
              "You're doing great. Continue your study streak.",

            icon: Brain,

            color:
              "text-cyan-400",

            path:
              "/dashboard",
          });
        }

        setActions(
          recommended
        );
      } catch (err) {
        console.error(
          "Recommendations Error:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div
        className="
          rounded-[32px]
          bg-[#0B1022]
          p-6
          text-white
        "
      >
        Loading AI recommendations...
      </div>
    );
  }

  return (
    <div
      className="
        rounded-[32px]
        bg-[#0B1022]
        p-6
        text-white
      "
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold">
            AI Recommendations
          </h2>

          <p className="text-sm text-slate-400">
            Personalized next steps
          </p>
        </div>

        <span className="text-cyan-400 text-sm">
          Smart Learning
        </span>
      </div>

      <div className="space-y-4">
        {actions.map(
          (action) => {
            const Icon =
              action.icon;

            return (
              <button
                key={
                  action.title
                }
                onClick={() =>
                  navigate(
                    action.path
                  )
                }
                className="
                  w-full
                  p-5
                  rounded-3xl
                  bg-white/5
                  border
                  border-white/5
                  hover:bg-white/10
                  transition-all
                  text-left
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="flex gap-4">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-white/5
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon
                      size={28}
                      className={
                        action.color
                      }
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {
                        action.title
                      }
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      {
                        action.subtitle
                      }
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-slate-500"
                />
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default QuickActions;