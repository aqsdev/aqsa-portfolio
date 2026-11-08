/**
 * Projects and case studies.
 *
 * - Only projects with status "published" appear on the site.
 *   Drafts are ignored, so a half-finished entry can never go live by accident.
 * - The slug becomes the page address: /work/<slug>
 * - Review every sentence below; the text was expanded from your original
 *   summaries and needs your real details. Replace the TODO notes with facts
 *   (numbers are best: hours saved, documents processed, users, response time).
 */

export type ProjectCategory = "AI & RAG" | "Automation" | "Web";

export type PipelineStep = {
  label: string;
  detail: string;
};

export type Project = {
  slug: string;
  status: "published" | "draft";
  featured: boolean;
  title: string;
  /** One sentence. Shown in lists and as the page description. */
  summary: string;
  category: ProjectCategory;
  year: string;
  role: string;
  problem: string;
  solution: string[];
  /** The steps of the system, in order. Drawn as a pipeline diagram. */
  pipeline: PipelineStep[];
  highlights: string[];
  results: string[];
  stack: string[];
  links: { live?: string; repo?: string };
  /** Optional screenshot, e.g. { src: "/images/work/document-intelligence.png", alt: "…" } */
  cover?: { src: string; alt: string };
};

const allProjects: Project[] = [
  {
    slug: "document-processing-pipeline",
    status: "published",
    featured: true,
    title: "Automated Document Processing Pipeline",
    summary:
      "An email-triggered pipeline that redacts sensitive data from PDF attachments, merges the documents, stores them in TYPO3 and replies with a secure link, without anyone touching the files.",
    category: "Automation",
    year: "", // TODO: add the year (hidden while empty)
    role: "Design and development at Gosign GmbH",
    problem:
      "Documents arrived as email attachments and had to be checked for sensitive data, redacted, combined and filed by hand before anyone could reply. It was slow, repetitive work where a single missed field could expose private information.",
    solution: [
      "I built a pipeline that starts the moment an email arrives. It pulls the PDF attachments, finds and redacts sensitive data, and merges the documents into one file.",
      "The processed file is stored in TYPO3 through its API. The pipeline then generates a secure link to the file and sends an automated reply to the sender.",
    ],
    pipeline: [
      { label: "Email arrives", detail: "An incoming email with PDF attachments starts the run." },
      { label: "Extract", detail: "Read the text and data from each PDF." },
      { label: "Redact", detail: "Find sensitive data and remove it." },
      { label: "Merge", detail: "Combine the documents into a single file." },
      { label: "Store in TYPO3", detail: "Upload the file to TYPO3 through its API." },
      { label: "Reply with a link", detail: "Send the sender a secure link automatically." },
    ],
    highlights: [
      "Runs end to end with no manual steps",
      "Sensitive data is redacted before the file is stored or shared",
      "Files are shared as secure links, not attachments",
      "Runs in production, deployed with Docker",
    ],
    results: [
      "TODO: add a measurable result, e.g. documents processed per week or time saved per document",
    ],
    stack: ["n8n", "PHP", "TYPO3", "REST APIs", "PDF processing", "Docker"],
    links: {},
  },
  {
    slug: "document-intelligence",
    status: "published",
    featured: true,
    title: "Document Intelligence System",
    summary:
      "A retrieval-augmented system that ingests large document sets, extracts their structure and answers questions with the source passage attached.",
    category: "AI & RAG",
    year: "", // TODO: add the year (hidden while empty)
    role: "Design, back end and AI pipeline",
    problem:
      "Teams were answering questions by searching through large sets of long documents by hand. Finding the right passage was slow, and answers depended on who happened to know where to look.",
    solution: [
      "I built a pipeline that ingests the documents, splits them along their real structure (sections, tables, headings) rather than fixed-size chunks, and indexes them for semantic search.",
      "Questions go through a retrieval-augmented generation step: the system finds the most relevant passages, and the language model answers only from those passages, with references back to the source.",
    ],
    pipeline: [
      { label: "Ingest", detail: "Upload PDFs and office documents in bulk." },
      { label: "Extract structure", detail: "Detect sections, tables and headings." },
      { label: "Embed and index", detail: "Store passages in a vector index." },
      { label: "Retrieve", detail: "Find the passages most relevant to the question." },
      { label: "Answer with sources", detail: "Generate an answer grounded in those passages." },
    ],
    highlights: [
      "Structure-aware chunking, so answers keep the context of their section",
      "Every answer links to the passages it was built from",
      "FastAPI service that other tools can call",
    ],
    results: [
      "TODO: add a measurable result, e.g. time to find an answer before and after",
      "TODO: add scale, e.g. number of documents or pages processed",
    ],
    stack: ["Python", "FastAPI", "OpenAI", "Vector search", "RAG"],
    links: {},
  },
  {
    slug: "private-group-assistant",
    status: "published",
    featured: true,
    title: "Private Group AI Assistant",
    summary:
      "Shared team workspaces where invited members use one AI assistant for project discussion, roadmaps and architecture, with access scoped to the group.",
    category: "AI & RAG",
    year: "", // TODO: add the year (hidden while empty)
    role: "Full-stack development",
    problem:
      "Teams wanted to use an AI assistant together on the same project, but personal chat tools keep every conversation private to one person and have no idea who should see what.",
    solution: [
      "I built a workspace model: a group owner invites members, and everyone in the group shares one assistant and one conversation history.",
      "Access is checked on every request, so the assistant only ever sees the context of the group it is answering for.",
    ],
    pipeline: [
      { label: "Invite", detail: "The owner invites members to a private workspace." },
      { label: "Authenticate", detail: "Members sign in and are checked against the group." },
      { label: "Load group context", detail: "Only that workspace's history and files are used." },
      { label: "Ask the assistant", detail: "The LLM answers with the shared project context." },
    ],
    highlights: [
      "Group-scoped permissions enforced on the server",
      "Shared history for roadmaps and architecture discussions",
      "React front end on a Node.js API",
    ],
    results: ["TODO: add a result, e.g. number of teams or active members"],
    stack: ["Node.js", "React", "LLM APIs", "Authentication", "Permissions"],
    links: {},
  },
  {
    slug: "agentic-n8n-workflows",
    status: "published",
    featured: true,
    title: "Agentic n8n Workflows",
    summary:
      "Automations that decide the next step instead of following a fixed path: routing, enrichment and reporting, with a person in the loop for uncertain cases.",
    category: "Automation",
    year: "", // TODO: add the year (hidden while empty)
    role: "Workflow design and development",
    problem:
      "Classic automations follow one fixed path. When an input doesn't fit the expected shape, the workflow either breaks or does the wrong thing quietly.",
    solution: [
      "I built n8n workflows where a language model reads each incoming item, classifies it and chooses the next step from a defined set of actions.",
      "When the model isn't confident, the item is routed to a person for review instead of guessing. Every decision is logged so the workflow can be checked and improved.",
    ],
    pipeline: [
      { label: "Trigger", detail: "A webhook, email or schedule starts the workflow." },
      { label: "Classify", detail: "The LLM reads the input and decides what it is." },
      { label: "Route", detail: "Pick the next action based on that decision." },
      { label: "Review if unsure", detail: "Low-confidence items go to a person." },
      { label: "Report", detail: "Results and decisions are logged and summarised." },
    ],
    highlights: [
      "Decision steps with explicit confidence checks",
      "Human-in-the-loop review for edge cases",
      "Python helpers for enrichment and data cleanup",
    ],
    results: ["TODO: add a result, e.g. hours of manual work saved per week"],
    stack: ["n8n", "Python", "Webhooks", "REST APIs", "LLM APIs"],
    links: {},
  },

  // ─── Drafts: fill these in and change status to "published" ───────────────
  {
    slug: "project-four",
    status: "draft",
    featured: false,
    title: "Project title",
    summary: "One sentence about what it does and for whom.",
    category: "Web",
    year: "",
    role: "",
    problem: "",
    solution: [],
    pipeline: [],
    highlights: [],
    results: [],
    stack: [],
    links: {},
  },
  {
    slug: "project-five",
    status: "draft",
    featured: false,
    title: "Project title",
    summary: "One sentence about what it does and for whom.",
    category: "Web",
    year: "",
    role: "",
    problem: "",
    solution: [],
    pipeline: [],
    highlights: [],
    results: [],
    stack: [],
    links: {},
  },
];

/** Results that still contain a TODO note are never shown to visitors. */
function clean(project: Project): Project {
  return {
    ...project,
    results: project.results.filter((r) => !r.trim().startsWith("TODO")),
  };
}

export const projects: Project[] = allProjects.filter((p) => p.status === "published").map(clean);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1 || projects.length < 2) return undefined;
  return projects[(i + 1) % projects.length];
}
