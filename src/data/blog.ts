import GithubSlugger from "github-slugger";

export interface BlogHeading {
  id: string;
  text: string;
  depth: number;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  excerpt: string;
  cover?: string;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  headings: BlogHeading[];
  dateValue: number;
}

const rawPosts = import.meta.glob("../content/blog/*.md", {
  eager: true,
  // Vite deprecated `as: 'raw'` in favour of `query: '?raw', import: 'default'`
  // See: https://vitejs.dev/guide/features.html#glob-import
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getDateValue(value: string): number {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function extractHeadings(markdown: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];

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

function loadPost(filePath: string, raw: string): BlogPost {
  const { data, content } = parseFrontmatter(raw);
  const slug =
    typeof data.slug === "string" && data.slug.length > 0
      ? data.slug
      : (filePath.split("/").pop()?.replace(/\.md$/, "") ?? "post");
  const title = typeof data.title === "string" && data.title.length > 0 ? data.title : slug;
  const date =
    typeof data.date === "string" && data.date.length > 0
      ? data.date
      : new Date().toISOString().slice(0, 10);
  const excerpt = typeof data.excerpt === "string" && data.excerpt.length > 0 ? data.excerpt : "";
  const cover =
    typeof data.cover === "string" && data.cover.length > 0
      ? data.cover
      : typeof data.image === "string" && data.image.length > 0
        ? data.image
        : undefined;
  const dateValue = getDateValue(date);

  return {
    slug,
    title,
    date,
    dateLabel: formatDate(date),
    excerpt,
    cover,
    dateValue,
    content,
    headings: extractHeadings(content),
  };
}

const posts = Object.entries(rawPosts)
  .map(([filePath, raw]) => loadPost(filePath, raw))
  .sort((a, b) => b.dateValue - a.dateValue || b.date.localeCompare(a.date));

export const blogPosts: BlogPostSummary[] = posts.map(
  ({ content: _content, headings: _headings, dateValue: _dateValue, ...summary }) => summary,
);

export function getBlogPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
