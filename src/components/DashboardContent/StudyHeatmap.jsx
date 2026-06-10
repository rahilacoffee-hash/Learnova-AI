import React, { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { getHeatmap } from "../../services/api";

const StudyHeatmap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeatmap();
  }, []);

  const fetchHeatmap = async () => {
    try {
      setLoading(true);

      const res = await getHeatmap();

      console.log("Heatmap Response:", res.data);

      const backendData = res.data?.data || [];

      const formatted = backendData.map((item) => ({
        date: item.date,
        count: item.count,
        level: Math.min(item.count, 4),
      }));

      setData(formatted);
    } catch (err) {
      console.error("Heatmap Error:", err);

      setData([]);
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
          shadow-xl
        "
      >
        <h2 className="text-xl font-bold mb-4">
          Study Activity
        </h2>

        <div className="animate-pulse">
          <div className="h-32 rounded-xl bg-white/10" />
        </div>
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
        shadow-xl
      "
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">
            Study Activity
          </h2>

          <p className="text-sm text-slate-400">
            Last 30 days
          </p>
        </div>

        <span
          className="
            text-xs
            px-3
            py-1
            rounded-full
            bg-indigo-500/20
            text-indigo-300
          "
        >
          Live Data
        </span>
      </div>

      {data.length > 0 ? (
        <ActivityCalendar
          data={data}
          colorScheme="dark"
          theme={{
            dark: [
              "#1e293b",
              "#4338ca",
              "#6366f1",
              "#8b5cf6",
              "#a855f7",
            ],
          }}
          blockRadius={6}
          blockSize={14}
          fontSize={12}
          showWeekdayLabels
        />
      ) : (
        <div
          className="
            h-32
            flex
            items-center
            justify-center
            text-slate-400
          "
        >
          No study activity yet.
        </div>
      )}
    </div>
  );
};

export default StudyHeatmap;