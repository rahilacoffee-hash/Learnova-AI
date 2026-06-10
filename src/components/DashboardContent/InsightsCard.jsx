import React, {
  useEffect,
  useState,
} from "react";

import {
  TrendingDown,
  TrendingUp,
  Clock,
  ChevronRight,
  Brain,
} from "lucide-react";

import {
  getQuizAnalytics,
  getStreak,
} from "../../services/api";

const InsightsCard = () => {
  const [insights, setInsights] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const [
        quizRes,
        streakRes,
      ] = await Promise.all([
        getQuizAnalytics(),
        getStreak(),
      ]);

      const quiz =
        quizRes.data.data;

      const streak =
        streakRes.data.data;

      const generatedInsights =
        [];

      /* Average score */
      if (
        quiz.averageScore >= 75
      ) {
        generatedInsights.push({
          icon: TrendingUp,
          color:
            "bg-green-500/20",
          iconColor:
            "text-green-400",
          text: `Your average quiz score improved to ${quiz.averageScore}%`,
        });
      } else {
        generatedInsights.push({
          icon: TrendingDown,
          color:
            "bg-red-500/20",
          iconColor:
            "text-red-400",
          text: `Your average score is ${quiz.averageScore}%. Consider reviewing difficult topics.`,
        });
      }

      /* Streak */
      generatedInsights.push({
        icon: Brain,
        color:
          "bg-cyan-500/20",
        iconColor:
          "text-cyan-400",
        text: `You're currently on a ${streak.currentStreak}-day study streak.`,
      });

      /* Recommendation */
      if (
        quiz.completed > 0
      ) {
        generatedInsights.push({
          icon: Clock,
          color:
            "bg-purple-500/20",
          iconColor:
            "text-purple-400",
          text: `Complete another quiz today to strengthen retention.`,
        });
      } else {
        generatedInsights.push({
          icon: Clock,
          color:
            "bg-purple-500/20",
          iconColor:
            "text-purple-400",
          text: `Take your first quiz to unlock AI insights.`,
        });
      }

      setInsights(
        generatedInsights
      );
    } catch (error) {
      console.error(
        "Insights Error:",
        error
      );

      setInsights([
        {
          icon: Brain,
          color:
            "bg-blue-500/20",
          iconColor:
            "text-blue-400",
          text: "Continue studying to unlock personalized insights.",
        },
      ]);
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
        Loading insights...
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
        <h2 className="text-xl font-bold">
          AI Learning Insights
        </h2>

        <span className="text-cyan-400 text-sm">
          Live Data
        </span>
      </div>

      <div className="space-y-6 mt-8">
        {insights.map(
          (
            insight,
            index
          ) => {
            const Icon =
              insight.icon;

            return (
              <div
                key={index}
                className="flex gap-4"
              >
                <div
                  className={`
                    w-12 h-12
                    rounded-2xl
                    flex items-center justify-center
                    ${insight.color}
                  `}
                >
                  <Icon
                    className={
                      insight.iconColor
                    }
                  />
                </div>

                <p className="text-slate-300 leading-relaxed">
                  {insight.text}
                </p>
              </div>
            );
          }
        )}
      </div>

   
    </div>
  );
};

export default InsightsCard;