import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { buttonStyles } from "@/components/button";
import { Availability } from "@/components/Availability";
import { Container, Layout } from "@/components/Layout";
import { ProjectList } from "@/components/ProjectList";
import { Reveal } from "@/components/Reveal";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { featuredProjects } from "@/data/projects";
import { process, services, site, stats } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo({ path: "/", type: "profile" }),
  component: Home,
});

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section aria-labelledby="hero-title">
        <Container className="grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10 lg:pb-28 lg:pt-24">
          <div>
            <p className="enter text-[1.05rem] text-muted">
              Hi, I’m <span className="font-medium text-ink">{site.name}</span>, an AI automation
              engineer and full-stack developer.
            </p>
            <h1
              id="hero-title"
              className="type-display enter mt-5 max-w-[20ch]"
              style={{ animationDelay: "80ms" }}
            >
              {site.headline}
            </h1>
            <p className="type-lead enter mt-7 max-w-[52ch]" style={{ animationDelay: "160ms" }}>
              {site.intro}
            </p>
            <div className="enter mt-9 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link to="/work" className={buttonStyles("primary")}>
                See my work
              </Link>
              <Link to="/contact" className={buttonStyles("secondary")}>
                Get in touch
              </Link>
            </div>
            <Availability className="enter mt-9" style={{ animationDelay: "320ms" }} />
            <div
              className="enter mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8"
              style={{ animationDelay: "380ms" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="enter flex justify-center lg:justify-end"
            style={{ animationDelay: "200ms" }}
          >
            <WorkflowDiagram />
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work-title" className="pb-24">
        <Container>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="work-title" className="type-h2">
                Selected work
              </h2>
              <p className="mt-3 max-w-[56ch] text-muted">
                Systems built for real teams. Each case study covers the problem, what I built and
                how it works.
              </p>
            </div>
            <Link to="/work" className="link text-[0.95rem]">
              View all projects
            </Link>
          </Reveal>
          <ProjectList projects={featuredProjects} />
        </Container>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="border-y border-line bg-surface py-24">
        <Container>
          <Reveal as="h2" id="services-title" className="type-h2 max-w-[20ch]">
            What I can build for you
          </Reveal>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {services.map((s, i) => (
              <Reveal
                key={s.title}
                as="div"
                delay={i * 90}
                className="border-t-2 border-accent pt-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="type-h3">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
                <ul aria-label="Tools" className="mt-5 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <li key={t} className="pill">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="py-24">
        <Container>
          <Reveal as="h2" id="process-title" className="type-h2">
            How a project runs
          </Reveal>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90}>
                <span className="font-mono text-sm text-accent">Step {i + 1}</span>
                <h3 className="type-h3 mt-2">{step.title}</h3>
                <p className="mt-2 text-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Call to action */}
      <section aria-labelledby="cta-title" className="pb-24">
        <Container>
          <Reveal className="rounded-3xl bg-ink px-7 py-14 text-bg sm:px-14 sm:py-16">
            <h2 id="cta-title" className="type-h2 max-w-[22ch] !text-bg">
              Have a process that eats hours every week?
            </h2>
            <p className="mt-4 max-w-[52ch] text-bg/75">
              Tell me how it works today. I’ll tell you honestly whether automation is the right
              fix, and what it would take.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className={buttonStyles("primary", "hover:!bg-bg hover:!text-ink")}
              >
                Start a conversation
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-bg/30 px-5 py-2.5 text-[0.95rem] font-medium text-bg transition-colors hover:border-bg"
              >
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </Layout>
  );
}
