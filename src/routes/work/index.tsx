import { createFileRoute } from "@tanstack/react-router";
import { Container, Layout } from "@/components/Layout";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  head: () =>
    seo({
      title: "Work",
      path: "/work",
      description:
        "Case studies by Aqsa Shakoor: an automated document processing pipeline, a document intelligence system, a private group AI assistant and agentic n8n workflows.",
    }),
  component: Work,
});

function Work() {
  return (
    <Layout>
      <Container className="pb-24 pt-14 sm:pt-20">
        <h1 className="type-h1">Work</h1>
        <p className="type-lead mt-5 max-w-[56ch]">
          AI systems, automations and web apps I’ve built. Each case study covers the problem, what
          I built and how it works.
        </p>
        <div className="mt-14">
          <ProjectList projects={projects} headingLevel="h2" />
        </div>
        <p className="mt-10 text-muted">
          More of my code and experiments are on{" "}
          <a className="link" href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </Container>
    </Layout>
  );
}
