"use client";

import { useChapter } from "@/context/ChapterContext";

export default function HTMLChapters() {
  const { activeChapter } = useChapter();

  return (
    <div className="w-screen">
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">{activeChapter}</h1>
      </section>
    </div>
  );
}
