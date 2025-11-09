"use client";

import { motion } from "motion/react";
import { RiBtcFill } from "react-icons/ri";

function GradualSpacing({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex space-x-0.5 justify-center items-center">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="text-base sm:text-lg md:text-xl font-bold"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: [0, 1], y: [ -6, 0 ] }}
          transition={{ duration: 0.36, delay: i * 0.06 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full absolute inset-0 bg-white">
      <motion.div
        className="flex items-center flex-col gap-4"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <RiBtcFill className="w-24 h-24" fill="lab(71 33.37 71.55)" />
        </motion.div>
        <GradualSpacing text="Loading..." />
      </motion.div>
    </div>
  );
}
