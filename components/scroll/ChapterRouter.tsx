"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { chapterRanges } from "@/config/chapters";
import type { ChapterId } from "@/config/chapters";
import { useChapterStore } from "@/store/useChapterStore";

export default function ChapterRouter() {
  const scroll = useScroll();
  const setActiveChapter = useChapterStore((s) => s.setActiveChapter);
  const lastChapterId = useRef<ChapterId | null>(null);

  useFrame(() => {
    const currentChapter = chapterRanges.find((chapter) =>
      scroll.visible(chapter.from, chapter.length)
    );

    if (currentChapter && currentChapter.id !== lastChapterId.current) {
      lastChapterId.current = currentChapter.id;
      setActiveChapter(currentChapter.id);
    }
  });

  return null;
}
