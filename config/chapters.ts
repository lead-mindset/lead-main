export const chapters = [
  { id: "intro", type: "vertical", pages: 1 },
] as const;

export type ChapterId = typeof chapters[number]["id"];
export type ChapterType = "vertical" | "horizontal";

export interface Chapter {
  id: ChapterId;
  type: ChapterType;
  pages: number;
}

export interface ChapterRange extends Chapter {
  from: number;
  length: number;
}

export function getChapterRanges(chapters: readonly Chapter[]): ChapterRange[] {
  let acc = 0;
  const TOTAL_PAGES = chapters.reduce((a, c) => a + c.pages, 0);

  return chapters.map((c) => {
    const from = acc / TOTAL_PAGES;
    const length = c.pages / TOTAL_PAGES;
    acc += c.pages;

    return { ...c, from, length };
  });
}

export const chapterRanges = getChapterRanges(chapters);
export const TOTAL_PAGES = chapters.reduce((a, c) => a + c.pages, 0);