import { createFileRoute } from "@tanstack/react-router";
import { Container, Layout } from "@/components/Layout";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Reveal } from "@/components/Reveal";
import { education, experience, formatPeriod, languages } from "@/data/experience";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/experience")({
  head: () =>
    seo({
      title: "Experience",
      path: "/experience",
      type: "profile",
      description:
        "Aqsa Shakoor's work history: AI and backend engineering roles building production systems for enterprise clients.",
    }),
  component: Experience,
});

function Experience() {
  return (
    <Layout>
      <Container className="pb-20 pt-14 sm:pt-20">
        <h1 className="type-h1 max-w-[20ch]">Experience</h1>
        <p className="type-lead mt-5 max-w-[56ch]">
          Where I've worked, what I built, and roughly when.
        </p>
      </Container>

      <section aria-labelledby="experience-title" className="border-t border-line py-20">
        <Container>
          <h2 id="experience-title" className="sr-only">
            Work history
          </h2>
          <ExperienceTimeline roles={experience} />
        </Container>
      </section>

      <section aria-labelledby="education-title" className="border-t border-line py-20">
        <Container className="grid gap-14 md:grid-cols-2">
          <Reveal as="div">
            <h2 id="education-title" className="type-h2">
              Education
            </h2>
            <ul className="mt-8 space-y-6">
              {education.map((e) => (
                <li key={e.degree}>
                  <h3 className="type-h3">{e.degree}</h3>
                  <p className="mt-1 text-muted">
                    {e.school}, {formatPeriod(e)}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="div" delay={120}>
            <h2 id="languages-title" className="type-h2">
              Languages
            </h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {languages.map((l) => (
                <div key={l.name} className="flex justify-between gap-4 py-3">
                  <dt className="font-medium">{l.name}</dt>
                  <dd className="text-muted">{l.level}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>
    </Layout>
  );
}
