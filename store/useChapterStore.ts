import { create } from "zustand";
import type { ChapterId } from "@/config/chapters";

interface ChapterState {
  activeChapter: ChapterId;
  setActiveChapter: (chapter: ChapterId) => void;
}

export const useChapterStore = create<ChapterState>((set) => ({
  activeChapter: "intro",
  setActiveChapter: (chapter) => set({ activeChapter: chapter }),
}));
