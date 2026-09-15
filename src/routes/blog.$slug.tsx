import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CalendarDays, ChevronLeft, Expand, Menu, X } from "lucide-react";
import { getBlogPost } from "@/data/blog";
import { processCitations } from "@/lib/citations";
import { CodeBlock } from "@/components/code-block";
import "katex/dist/katex.min.css";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    return {
      meta: post
        ? [
            { title: `${post.title} - Mridul Sharma` },
            { name: "description", content: post.excerpt || post.title },
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.excerpt || post.title },
          ]
        : [
            { title: "Blog - Mridul Sharma" },
            { name: "description", content: "Blog post not found." },
          ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = slug ? (getBlogPost(slug) ?? null) : null;
  const [tocOpen, setTocOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm text-muted-foreground">This post could not be found.</p>
        <Link
          to="/blog"
          className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ChevronLeft className="size-4" />
          Back to blog
        </Link>
      </div>
    );
  }

  const navigateToHeading = (id: string) => {
    const heading = document.getElementById(id);
    if (!heading) return;

    heading.scrollIntoView({ behavior: "smooth", block: "center" });
    window.history.replaceState(null, "", `#${id}`);
    setTocOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setTocOpen((value) => !value)}
        className="fixed right-4 top-24 z-40 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/95 px-3 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/35 hover:text-primary"
        aria-expanded={tocOpen}
        aria-controls="blog-toc-panel"
      >
        {tocOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        Contents
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/35 transition-opacity ${tocOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setTocOpen(false)}
        aria-hidden={!tocOpen}
      />

      <aside
        id="blog-toc-panel"
        className={`fixed right-0 top-0 z-50 h-dvh w-[22rem] border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 flex flex-col ${tocOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-6 flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Table of contents
          </p>
          <button
            type="button"
            onClick={() => setTocOpen(false)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close table of contents"
          >
            <X className="size-4" />
          </button>
        </div>

        {post.headings.length > 0 ? (
          <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
            {post.headings.map((heading) => (
              <button
                type="button"
                key={heading.id}
                onClick={() => navigateToHeading(heading.id)}
                className={`block w-full rounded-md py-1.5 text-left text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground ${
                  heading.depth === 3 ? "pl-4" : "pl-1"
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        ) : (
          <p className="text-sm text-muted-foreground">No headings found in this post.</p>
        )}
      </aside>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <article className="mx-auto max-w-3xl">
          <header className="mt-6 border-b border-border/60 pb-8">
            {post.cover ? (
              <button
                type="button"
                onClick={() =>
                  setZoomedImage({ src: post.cover as string, alt: `${post.title} cover` })
                }
                className="group relative mb-7 block w-full overflow-hidden rounded-2xl border border-border bg-muted"
              >
                <img
                  src={post.cover}
                  alt={`${post.title} cover`}
                  className="aspect-[16/8] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
                  <Expand className="size-3.5" />
                  Expand
                </span>
              </button>
            ) : null}

            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {post.dateLabel}
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/80">
              {post.excerpt}
            </p>
          </header>

          <div className="blog-markdown mt-10">
            {(() => {
              const { content: processed } = processCitations(post.content);

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
                  const resolvedAlt = alt ?? "Blog image";

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
                    // children is usually a single <code className="language-..."> element
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
        </article>
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
    </>
  );
}
