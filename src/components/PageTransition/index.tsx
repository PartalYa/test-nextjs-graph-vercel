"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Loader from "@/src/components/Loader";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // show overlay for 2s, then start fading
    const t = setTimeout(() => setFading(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full">
      {children}

      {showOverlay && (
        <motion.div
          className="absolute inset-0 z-50 bg-white flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={fading ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => {
            if (fading) setShowOverlay(false);
          }}
        >
          <Loader />
        </motion.div>
      )}
    </div>
  );
}
