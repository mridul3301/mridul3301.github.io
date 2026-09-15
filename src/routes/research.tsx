import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { publications } from "@/data/site";
import { PublicationCard } from "@/components/publication-card";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research - Mridul Sharma" },
      { name: "description", content: "Research publications and preprints by Mridul Sharma." },
      { property: "og:title", content: "Research - Mridul Sharma" },
      {
        property: "og:description",
        content: "Research publications and preprints by Mridul Sharma.",
      },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const [year, setYear] = useState<"all" | number>("all");
  const [type, setType] = useState<"all" | string>("all");

  const years = useMemo(
    () => Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a),
    [],
  );
  const types = useMemo(() => Array.from(new Set(publications.map((p) => p.type))), []);
  const hasUnderReview = useMemo(
    () => publications.some((p) => p.type === "Preprint" && p.underReview),
    [],
  );

  const filtered = publications
    .filter((p) => (year === "all" ? true : p.year === year))
    .filter((p) =>
      type === "all"
        ? true
        : type === "Under review"
          ? p.type === "Preprint" && p.underReview
          : p.type === type,
    )
    .sort((a, b) => b.year - a.year);

  return (
    <div className="mx-auto max-w-5xl px-6 pt-16 pb-12">
      <header className="mb-10">
        <h1 className="font-serif text-5xl tracking-tight text-foreground">Research</h1>
        <p className="mt-3 text-muted-foreground">
          {publications.length} works across journals, conferences, workshops, and preprints.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-6 border-y border-border/60 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Year</span>
          <div className="relative">
            <select
              value={String(year)}
              onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="appearance-none rounded-md border border-border bg-card py-1.5 pl-3 pr-8 text-sm text-foreground transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <Filter
          label="Type"
          value={type}
          options={[
            { v: "all", l: "All" },
            ...types.map((t) => ({ v: t, l: t })),
            ...(hasUnderReview ? [{ v: "Under review", l: "Under review" }] : []),
          ]}
          onChange={(v) => setType(v)}
        />
        <span className="ml-auto text-sm text-muted-foreground">Showing {filtered.length}</span>
      </div>

      <div className="grid gap-5">
        {filtered.map((p) => (
          <PublicationCard key={p.title} pub={p} />
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            No publications match these filters.
          </p>
        )}
      </div>
    </div>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { v: string; l: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              value === o.v
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
