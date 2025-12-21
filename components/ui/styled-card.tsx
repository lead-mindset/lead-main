import React from "react";

interface StyledCardProps {
  children: React.ReactNode;
  color: string;
}

export function StyledCard({ children, color }: StyledCardProps) {
  return (
    <div className="relative group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300`} />
      {children}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${color} opacity-10 rounded-bl-full`} />
    </div>
  );
}