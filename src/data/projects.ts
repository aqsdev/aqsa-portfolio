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
    year: "2024",
    role: "Design and development at Gosign GmbH",
    problem:
      "Documents arrived as email attachments and had to be checked for sensitive data, redacted, combined and filed by hand before anyone could reply. It was slow, repetitive work where a single missed field could expose private information.",
    solution: [
      "I built an event-driven n8n workflow that starts the moment an email arrives. It pulls the PDF attachments, and runs them through configurable blocklist and allowlist rules alongside an AI model to identify and redact sensitive terms while preserving protected ones. A separate signature-detection service handles redacting signatures.",
      "The processed files are merged and stored in TYPO3 through its API. The pipeline then generates a public or protected file link and sends an automated reply to the sender.",
    ],
    pipeline: [
      { label: "Email arrives", detail: "An incoming email with PDF attachments starts the run." },
      { label: "Extract", detail: "Read the text and data from each PDF." },
      {
        label: "Redact",
        detail: "An AI model and rule lists find and remove sensitive data and signatures.",
      },
      { label: "Merge", detail: "Combine the documents into a single file." },
      { label: "Store in TYPO3", detail: "Upload the file to TYPO3 through its API." },
      { label: "Reply with a link", detail: "Send the sender a secure link automatically." },
    ],
    highlights: [
      "Runs end to end with no manual steps",
      "AI-assisted redaction with configurable allow/block lists plus a dedicated signature-detection service",
      "Files are shared as secure links, not attachments",
      "Runs in production, deployed with Docker",
    ],
    results: [
      "Built to handle 1,000+ documents in production for enterprise clients across Europe",
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
    year: "2025",
    role: "Design, back end and AI pipeline at Gosign GmbH",
    problem:
      "Teams were answering questions by searching through large sets of organisational documents by hand. Finding the right passage was slow, and answers depended on who happened to know where to look.",
    solution: [
      "I implemented and supported RAG-based document question-answering: document ingestion, chunking, embedding generation and vector storage using Supabase, so users can retrieve relevant information from organisational documents.",
      "Questions go through a retrieval-augmented generation step: the system finds the most relevant passages, and the language model answers from those passages, with references back to the source.",
    ],
    pipeline: [
      { label: "Ingest", detail: "Upload documents in bulk." },
      { label: "Chunk", detail: "Split documents into retrievable passages." },
      {
        label: "Embed and index",
        detail: "Generate embeddings and store them in Supabase as a vector index.",
      },
      { label: "Retrieve", detail: "Find the passages most relevant to the question." },
      { label: "Answer with sources", detail: "Generate an answer grounded in those passages." },
    ],
    highlights: [
      "Document ingestion, chunking and embedding pipeline feeding a Supabase vector store",
      "Every answer is grounded in retrieved passages",
      "Part of an internal enterprise AI platform used across the organisation",
    ],
    results: ["Built as part of an enterprise AI platform supporting 100,000+ users across Europe"],
    stack: ["Python", "OpenAI APIs", "Supabase", "Vector search", "RAG"],
    links: {},
  },
  {
    slug: "private-group-assistant",
    status: "published",
    featured: true,
    title: "Internal ChatGPT-Style AI Platform",
    summary:
      "An enterprise AI platform with collaborative group chats, multi-model text and image generation, and Microsoft 365 single sign-on.",
    category: "AI & RAG",
    year: "2025",
    role: "Contributor at Gosign GmbH",
    problem:
      "Teams wanted to use an AI assistant together on the same project, with multi-model generation and secure access tied to their existing Microsoft 365 accounts, not a personal consumer chat tool.",
    solution: [
      "I contributed to an internal enterprise AI platform featuring a conversational interface, collaborative group chats, and multi-model text and image generation.",
      "I integrated enterprise authentication through Microsoft Entra ID and Microsoft Graph API, enabling single sign-on and secure access to organisational resources within Microsoft 365.",
    ],
    pipeline: [
      { label: "Sign in with Entra ID", detail: "Members authenticate through Microsoft 365 SSO." },
      {
        label: "Load group context",
        detail: "Only that workspace's shared history and files are used.",
      },
      {
        label: "Ask the assistant",
        detail: "The LLM answers with the shared project context, across multiple models.",
      },
      { label: "Generate", detail: "Text or image generation, depending on what's asked." },
    ],
    highlights: [
      "Microsoft Entra ID and Graph API integration for SSO and secure Microsoft 365 access",
      "Multi-model LLM integration for text and image generation",
      "Shared group chat history for collaborative project discussion",
    ],
    results: ["Deployed internally for an enterprise platform with 100,000+ users across Europe"],
    stack: ["LLM APIs", "Microsoft Entra ID", "Microsoft Graph API", "RAG", "Supabase"],
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
    year: "2024",
    role: "Workflow design and development at Gosign GmbH",
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

  {
    slug: "config-driven-conversational-ai",
    status: "published",
    featured: false,
    title: "Config-Driven Conversational AI Engine",
    summary:
      "An asynchronous Python chatbot engine for ManyChat where conversation logic lives in YAML, not code, with Redis-backed queues for non-blocking messaging.",
    category: "AI & RAG",
    year: "2026",
    role: "Freelance, self-employed",
    problem:
      "A client needed a ManyChat chatbot with structured, stage-based conversations, but hard-coding every flow in application code meant every change to the conversation needed a developer and a deploy.",
    solution: [
      "I built an asynchronous Python conversational engine integrated with ManyChat, supporting intent detection, structured playbooks and stage-based conversation orchestration.",
      "Conversation flows, playbooks and logic are defined in YAML, so stages can be edited without touching the application code. OpenAI-compatible LLM APIs are integrated through the NanoGPT gateway with stage-specific, context-aware prompts.",
    ],
    pipeline: [
      { label: "Message arrives", detail: "ManyChat forwards an incoming message to the engine." },
      { label: "Detect intent", detail: "Classify what the user is asking for." },
      { label: "Load playbook", detail: "Read the matching YAML-defined conversation stage." },
      {
        label: "Prompt the LLM",
        detail: "Generate a context-aware response through the NanoGPT gateway.",
      },
      {
        label: "Queue and persist",
        detail: "Redis-backed queues and SQLite track conversation state.",
      },
    ],
    highlights: [
      "YAML-driven playbooks, so non-developers can change conversation logic",
      "Redis-backed persistent job queues for non-blocking message processing",
      "SQLite storage via aiosqlite for conversation-state persistence",
    ],
    results: [],
    stack: ["Python", "asyncio", "Redis", "SQLite", "PyYAML", "ManyChat", "LLM APIs"],
    links: {},
  },
  {
    slug: "twitter-reply-automation-bot",
    status: "published",
    featured: false,
    title: "Twitter/X Reply Automation Bot",
    summary:
      "A browser-automation bot that interacts with Twitter/X through driven workflows to handle repetitive reply operations.",
    category: "Automation",
    year: "2026",
    role: "Freelance, self-employed",
    problem:
      "Replying to a high volume of posts on Twitter/X by hand doesn't scale, and the platform's restrictions rule out most API-based approaches.",
    solution: [
      "I built a browser automation bot using Playwright and Selenium that drives a real browser session to interact with Twitter/X and automate repetitive reply-related operations.",
    ],
    pipeline: [
      { label: "Launch session", detail: "Start a browser session driven by Playwright/Selenium." },
      { label: "Find targets", detail: "Locate posts that match the reply criteria." },
      { label: "Reply", detail: "Compose and post replies through real browser interactions." },
    ],
    highlights: [
      "Browser-driven automation, no reliance on restricted APIs",
      "Handles repetitive reply operations at a volume manual work can't match",
    ],
    results: [],
    stack: ["Playwright", "Selenium", "Browser automation"],
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
