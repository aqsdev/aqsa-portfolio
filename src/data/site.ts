/**
 * Site-wide settings. This is the main file to edit.
 * Anything marked TODO needs your input before launch.
 */
export const site = {
  name: "Aqsa Shakoor",
  firstName: "Aqsa",
  role: "AI Automation Engineer & Full-Stack Developer",
  headline: "I build automations that think before they act.",
  intro:
    "LLM apps, RAG pipelines and n8n workflows for startups and founders. Systems that read the situation, decide the next step and bring in a person when it matters.",
  description:
    "Aqsa Shakoor is a full-stack developer and AI automation engineer with 3+ years of experience building n8n workflows, document processing pipelines, API integrations and LLM apps.",
  url: import.meta.env.SITE_URL,
  email: "aqsashakoor21@gmail.com",
  linkedin: "https://www.linkedin.com/in/aqsa-shakoor-523041216/",
  github: "https://github.com/aqsdev",
  availability: {
    open: true,
    text: "Available for remote roles and freelance projects",
  },
  /** How quickly you usually answer messages. Shown on the contact page. */
  responseTime: "I usually reply within one working day.",
  /** Where and when you work. From your CV. */
  workingHours: "I work remotely, on European and Middle East time zones.",
  /**
   * Your CV lives at public/Aqsa-Shakoor-Resume.pdf. To update it, replace that
   * file (keep the name). Set ready: false to hide every résumé button.
   */
  resume: {
    href: "/Aqsa-Shakoor-Resume.pdf",
    ready: true,
  },
  /**
   * TODO: Add a square photo (at least 800×800) at public/images/aqsa-shakoor.jpg,
   * then set src to "/images/aqsa-shakoor.jpg". Until then a monogram is shown.
   */
  photo: {
    src: null as string | null,
    alt: "Portrait of Aqsa Shakoor",
  },
} as const;

export const nav = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/** What you offer. Shown on the home page. */
export const services = [
  {
    title: "LLM apps and RAG",
    body: "Assistants and search tools that answer from your own documents, cite their sources and stay inside the permissions you set.",
    tools: ["OpenAI", "Anthropic", "LangChain", "Vector search", "Azure AI"],
  },
  {
    title: "Workflow automation",
    body: "n8n workflows and document pipelines that route, process and report on their own, and hand off to a person when a decision needs judgement.",
    tools: ["n8n", "Python", "PDF processing", "REST APIs", "Docker"],
  },
  {
    title: "Full-stack web apps",
    body: "The product around the AI: APIs, dashboards and interfaces that people actually open every day.",
    tools: ["React", "TypeScript", "Node.js", "PHP", "TYPO3", "WordPress"],
  },
] as const;

/** How a project runs, in order. Shown on the home page. */
export const process = [
  {
    title: "Understand the work",
    body: "We map the process as it runs today and agree on what a good result looks like.",
  },
  {
    title: "Prototype quickly",
    body: "A working version on real data within days, so decisions are based on evidence.",
  },
  {
    title: "Build it properly",
    body: "Tests, error handling, logging and access control. The parts that keep it running.",
  },
  {
    title: "Hand it over",
    body: "Documentation and a walkthrough, so your team can run and change it without me.",
  },
] as const;

/**
 * Grouped technical skills. Shown on the about page.
 * From your CV, plus the AI tools listed on your original site
 * (RAG, LangChain, OpenAI/Anthropic, Azure AI, FastAPI, Next.js).
 * TODO: remove any you don't want to be asked about in an interview.
 */
export const skillGroups = [
  {
    title: "AI and automation",
    items: [
      "n8n workflows",
      "AI chatbots",
      "LLM integration (OpenAI, Anthropic)",
      "RAG pipelines",
      "LangChain",
      "Azure AI",
      "PDF and document processing",
      "API integrations",
    ],
  },
  {
    title: "Back end",
    items: ["PHP", "Node.js", "Python", "FastAPI", "REST APIs", "MySQL"],
  },
  {
    title: "Front end",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5 and CSS3"],
  },
  {
    title: "CMS",
    items: ["TYPO3 (Extbase, Fluid)", "WordPress plugin development", "Joomla"],
  },
  {
    title: "DevOps and tools",
    items: ["Docker", "DigitalOcean", "ISPConfig", "MAMP", "GitHub and GitLab", "Jira"],
  },
] as const;
