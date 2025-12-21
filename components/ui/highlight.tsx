import React from "react";

interface HighlightProps {
  children: React.ReactNode;
}

export function Highlight({ children }: HighlightProps) {
  return (
    <span className="font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
}