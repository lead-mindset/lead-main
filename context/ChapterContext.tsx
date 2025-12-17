"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChapterId } from "@/config/chapters";

interface ChapterContextValue {
  activeChapter: ChapterId;
  setActiveChapter: (chapter: ChapterId) => void;
}

const ChapterContext = createContext<ChapterContextValue | null>(null);

interface ChapterProviderProps {
  children: ReactNode;
}

export function ChapterProvider({ children }: ChapterProviderProps) {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("intro");

  const value: ChapterContextValue = {
    activeChapter,
    setActiveChapter,
  };

  return (
    <ChapterContext.Provider value={value}>
      {children}
    </ChapterContext.Provider>
  );
}

export function useChapter(): ChapterContextValue {
  const context = useContext(ChapterContext);
  
  if (!context) {
    throw new Error("useChapter must be used within a ChapterProvider");
  }
  
  return context;
}