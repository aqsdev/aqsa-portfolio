import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Eye } from "lucide-react";
import { Availability } from "@/components/Availability";
import { buttonStyles } from "@/components/button";
import { Container, Layout } from "@/components/Layout";
import { site, skillGroups } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About",
      path: "/about",
      type: "profile",
      description:
        "Aqsa Shakoor is an AI Engineer and full-stack developer with 4+ years of experience building LLM applications, RAG pipelines, AI agents and backend automation for enterprise clients.",
    }),
  component: About,
});

const principles = [
  {
    title: "Plain language",
    body: "You’ll always know what I’m building and why, without having to learn the jargon.",
  },
  {
    title: "A person stays in charge",
    body: "Automation handles the routine. Decisions that need judgement go to someone on your team.",
  },
  {
    title: "Built to be handed over",
    body: "Documented, logged and readable, so the system doesn’t depend on me to keep running.",
  },
];

function Portrait() {
  if (site.photo.src) {
    return (
      <img
        src={site.photo.src}
        alt={site.photo.alt}
        width={800}
        height={800}
        className="aspect-square w-full rounded-3xl border border-line object-cover"
      />
    );
  }
  // Shown until a photo is added in src/data/site.ts
  return (
    <div
      aria-hidden="true"
      className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-3xl bg-accent"
    >
      <span className="font-display text-[9rem] font-bold leading-none tracking-[-0.07em] text-accent-ink">
        as
      </span>
      <span className="absolute right-[18%] top-[20%] size-7 rounded-full border-[5px] border-accent bg-signal" />
    </div>
  );
}

function About() {
  return (
    <Layout>
      <Container className="grid gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <div>
          <h1 className="type-h1 max-w-[18ch]">
            AI Engineer building systems that hold up in production.
          </h1>
          <div className="prose-body mt-8 text-[1.1rem]">
            <p>
              I’m {site.name}, an AI Engineer and full-stack developer with 4+ years building
              LLM-integrated applications, conversational AI, RAG-based document retrieval, AI
              agents and automation workflows.
            </p>
            <p>
              At Gosign GmbH, working remotely with a team in Germany, I contributed to enterprise
              platforms supporting 100,000+ users across Europe, across the full stack: backend
              architecture and API development, TYPO3 extensions, enterprise authentication and
              integrations, AI-powered automation, and the internal AI platform itself. If it
              touched a production system, I was probably in it.
            </p>
            <p>
              Now I work independently with startups, small businesses and non-technical founders on
              the same thing: take a slow, repetitive process and make it run by itself, reliably,
              with a person still in charge of the decisions that matter. Because I come from
              backend engineering, what I ship comes with proper APIs, access control and logging,
              not just a prompt.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className={buttonStyles("primary")}>
              Get in touch
            </Link>
            {site.resume.ready && (
              <a
                href={site.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("secondary")}
              >
                <Eye className="size-4" aria-hidden="true" />
                View résumé
              </a>
            )}
          </div>
        </div>
        <div className="order-first max-w-xs lg:order-none lg:max-w-none">
          <Portrait />
          <Availability className="mt-5" />
        </div>
      </Container>

      <section aria-labelledby="experience-cta-title" className="border-t border-line py-20">
        <Container>
          <Link
            to="/experience"
            className="group flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line-strong bg-surface px-8 py-10 transition-colors hover:border-accent"
          >
            <div>
              <h2 id="experience-cta-title" className="type-h2">
                Experience, education and languages
              </h2>
              <p className="mt-3 max-w-[56ch] text-muted">
                Full work history with a year-by-year timeline, plus my education and languages.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink">
              View experience
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Container>
      </section>

      <section aria-labelledby="skills-title" className="border-t border-line bg-surface py-20">
        <Container>
          <h2 id="skills-title" className="type-h2">
            Skills and tools
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.title}>
                <h3 className="font-medium text-ink">{g.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line-strong bg-bg px-3 py-1 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="border-t border-line py-20">
        <Container>
          <h2 id="principles-title" className="type-h2">
            How I work
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="border-t-2 border-accent pt-6">
                <h3 className="type-h3">{p.title}</h3>
                <p className="mt-2 text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}
