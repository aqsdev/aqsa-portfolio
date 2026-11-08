import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { buttonStyles } from "@/components/button";
import { Container, Layout } from "@/components/Layout";
import { PipelineDiagram } from "@/components/Pipeline";
import { getNextProject, getProject } from "@/data/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: getNextProject(params.slug) };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo({
          title: loaderData.project.title,
          description: loaderData.project.summary,
          path: `/work/${params.slug}`,
          type: "article",
        })
      : {},
  component: CaseStudy,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-12 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
      <h2 className="type-h3">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function CaseStudy() {
  const { project: p, next } = Route.useLoaderData();

  return (
    <Layout>
      <article>
        <Container className="pt-10 sm:pt-14">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[0.95rem] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All work
          </Link>

          <header className="mt-10">
            <p className="flex flex-wrap gap-x-4 text-sm">
              <span className="font-medium text-accent">{p.category}</span>
              {p.year && <span className="text-muted">{p.year}</span>}
            </p>
            <h1 className="type-h1 mt-3 max-w-[20ch]">{p.title}</h1>
            <p className="type-lead mt-6 max-w-[60ch]">{p.summary}</p>

            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr]">
              {p.role && (
                <div>
                  <dt className="text-sm text-muted">My role</dt>
                  <dd className="mt-1 font-medium">{p.role}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-muted">Stack</dt>
                <dd className="mt-1 font-medium">{p.stack.join(", ")}</dd>
              </div>
            </dl>

            {(p.links.live || p.links.repo) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {p.links.live && (
                  <a
                    href={p.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles("primary")}
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    Visit the live site
                  </a>
                )}
                {p.links.repo && (
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles("secondary")}
                  >
                    <Code2 className="size-4" aria-hidden="true" />
                    View the source code
                  </a>
                )}
              </div>
            )}
          </header>
        </Container>

        {p.cover && (
          <Container className="mt-14">
            <img
              src={p.cover.src}
              alt={p.cover.alt}
              className="w-full rounded-2xl border border-line"
              loading="eager"
            />
          </Container>
        )}

        <Container className="mt-16">
          <Section title="The problem">
            <p className="prose-body">{p.problem}</p>
          </Section>

          <Section title="What I built">
            <div className="prose-body">
              {p.solution.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            {p.highlights.length > 0 && (
              <ul className="mt-7 max-w-[66ch] space-y-2.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          {p.pipeline.length > 0 && (
            <section className="border-t border-line py-12">
              <h2 className="type-h3">How it works</h2>
              <div className="mt-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <PipelineDiagram steps={p.pipeline} />
              </div>
            </section>
          )}

          {p.results.length > 0 && (
            <Section title="Results">
              <ul className="max-w-[66ch] space-y-2.5">
                {p.results.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </Container>
      </article>

      <Container className="pb-24">
        <div className="grid gap-6 border-t border-line pt-12 md:grid-cols-2">
          {next && (
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              className="group rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-line-strong"
            >
              <span className="text-sm text-muted">Next project</span>
              <span className="type-h3 mt-2 flex items-start justify-between gap-4">
                {next.title}
                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          )}
          <div className="rounded-2xl bg-accent-soft p-7">
            <p className="type-h3">Need something like this?</p>
            <p className="mt-2 text-muted">Tell me what your team is working on.</p>
            <Link to="/contact" className={buttonStyles("primary", "mt-5")}>
              Get in touch
            </Link>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
