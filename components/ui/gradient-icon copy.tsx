import { motion } from "framer-motion";
import React from "react";

interface GradientIconProps {
  icon: React.ReactNode;
  color: string;
}

export function GradientIcon({ icon, color }: GradientIconProps) {
  return (
    <motion.div
      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${color}`}
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.div>
  );
}