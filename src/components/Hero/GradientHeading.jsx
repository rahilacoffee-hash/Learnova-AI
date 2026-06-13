import { motion } from "framer-motion";

export default function GradientHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl font-black leading-tight md:text-7xl">
        <span className="animated-gradient">
          Learn Faster.
        </span>

        <br />

        <span className="animated-gradient">
          Think Smarter.
        </span>

        <br />

        <span className="text-white">
          Build Your Future.
        </span>
      </h1>
    </motion.div>
  );
}