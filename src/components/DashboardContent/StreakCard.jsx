import React, { useEffect, useState } from "react";
import { Flame, Trophy } from "lucide-react";
import { getStreak } from "../../services/api";

const StreakCard = () => {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    days: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreak();
  }, []);

  const fetchStreak = async () => {
    try {
      const res = await getStreak();

      if (res.data.success) {
        setStreakData(res.data.data);
      }
    } catch (err) {
      console.error("Streak Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-[32px] bg-[#0B1022] p-6 text-white animate-pulse">
        Loading streak...
      </div>
    );
  }

  const {
    currentStreak,
    longestStreak,
    days,
  } = streakData;

  // Show only last 7 days
  const recentDays = days.slice(-7);

  return (
    <div className="rounded-[32px] border border-orange-500/20 bg-[#0B1022] p-6 text-white">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center">
            <Flame
              size={28}
              className="text-orange-400"
            />
          </div>

          <div>
            <h3 className="text-3xl font-bold">
              {currentStreak} Day Streak 🔥
            </h3>

            <p className="text-slate-400">
              Keep studying consistently
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <Trophy
              size={18}
              className="text-yellow-400"
            />

            <span className="font-semibold">
              {longestStreak} Days
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Best Streak
          </p>
        </div>

      </div>

      {/* Week Activity */}
      <div className="mt-10 grid grid-cols-7 gap-3">

        {recentDays.map((day) => (
          <div
            key={day.date}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`
                w-10 h-10 rounded-xl
                flex items-center justify-center
                text-sm font-bold transition-all
                ${
                  day.studied
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-[#131B36] text-slate-500"
                }
              `}
            >
              {day.studied ? "🔥" : "•"}
            </div>

            <span className="text-xs text-slate-400">
              {new Date(day.date).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                }
              )}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default StreakCard;