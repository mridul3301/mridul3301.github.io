import GithubSlugger from "github-slugger";

export interface ResourceHeading {
  id: string;
  text: string;
  depth: number;
}

export interface ResourceBookSummary {
  slug: string;
  title: string;
  description: string;
  image?: string;
  chapterCount: number;
}

export interface ResourceChapterSummary {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export interface ResourceChapter extends ResourceChapterSummary {
  bookSlug: string;
  bookTitle: string;
  content: string;
  headings: ResourceHeading[];
  order: number;
  fileName: string;
}

export interface ResourceBook extends ResourceBookSummary {
  chapters: ResourceChapter[];
}

interface ResourceBookIndex {
  title?: string;
  description?: string;
  image?: string;
  chapters?: string[];
}

const rawBookIndexes = import.meta.glob("../content/resources/*/index.json", {
  eager: true,
  import: "default",
}) as Record<string, ResourceBookIndex>;

const rawChapterFiles = import.meta.glob("../content/resources/*/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?/.exec(raw);

  if (!match) {
    return { data: {}, content: raw };
  }

  const data: Record<string, string> = {};

  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key) {
      data[key] = value;
    }
  }

  return {
    data,
    content: raw.slice(match[0].length),
  };
}

function extractHeadings(markdown: string): ResourceHeading[] {
  const slugger = new GithubSlugger();
  const headings: ResourceHeading[] = [];

  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = match[2].replace(/\s+#*$/, "").trim();

    headings.push({
      id: slugger.slug(text),
      text,
      depth,
    });
  }

  return headings;
}

function formatLabelFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function normalizeEntryName(value: string) {
  return value.replace(/\.md$/i, "").trim();
}

function getBookSlug(filePath: string) {
  return filePath.split("/").at(-2) ?? "";
}

function loadChapter(
  bookSlug: string,
  bookTitle: string,
  filePath: string,
  raw: string,
): ResourceChapter {
  const fileName = filePath.split("/").at(-1) ?? "chapter.md";
  const slug = normalizeEntryName(fileName);
  const { data, content } = parseFrontmatter(raw);
  const title =
    typeof data.title === "string" && data.title.length > 0
      ? data.title
      : formatLabelFromSlug(slug);
  const description =
    typeof data.description === "string" && data.description.length > 0
      ? data.description
      : typeof data.excerpt === "string" && data.excerpt.length > 0
        ? data.excerpt
        : "";
  const image =
    typeof data.image === "string" && data.image.length > 0
      ? data.image
      : typeof data.cover === "string" && data.cover.length > 0
        ? data.cover
        : undefined;

  return {
    slug,
    title,
    description,
    image,
    bookSlug,
    bookTitle,
    content,
    headings: extractHeadings(content),
    order: 0,
    fileName,
  };
}

const books: ResourceBook[] = Object.entries(rawBookIndexes)
  .map(([filePath, index]) => {
    const bookSlug = getBookSlug(filePath);
    const bookTitle = index.title ?? formatLabelFromSlug(bookSlug);
    const bookDescription = index.description ?? "";
    const bookImage = index.image || undefined;

    const chapterFiles = Object.entries(rawChapterFiles)
      .filter(([chapterPath]) => chapterPath.includes(`/resources/${bookSlug}/`))
      .map(([chapterPath, raw]) => loadChapter(bookSlug, bookTitle, chapterPath, raw));

    const orderedNames = (index.chapters ?? []).map(normalizeEntryName);
    const chapterMap = new Map(chapterFiles.map((chapter) => [chapter.slug, chapter] as const));
    const orderedChapters: ResourceChapter[] = [];

    for (const chapterSlug of orderedNames) {
      const chapter = chapterMap.get(chapterSlug);
      if (chapter) {
        orderedChapters.push(chapter);
        chapterMap.delete(chapterSlug);
      }
    }

    orderedChapters.push(
      ...Array.from(chapterMap.values()).sort((a, b) => a.slug.localeCompare(b.slug)),
    );

    const chapters = orderedChapters.map((chapter, index) => ({
      ...chapter,
      order: index,
    }));

    return {
      slug: bookSlug,
      title: bookTitle,
      description: bookDescription,
      image: bookImage,
      chapterCount: chapters.length,
      chapters,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export const ResourceBooks: ResourceBookSummary[] = books.map(
  ({ chapters: _chapters, ...summary }) => summary,
);

export function getResourceBook(bookSlug: string) {
  return books.find((book) => book.slug === bookSlug);
}

export function getResourceChapter(bookSlug: string, chapterSlug: string) {
  return getResourceBook(bookSlug)?.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getResourceChapterNavigation(bookSlug: string, chapterSlug: string) {
  const book = getResourceBook(bookSlug);
  if (!book) return null;

  const index = book.chapters.findIndex((chapter) => chapter.slug === chapterSlug);
  if (index === -1) return null;

  return {
    book,
    previous: index > 0 ? book.chapters[index - 1] : null,
    next: index < book.chapters.length - 1 ? book.chapters[index + 1] : null,
  };
}
