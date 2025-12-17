"use client";

import { ChapterProvider } from "@/context/ChapterContext";
import ScrollExperience from "@/components/scroll/ScrollExperience";

export default function Page() {
  return (
    <ChapterProvider>
      <main className="relative w-full">
        <ScrollExperience />
        <DebugInfo />
      </main>
    </ChapterProvider>
  );
}

function DebugInfo() {
  // const { activeChapter } = useChapter();
  
  return null;
  
  // return (
  //   <div className="fixed top-4 left-4 z-50 bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-mono">
  //     Active Chapter: {activeChapter}
  //   </div>
  // );
}