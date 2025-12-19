"use client";

import { useChapterStore } from "@/store/useChapterStore";

export default function HTMLChapters() {
  const activeChapter = useChapterStore((s) => s.activeChapter);

  return (
    <div className="w-screen">
      <section className="h-screen border-4 border-black flex items-center justify-center">
        <h1 className="text-4xl font-bold">{activeChapter}</h1>
      </section>
    </div>
  );
}
