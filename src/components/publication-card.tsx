import { useState } from "react";
import {
  ChevronDown,
  FileText,
  Code2,
  Link2,
  Globe,
  Youtube,
  PenLine,
  Github,
  Copy,
  Check,
  Quote,
  Database,
  Brain,
} from "lucide-react";

import { type Publication } from "@/data/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const typeStyles: Record<string, string> = {
  Journal: "bg-accent text-accent-foreground",
  Conference: "bg-primary/10 text-primary",
  Workshop: "bg-accent text-accent-foreground",
  Preprint: "bg-muted text-muted-foreground",
  "Technical Report": "bg-muted text-muted-foreground",
};

export function PublicationCard({ pub }: { pub: Publication }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const bibtex = pub.citation ?? "Citation not available.";

  const renderAuthors = (authors: string) => {
    const parts = authors.split(/(Mridul Sharma[^a-zA-Z,]*)/);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith("Mridul Sharma")) {
            return (
              <strong key={index} className="font-semibold text-foreground">
                {part}
              </strong>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  const r = pub.resources ?? {};
  const resourceLinks = [
    r.page && { href: r.page, label: "Paper", icon: Globe },
    pub.pdf && { href: pub.pdf, label: "PDF", icon: FileText },
    r.arxiv && { href: r.arxiv, label: "arXiv", icon: FileText },
    r.data && { href: r.data, label: "Data", icon: Database },
    r.models && { href: r.models, label: "Model", icon: Brain },
    ...(r.blogs ?? []).map((b, i) => ({
      href: b,
      label: (r.blogs?.length ?? 0) > 1 ? `Blog ${i + 1}` : "Blog",
      icon: PenLine,
    })),
    (r.code ?? pub.code) && { href: r.code ?? pub.code ?? "", label: "GitHub", icon: Github },
    r.video && { href: r.video, label: "YouTube", icon: Youtube },
  ].filter(Boolean) as { href: string; label: string; icon: typeof FileText }[];

  const uniqueResourceLinks = Array.from(
    new Map(resourceLinks.map((link) => [link.href, link])).values(),
  );

  return (
    <article className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className={`rounded-full px-2.5 py-0.5 font-medium ${typeStyles[pub.type] ?? ""}`}>
          {pub.type}
        </span>
        {pub.type === "Preprint" && pub.underReview && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            Under review
          </span>
        )}
        <span>{pub.venue}</span>
        <span aria-hidden>·</span>
        <span>{pub.year}</span>
      </div>
      <h3 className="mt-3 font-serif text-xl font-[540] leading-snug text-foreground">
        {pub.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{renderAuthors(pub.authors)}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
          aria-expanded={open}
        >
          {open ? "Hide abstract" : "Show abstract"}
          <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
              aria-label="More Info"
            >
              Paper / Code
              <ChevronDown className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-(--radix-dropdown-menu-trigger-width)"
          >
            {uniqueResourceLinks.length > 0 ? (
              uniqueResourceLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center gap-2 text-xs"
                  >
                    <link.icon className="size-3.5" />
                    <span>{link.label}</span>
                  </a>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No external links available.</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog onOpenChange={(value) => !value && setCopied(false)}>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent">
              <Quote className="size-3.5" />
              Cite
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>BibTeX citation</DialogTitle>
              <DialogDescription>Copy this citation for the paper.</DialogDescription>
            </DialogHeader>

            <div className="rounded-xl border border-border bg-muted p-4 overflow-x-auto">
              <pre className="min-w-max max-h-96 whitespace-pre text-sm leading-relaxed text-foreground">
                {bibtex}
              </pre>
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* <p className="text-xs text-muted-foreground">BibTeX is generated from the publication metadata.</p> */}
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(bibtex);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {open && <p className="mt-3 text-sm leading-relaxed text-foreground/80">{pub.abstract}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {pub.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      {(pub.pdf || pub.code || pub.doi) && (
        <div className="mt-4 flex flex-wrap gap-3 border-t border-border/60 pt-4 text-sm">
          {pub.pdf && (
            <a
              href={pub.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <FileText className="size-3.5" /> PDF
            </a>
          )}
          {pub.code && (
            <a
              href={pub.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Code2 className="size-3.5" /> Code
            </a>
          )}
          {pub.doi && (
            <a
              href={pub.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Link2 className="size-3.5" /> DOI
            </a>
          )}
        </div>
      )}
    </article>
  );
}
