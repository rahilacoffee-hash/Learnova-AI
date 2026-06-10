import {
  FileText,
  Layers3,
  Brain,
} from "lucide-react";

import { MdOutlineSummarize } from "react-icons/md";

const StatsGrid = ({
  notes,
  summaries,
  flashcards,
}) => {
  const stats = [
    {
      title: "Notes Uploaded",
      value: notes.length,
      icon: FileText,
      color: "text-purple-400",
    },
    {
      title: "AI Summaries",
      value: summaries.length,
      icon: MdOutlineSummarize,
      color: "text-blue-400",
    },
    {
      title: "Flashcards Created",
      value: flashcards.length,
      icon: Layers3,
      color: "text-cyan-400",
    },
    {
      title: "AI Sessions",
      value:
        notes.length +
        summaries.length +
        flashcards.length,
      icon: Brain,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map(
        ({
          title,
          value,
          icon: Icon,
          color,
        }) => (
          <div
            key={title}
            className="
              rounded-[28px]
              bg-[#0B1022]
              border border-white/5
              p-6
            "
          >
            <Icon
              className={`${color}`}
              size={28}
            />

            <p className="mt-6 text-slate-400">
              {title}
            </p>

            <h2 className="text-5xl font-bold text-white mt-2">
              {value}
            </h2>

          </div>
        )
      )}

    </div>
  );
};

export default StatsGrid;