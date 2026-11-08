import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Availability } from "@/components/Availability";
import { ContactForm } from "@/components/ContactForm";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";
import { Container, Layout } from "@/components/Layout";
import { site } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact",
      path: "/contact",
      description:
        "Contact Aqsa Shakoor about AI automation, LLM and RAG projects, n8n workflows, full-stack web apps or remote roles.",
    }),
  component: Contact,
});

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail, external: false },
  {
    label: "LinkedIn",
    value: "Aqsa Shakoor",
    href: site.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  { label: "GitHub", value: "aqsdev", href: site.github, Icon: GitHubIcon, external: true },
];

function Contact() {
  return (
    <Layout>
      <Container className="grid gap-16 pb-24 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <div>
          <h1 className="type-h1 max-w-[16ch]">Let’s talk about what you’re building.</h1>
          <p className="type-lead mt-5 max-w-[54ch]">
            Tell me about the role, the project or the process you’d like to automate. Plain
            language is perfect.
          </p>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>

        <aside aria-labelledby="direct-title" className="lg:pt-3">
          <h2 id="direct-title" className="type-h3">
            Prefer to reach out directly?
          </h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{label}</span>
                    <span className="block truncate font-medium text-ink group-hover:underline">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Availability className="mt-8" />
          <p className="mt-3 text-[0.95rem] text-muted">{site.responseTime}</p>
          <p className="mt-3 text-[0.95rem] text-muted">{site.workingHours}</p>
        </aside>
      </Container>
    </Layout>
  );
}
