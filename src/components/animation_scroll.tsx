// src/components/animations/MotionFadeIn.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.2,
    },
  }),
};

type MotionFadeInProps = {
  children: ReactNode;
  custom?: number;
  className?: string;
};

export default function MotionFadeIn({
  children,
  custom = 0,
  className = "",
}: MotionFadeInProps) {
  return (
    <motion.div
      className={className}
      custom={custom}
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
