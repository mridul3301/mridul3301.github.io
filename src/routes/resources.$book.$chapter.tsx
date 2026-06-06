import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { ChevronLeft, ChevronRight, Expand, Menu, X } from "lucide-react";
import { getResourceChapter, getResourceChapterNavigation, getResourceBook } from "@/data/resources";
import { processCitations } from "@/lib/citations";
import { CodeBlock } from "@/components/code-block";
import "katex/dist/katex.min.css";

export const Route = createFileRoute("/resources/$book/$chapter")({
  head: ({ params }) => {
    const chapter = getResourceChapter(params.book, params.chapter);
    return {
      meta: chapter
        ? [
            { title: `${chapter.title} — ${chapter.bookTitle} — Resource` },
            { name: "description", content: chapter.description || chapter.title },
            { property: "og:title", content: chapter.title },
            { property: "og:description", content: chapter.description || chapter.title },
          ]
        : [{ title: "Resources - Mridul Sharma" }],
    };
  },
  component: ResourceChapterPage,
});

function ResourceChapterPage() {
  const { book: bookSlug, chapter: chapterSlug } = Route.useParams();
  const chapter = getResourceChapter(bookSlug, chapterSlug) ?? null;
  const book = getResourceBook(bookSlug) ?? null;
  const navigation = chapter ? getResourceChapterNavigation(bookSlug, chapterSlug) : null;
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);
  const [chapterNavOpen, setChapterNavOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  if (!chapter || !book || !navigation) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">This chapter could not be found.</p>
        <Link
              to="/resources/$book"
          params={{ book: bookSlug }}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="size-4" />
          Back to book
        </Link>
      </div>
    );
  }

  const jumpToHeading = (id: string) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    heading.scrollIntoView({ behavior: "smooth", block: "center" });
    window.history.replaceState(null, "", `#${id}`);
    setTocOpen(false);
  };

  const headingItems = chapter.headings;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-14">
      <div className="mb-8 flex items-center justify-between gap-3">
        <Link
              to="/resources/$book"
          params={{ book: book.slug }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          {book.title}
        </Link>
      </div>

      <button
        type="button"
        onClick={() => {
          setChapterNavOpen((value) => !value);
          setTocOpen(false);
        }}
        className="fixed left-4 top-24 z-40 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm cursor-pointer"
        aria-expanded={chapterNavOpen}
        aria-controls="resources-chapter-nav"
      >
        <Menu className="size-4" />
        Chapters
      </button>

      <button
        type="button"
        onClick={() => {
          setTocOpen((value) => !value);
          setChapterNavOpen(false);
        }}
        className="fixed right-4 top-24 z-40 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm cursor-pointer"
        aria-expanded={tocOpen}
        aria-controls="resource-toc-nav"
      >
        <Menu className="size-4" />
        Contents
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/35 transition-opacity ${chapterNavOpen || tocOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => {
          setChapterNavOpen(false);
          setTocOpen(false);
        }}
        aria-hidden={!chapterNavOpen && !tocOpen}
      />

      <aside
        id="resources-chapter-nav"
        className={`fixed left-0 top-0 z-50 h-dvh w-[20rem] border-r border-border bg-card p-5 shadow-2xl transition-transform duration-300 ${chapterNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-5 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Chapters</p>
          <button
            type="button"
            onClick={() => setChapterNavOpen(false)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <nav className="space-y-2 overflow-y-auto pr-1">
          {book.chapters.map((item) => (
            <Link
              key={item.slug}
                  to="/resources/$book/$chapter"
              params={{ book: book.slug, chapter: item.slug }}
              className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      <aside
        id="resource-toc-nav"
        className={`fixed right-0 top-0 z-50 h-dvh w-[20rem] border-l border-border bg-card p-5 shadow-2xl transition-transform duration-300 flex flex-col ${tocOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-5 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Table of contents
          </p>
          <button
            type="button"
            onClick={() => setTocOpen(false)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {headingItems.length > 0 ? (
          <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
            {headingItems.map((heading) => (
              <button
                key={heading.id}
                type="button"
                onClick={() => jumpToHeading(heading.id)}
                className={`block w-full rounded-md py-1.5 text-left text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground ${
                  heading.depth === 3 ? "pl-4" : "pl-1"
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        ) : (
          <p className="text-sm text-muted-foreground">No headings found in this chapter.</p>
        )}
      </aside>

      <article className="mx-auto max-w-3xl">
        {chapter.image ? (
          <button
            type="button"
            onClick={() =>
              setZoomedImage({ src: chapter.image as string, alt: `${chapter.title} cover` })
            }
            className="group relative mb-8 block w-full overflow-hidden rounded-2xl border border-border bg-muted text-left"
          >
            <img
              src={chapter.image}
              alt={`${chapter.title} cover`}
              className="aspect-[16/7] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
              <Expand className="size-3.5" />
              Expand
            </span>
          </button>
        ) : null}

        <p className="text-xs uppercase tracking-[0.2em] text-primary">{book.title}</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
          {chapter.title}
        </h1>
        {chapter.description ? (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {chapter.description}
          </p>
        ) : null}

        <div className="blog-markdown mt-10">
          {(() => {
            const { content: processed } = processCitations(chapter.content);

            return (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeSlug, rehypeKatex]}
                components={{
              a: ({ href, children, ...props }) => {
                if (!href || href.startsWith("javascript:")) {
                  return <span {...props}>{children}</span>;
                }

                if (href.startsWith("#")) {
                  return (
                    <a href={href} {...props}>
                      {children}
                    </a>
                  );
                }

                return (
                  <a href={href} target="_blank" rel="noreferrer" {...props}>
                    {children}
                  </a>
                );
              },
              img: ({ src, alt, title }) => {
                if (!src) return null;
                const resolvedAlt = alt ?? chapter.title;

                return (
                  <figure className="my-8 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setZoomedImage({ src, alt: resolvedAlt })}
                      className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-muted text-left shadow-sm"
                    >
                      <img
                        src={src}
                        alt={resolvedAlt}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                      />
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
                        <Expand className="size-3.5" />
                        Expand
                      </span>
                    </button>
                    {title ? (
                      <figcaption className="mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
                        {title}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              },
              pre: ({ node, children, ...props }) => {
                const child = Array.isArray(children) ? children[0] : children;
                const className = child && (child as any).props && (child as any).props.className;
                const m = typeof className === 'string' ? className.match(/language-(\w+)/) : null;
                const language = m ? m[1].toLowerCase() : '';

                if (language === 'pddl' || language === 'terminal') {
                  const codeContent = (child && (child as any).props && (child as any).props.children) || '';
                  return <CodeBlock children={codeContent} className={`language-${language}`} inline={false} />;
                }

                return <pre {...props}>{children}</pre>;
              },
            }}
          >
                {processed}
              </ReactMarkdown>
            );
          })()}
        </div>

        <div className="mt-12 grid gap-3 border-t border-border/60 pt-8 sm:grid-cols-2">
          {navigation.previous ? (
            <Link
                  to="/resources/$book/$chapter"
              params={{ book: book.slug, chapter: navigation.previous.slug }}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/35 hover:bg-accent/30"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Previous chapter
              </p>
              <p className="mt-2 inline-flex items-center gap-2 font-serif text-xl text-foreground">
                <ChevronLeft className="size-4" />
                {navigation.previous.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {navigation.next ? (
            <Link
                  to="/resources/$book/$chapter"
              params={{ book: book.slug, chapter: navigation.next.slug }}
              className="rounded-2xl border border-border bg-card p-5 text-right transition-colors hover:border-primary/35 hover:bg-accent/30"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Next chapter
              </p>
              <p className="mt-2 inline-flex items-center gap-2 font-serif text-xl text-foreground">
                {navigation.next.title}
                <ChevronRight className="size-4" />
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {zoomedImage ? (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/82 p-6"
            onClick={() => setZoomedImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setZoomedImage(null)}
              className="absolute right-5 top-5 rounded-md bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Close expanded image"
            >
              <X className="size-5" />
            </button>
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-h-[88dvh] max-w-[94vw] rounded-lg object-contain"
            />
          </div>
        ) : null}
      </article>
    </div>
  );
}
