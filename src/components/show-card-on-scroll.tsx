"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { PropsWithChildren, useRef, useState } from "react";

export const ShowCardOnScroll = ({ children }: PropsWithChildren) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const [hasShown, setHasShown] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.5 && !hasShown) setHasShown(true);
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        translateY: 30,
        translateX: -30,
        rotateX: 90,
        rotate: 15,
        scale: 1.1,
      }}
      animate={
        hasShown
          ? {
              translateY: 0,
              translateX: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              rotate: 0,
            }
          : {}
      }
      className="relative"
    >
      {children}
    </motion.div>
  );
};
