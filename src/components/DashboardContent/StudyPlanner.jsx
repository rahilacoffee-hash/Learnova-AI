import React, {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getPlanner,
} from "../../services/api";

const StudyPlanner = () => {
  const navigate =
    useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchPlanner();
  }, []);

  const fetchPlanner =
    async () => {
      try {
        const res =
          await getPlanner();

        setTasks(
          res.data.data || []
        );
      } catch (error) {
        console.log(
          "Planner Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="rounded-[32px] bg-[#0B1022] p-6 text-white">
        Loading study plan...
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
      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold">
            Today's Plan
          </h2>

          <p className="text-slate-400">
            AI-powered recommendations
          </p>
        </div>

        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-cyan-500/10
            flex
            items-center
            justify-center
          "
        >
          <Calendar
            className="text-cyan-400"
          />
        </div>

      </div>

      <div className="space-y-4 mt-8">

        {tasks.map(
          (task, index) => (
            <button
              key={index}
              onClick={() =>
                navigate(
                  task.action
                )
              }
              className="
                w-full
                bg-white/5
                hover:bg-white/10
                rounded-2xl
                p-5
                flex
                justify-between
                items-center
                transition
              "
            >

              <div className="text-left">

                <h4 className="font-semibold">
                  {task.title}
                </h4>

                <p className="text-sm text-slate-400">
                  {task.duration}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    ${
                      task.priority ===
                      "High"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority ===
                          "Medium"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-green-500/20 text-green-400"
                    }
                  `}
                >
                  {task.priority}
                </span>

                <ArrowRight
                  size={18}
                />

              </div>

            </button>
          )
        )}

      </div>
    </div>
  );
};

export default StudyPlanner;