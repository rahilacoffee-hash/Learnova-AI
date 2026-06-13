import { motion } from "framer-motion";
import { useState } from "react";

export default function DemoCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        scale: 1.02,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-10
        backdrop-blur-xl
      "
    >
      {!hovered ? (
        <div>
          <h3 className="text-3xl font-bold">
            Hover to preview
          </h3>

          <p className="mt-3 text-zinc-400">
            Watch the AI process notes in real time.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/50 p-6">
            Upload → Summarize → Quiz
          </div>
        </div>
      ) : (
        <div className="space-y-4 font-mono">
          <div>✓ Notes uploaded</div>

          <div>✓ Summary generated</div>

          <div>✓ Flashcards created</div>

          <div>✓ Quiz ready</div>
        </div>
      )}
    </motion.div>
  );
}