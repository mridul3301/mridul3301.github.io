import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Mail, Github, Twitter, GraduationCap } from "lucide-react";
import { profile, publications } from "@/data/site";
import { PublicationCard } from "@/components/publication-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mridul Sharma" },
      {
        name: "description",
        content:
          "AI Engineer working on world models, program synthesis, RL, and vision-language-action models.",
      },
      { property: "og:title", content: "Mridul Sharma" },
      {
        property: "og:description",
        content: "AI Engineer working on world models, program synthesis, RL, and VLA models.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = publications.filter((p) => p.featured);
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="mx-auto max-w-3xl pt-12 pb-16 sm:pt-16">
        {/* <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {profile.role}
        </p> */}
        <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          Hey, I'm {profile.name.split(" ")[0]}.
        </h1>
        <p
          className="mt-8 max-w-none text-justify text-lg leading-relaxed text-foreground/80 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80 transition-opacity whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: profile.introI }}
        />
        <p
          className="mt-8 max-w-none text-justify text-lg leading-relaxed text-foreground/80 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80 transition-opacity whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: profile.introII }}
        />
        <p
          className="mt-8 max-w-none text-justify text-lg leading-relaxed text-foreground/80 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80 transition-opacity whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: profile.introIII }}
        />



        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/research"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
          >
            View Research
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={profile.links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <FileText className="size-4" />
            View CV
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 text-base text-muted-foreground">
          <a
            href={profile.links.email}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Mail className="size-5" /> Email
          </a>
          <a
            href={profile.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Twitter className="size-5" /> X / Twitter
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Github className="size-5" /> GitHub
          </a>
          <a
            href={profile.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <GraduationCap className="size-5" /> Google Scholar
          </a>
        </div>
      </section>

      <section className="border-t border-border/60 py-16 max-w-3xl mx-auto">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-foreground">Featured publications</h2>
            <p className="mt-2 text-sm text-muted-foreground">Selected works from my research.</p>
          </div>
          <Link to="/research" className="shrink-0 text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-5">
          {featured.map((p) => (
            <PublicationCard key={p.title} pub={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
