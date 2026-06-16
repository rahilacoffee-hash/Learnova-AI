import React, { useEffect, useState } from "react";
import {
  FileText,
  Layers3,
  FileCheck,
  Brain,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { getActivity } from "../../services/api";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const res = await getActivity();
      setActivities(res.data.data || []);
    } catch (error) {
      console.error("Activity Error:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "note":
        return {
          Icon: FileText,
          color: "text-blue-400",
        };

      case "summary":
        return {
          Icon: FileCheck,
          color: "text-emerald-400",
        };

      case "flashcard":
        return {
          Icon: Layers3,
          color: "text-fuchsia-400",
        };

      case "quiz":
        return {
          Icon: Brain,
          color: "text-orange-400",
        };

      default:
        return {
          Icon: FileText,
          color: "text-slate-400",
        };
    }
  };

  const handleNext = () => {
    if (
      startIndex + ITEMS_PER_PAGE <
      activities.length
    ) {
      setStartIndex(
        startIndex + ITEMS_PER_PAGE
      );
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(
        startIndex - ITEMS_PER_PAGE
      );
    }
  };

  const visibleActivities =
    activities.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  if (loading) {
    return (
      <div className="rounded-[32px] bg-[#0B1022] p-6 text-white">
        Loading activity...
      </div>
    );
  }

  return (
    <div className="rounded-[32px] bg-[#0B1022] p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>

        <div className="flex items-center gap-3">
         

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="
                w-9 h-9 rounded-xl
                bg-white/5
                hover:bg-white/10
                flex items-center justify-center
                disabled:opacity-30
                transition
              "
            >
              <ChevronUp size={18} />
            </button>

            <button
              onClick={handleNext}
              disabled={
                startIndex +
                  ITEMS_PER_PAGE >=
                activities.length
              }
              className="
                w-9 h-9 rounded-xl
                bg-white/5
                hover:bg-white/10
                flex items-center justify-center
                disabled:opacity-30
                transition
              "
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Activities */}
      {visibleActivities.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No recent activity found.
        </div>
      ) : (
        <div className="space-y-6">
          {visibleActivities.map(
            (activity, index) => {
              const {
                Icon,
                color,
              } = getIcon(
                activity.type
              );

              return (
                <div
                  key={`${activity.createdAt}-${index}`}
                  className="flex items-start gap-4"
                >
                  <div
                    className="
                      w-12 h-12 rounded-2xl
                      bg-white/5
                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <Icon
                      className={color}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">
                      {activity.title}
                    </h4>

                    <p className="text-sm text-slate-400">
                      {new Date(
                        activity.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

      {/* Footer */}
      {activities.length > 0 && (
        <div className="mt-8 text-center text-sm text-slate-500">
          Showing{" "}
          {startIndex + 1}
          –
          {Math.min(
            startIndex +
              ITEMS_PER_PAGE,
            activities.length
          )}{" "}
          of {activities.length}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;