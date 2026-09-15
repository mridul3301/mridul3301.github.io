import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { blogPosts } from "@/data/blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - Mridul Sharma" },
      {
        name: "description",
        content: "Essays and notes on research, math, and ML by Mridul Sharma.",
      },
      { property: "og:title", content: "Blog - Mridul Sharma" },
      { property: "og:description", content: "Essays and notes on research, math, and ML." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isPostPage = pathname !== "/blog";

  if (isPostPage) {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-14">
      <header className="mb-12">
        <h1 className="font-serif text-5xl tracking-tight text-foreground sm:text-6xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Thoughts and insights on research and technology.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              {p.cover ? (
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex size-full items-end bg-linear-to-br from-primary/20 via-secondary/80 to-accent p-6">
                  <span className="max-w-72 font-serif text-2xl leading-tight text-foreground">
                    {p.title}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {p.dateLabel}
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-snug text-foreground line-clamp-2">
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {p.excerpt}
              </p>
              {p.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="mt-auto pt-5 text-sm font-medium text-primary group-hover:underline">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
