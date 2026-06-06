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

      {blogPosts.length > 0 && (
        <Link
          key={blogPosts[0].slug}
          to="/blog/$slug"
          params={{ slug: blogPosts[0].slug }}
          className="group mb-8 grid overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_15px_45px_-30px_var(--color-foreground)] transition-all hover:border-primary/35 md:grid-cols-[1.2fr_1fr]"
        >
          <div className="relative min-h-64 overflow-hidden md:min-h-72">
            {blogPosts[0].cover ? (
              <img
                src={blogPosts[0].cover}
                alt={blogPosts[0].title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="flex size-full items-end bg-linear-to-br from-primary/30 via-accent/35 to-secondary p-8">
                <span className="max-w-sm font-serif text-4xl leading-tight text-foreground">
                  {blogPosts[0].title}
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-7 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Latest</p>
            <p className="mt-2 text-sm text-muted-foreground">{blogPosts[0].dateLabel}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground">
              {blogPosts[0].title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {blogPosts[0].excerpt}
            </p>
            <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
              Read article
              <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.slice(1).map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:border-primary/40 hover:shadow-md"
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
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {p.dateLabel}
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-snug text-foreground">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <span className="mt-5 inline-block text-sm font-medium text-primary group-hover:underline">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
