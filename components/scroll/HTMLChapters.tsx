"use client";

import { chapterRanges } from "@/config/chapters";
import { useChapter } from "@/context/ChapterContext";

export default function HTMLChapters() {
  const { activeChapter } = useChapter();

  return (
    <div className="relative w-full">
      {chapterRanges.map((chapter, index) => (
        <section
          key={chapter.id}
          className="slot absolute w-full"
          style={{
            top: `${chapter.from * 100}vh`,
            height: `${chapter.pages * 100}vh`,
          }}
        >
          <div className="sticky-inner">
            <ChapterContent 
              chapter={chapter} 
              isActive={activeChapter === chapter.id}
            />
          </div>
        </section>
      ))}
    </div>
  );
}

interface ChapterContentProps {
  chapter: typeof chapterRanges[number];
  isActive: boolean;
}

function ChapterContent({ chapter, isActive }: ChapterContentProps) {
  const baseClasses = "w-full h-screen flex items-center justify-center transition-opacity duration-500";
  const opacityClass = isActive ? "opacity-100" : "opacity-70";

  switch (chapter.id) {
    case "intro":
      return (
        <div className={`${baseClasses} ${opacityClass} bg-gradient-to-b from-slate-900 to-slate-800`}>
          <div className="text-center text-white max-w-4xl px-8">
            <h1 className="text-6xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Welcome to Our Story
            </h1>
            <p className="text-xl md:text-lg text-slate-300 leading-relaxed">
              A scroll-driven journey through innovation, impact, and the future we're building together.
            </p>
          </div>
        </div>
      );

    case "impact":
      return (
        <div className={`${baseClasses} ${opacityClass} bg-gradient-to-r from-emerald-900 to-teal-800`}>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-12 max-w-6xl mx-auto px-8">
            <div className="text-white">
              <h2 className="text-5xl md:text-3xl font-bold mb-6">Global Impact</h2>
              <p className="text-lg text-emerald-100 leading-relaxed mb-8">
                Measuring our reach across communities and creating lasting change through technology and innovation.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-800/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-300">1M+</div>
                  <div className="text-emerald-100">Lives Touched</div>
                </div>
                <div className="bg-emerald-800/50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-300">150+</div>
                  <div className="text-emerald-100">Countries</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-64 h-64 bg-emerald-600/30 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case "programs":
      return (
        <div className={`${baseClasses} ${opacityClass} bg-gradient-to-b from-purple-900 to-indigo-800`}>
          <div className="max-w-6xl mx-auto px-8 text-white">
            <h2 className="text-5xl md:text-3xl font-bold mb-12 text-center">Our Programs</h2>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-8">
              <div className="bg-purple-800/50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-purple-200">Education</h3>
                <p className="text-purple-100">Empowering the next generation with cutting-edge skills and knowledge.</p>
              </div>
              <div className="bg-indigo-800/50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-indigo-200">Innovation</h3>
                <p className="text-indigo-100">Fostering breakthrough technologies that solve real-world problems.</p>
              </div>
              <div className="bg-violet-800/50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-violet-200">Community</h3>
                <p className="text-violet-100">Building connections and support networks that last a lifetime.</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "team":
      return (
        <div className={`${baseClasses} ${opacityClass} bg-gradient-to-r from-amber-900 to-orange-800`}>
          <div className="text-center text-white max-w-4xl px-8">
            <h2 className="text-5xl md:text-3xl font-bold mb-8">Our Team</h2>
            <p className="text-xl md:text-lg text-amber-100 leading-relaxed mb-12">
              A diverse group of innovators, dreamers, and builders working together to create positive change.
            </p>
            <div className="flex justify-center items-center space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-16 bg-amber-500 rounded-full animate-bounce" 
                     style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      );

    case "future":
      return (
        <div className={`${baseClasses} ${opacityClass} bg-gradient-to-b from-slate-900 via-blue-900 to-purple-900`}>
          <div className="text-center text-white max-w-5xl px-8">
            <h2 className="text-6xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future Awaits
            </h2>
            <p className="text-xl md:text-lg text-slate-200 leading-relaxed mb-12">
              Together, we're shaping tomorrow through innovation, collaboration, and unwavering commitment to positive impact.
            </p>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                Join Our Journey
              </button>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`${baseClasses} ${opacityClass} bg-slate-800`}>
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold">Chapter: {chapter.id}</h2>
            <p className="text-lg mt-4">Type: {chapter.type} | Pages: {chapter.pages}</p>
          </div>
        </div>
      );
  }
}
