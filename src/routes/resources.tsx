import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { ResourceBooks } from "@/data/resources";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources - Mridul Sharma" },
      {
        name: "description",
        content:
          "Curated resources across RL, program synthesis, VLA, and probability.",
      },
      { property: "og:title", content: "Resources - Mridul Sharma" },
      { property: "og:description", content: "Curated resources." },
    ],
  }),
  component: ResourcePage,
});

function ResourcePage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/resources") {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-16">
      <header className="mb-16 text-center sm:text-left">
        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Knowledge Base
        </div> */}
        <h1 className="font-serif text-5xl tracking-tight text-foreground sm:text-6xl font-normal">
          Resources
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Book-like collections of chapters grouping related research notes, mathematical
          formulations, and interactive insights together.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {ResourceBooks.map((book) => (
          <Link
            key={book.slug}
            to="/resources/$book"
            params={{ book: book.slug }}
            className="group flex flex-col h-full overflow-hidden rounded-3xl border border-border/50 bg-card/45 backdrop-blur-xs transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:border-primary/40 hover:bg-card hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]"
          >
            {/* Cover Image/Header */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
              {book.image ? (
                <>
                  <img
                    src={book.image}
                    alt={book.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </>
              ) : (
                <div className="relative flex size-full items-end bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/50 p-6 overflow-hidden">
                  {/* Decorative modern mesh/circle backdrops */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-accent/20 blur-2xl" />
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px]" />
                  <span className="relative z-10 max-w-72 font-serif text-2xl leading-tight text-foreground/90 font-medium">
                    {book.title}
                  </span>
                </div>
              )}

              {/* Floating badges */}
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-background/80 backdrop-blur-md text-foreground border border-border/40 shadow-xs">
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  {book.chapterCount} {book.chapterCount === 1 ? "Topic" : "Topics"}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow p-6 sm:p-8">
              <h2 className="font-serif text-2xl leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                {book.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90 line-clamp-3 flex-grow">
                {book.description}
              </p>

              <div className="mt-6 pt-5 border-t border-border/45 flex items-center justify-between text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                <span className="tracking-wide">View Resource</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
