import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { PipelineCompact } from "./Pipeline";

export function ProjectList({
  projects,
  headingLevel = "h3",
}: {
  projects: Project[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-line">
      {projects.map((p) => (
        <li key={p.slug} className="border-b border-line">
          <article className="group relative grid gap-6 py-9 transition-[background-color,padding] duration-300 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-12 md:py-11 md:hover:-mx-5 md:hover:px-5 md:hover:bg-surface">
            <div>
              <p className="flex flex-wrap gap-x-4 text-sm">
                <span className="font-medium text-accent">{p.category}</span>
                {p.year && <span className="text-muted">{p.year}</span>}
              </p>
              <Heading className="type-h2 mt-2">
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-sm decoration-accent decoration-2 underline-offset-[0.18em] after:absolute after:inset-0 after:content-[''] group-hover:underline"
                >
                  {p.title}
                </Link>
              </Heading>
              <p className="mt-3 max-w-[62ch] text-muted">{p.summary}</p>
              <PipelineCompact steps={p.pipeline} className="mt-6" />
            </div>
            <div className="flex flex-col justify-between gap-6">
              <ul
                aria-label="Tech stack"
                className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted md:flex-col"
              >
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <span
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ink"
              >
                Read the case study
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
