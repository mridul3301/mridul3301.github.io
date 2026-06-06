import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { getResourceBook } from "@/data/resources";

export const Route = createFileRoute("/resources/$book")({
  head: ({ params }) => {
    const book = getResourceBook(params.book);
    return {
      meta: book
        ? [
            { title: `${book.title}` },
            { name: "description", content: book.description || book.title },
            { property: "og:title", content: book.title },
            { property: "og:description", content: book.description || book.title },
          ]
        : [{ title: "Resource - Mridul Sharma" }],
    };
  },
  component: ResourceBookPage,
});

function ResourceBookPage() {
  const { book: bookSlug } = Route.useParams();
  const book = getResourceBook(bookSlug) ?? null;
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isBookHome = pathname === `/resources/${bookSlug}`;

  if (!book) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm text-muted-foreground">This book could not be found.</p>
        <Link
          to="/resources"
          className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="size-4" />
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
      {isBookHome ? (
        <section className="mx-auto max-w-5xl">
          {/* Back navigation */}
          <div className="mb-8 flex items-center gap-3">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ChevronLeft className="size-4" />
              All resources
            </Link>
          </div>

          {/* Book Hero Section - Tactile double-column layout */}
          <header className="mb-16 grid gap-8 md:grid-cols-[240px_1fr] items-center">
            {/* Elegant tactile book cover sleeve */}
            <div className="relative aspect-[3/4] w-full max-w-[240px] mx-auto md:mx-0 rounded-2xl overflow-hidden bg-muted/30 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.45)] border border-border/40 group/cover">
              {book.image ? (
                <>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cover:scale-[1.04]"
                  />
                  {/* Subtle vignette gradient on cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="relative flex size-full items-end bg-gradient-to-br from-primary/20 via-secondary to-accent p-6 overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px]" />
                  <span className="relative z-10 font-serif text-xl leading-tight text-foreground/90 font-medium">
                    {book.title}
                  </span>
                </div>
              )}
              {/* Realistic book page spine edge shadow overlay */}
              <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/18 via-black/6 to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col justify-center text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary border border-primary/25 self-center md:self-start mb-4 shadow-2xs">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {book.chapterCount} {book.chapterCount === 1 ? "Topic" : "Topics"}
              </div>
              <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl leading-tight font-normal">
                {book.title}
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-3xl">
                {book.description}
              </p>
            </div>
          </header>

          {/* Chapters Title */}
          <div className="mb-8 border-b border-border/40 pb-5">
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Index</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a topic below and open to read.
            </p>
          </div>

          {/* Chapters List */}
          <div className="grid gap-4">
            {book.chapters.map((chapter, index) => (
              <Link
                key={chapter.slug}
                to="/resources/$book/$chapter"
                params={{ book: book.slug, chapter: chapter.slug }}
                className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-5 md:p-6 rounded-2xl border border-border/50 bg-card/45 backdrop-blur-xs transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-start gap-4 min-w-0">
                  {/* Chapter number circle bubble */}
                  <div className="flex shrink-0 items-center justify-center size-10 rounded-xl bg-primary/5 text-primary text-sm font-bold border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-2xs">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-serif text-xl md:text-2xl leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {chapter.title}
                    </h3>
                    {chapter.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground/90 line-clamp-2">
                        {chapter.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex sm:self-center">
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 group-hover:border-primary/45 group-hover:bg-primary/5 group-hover:text-primary">
                    Open
                    <svg
                      className="w-4 h-4 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
