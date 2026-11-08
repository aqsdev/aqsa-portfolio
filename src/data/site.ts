/**
 * Site-wide settings. This is the main file to edit.
 * Anything marked TODO needs your input before launch.
 */
export const site = {
  name: "Aqsa Shakoor",
  firstName: "Aqsa",
  role: "AI Engineer & Backend Automation Specialist",
  headline: "I build AI systems that run inside real businesses, not just demos.",
  intro:
    "LLM applications, RAG pipelines, conversational AI and n8n automation for teams that need production-grade systems, not prototypes. 4+ years shipping backend and AI work for enterprise clients across Europe.",
  description:
    "Aqsa Shakoor is an AI Engineer and full-stack developer with 4+ years of experience building LLM-integrated applications, RAG document retrieval, AI agents and automation workflows for enterprise platforms used by 100,000+ people.",
  url: import.meta.env.SITE_URL,
  email: "aqsashakoor21@gmail.com",
  phone: "+92 311 7145120",
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
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/resume", label: "Résumé" },
  { to: "/contact", label: "Contact" },
] as const;

/** Headline numbers. Shown as stat tiles on the home page. */
export const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "100,000+", label: "Users on platforms I've built for" },
  { value: "1,000+", label: "Documents handled by my automation" },
] as const;

/** What you offer. Shown on the home page. */
export const services = [
  {
    title: "Full-stack web development",
    body: "Complete web products, not just the AI layer: APIs, dashboards, CMS platforms and the interfaces people actually open every day.",
    tools: ["PHP", "Python", "Node.js", "React", "TYPO3", "WordPress", "MySQL"],
  },
  {
    title: "LLM apps, RAG and AI agents",
    body: "Conversational AI, retrieval-augmented document search and multi-model LLM integrations that answer from your own data, cite their sources, and plug into enterprise sign-in (Microsoft Entra ID, Graph API).",
    tools: ["OpenAI APIs", "RAG", "Embeddings", "Vector search", "Supabase", "Microsoft Graph"],
  },
  {
    title: "AI automation and workflows",
    body: "n8n workflows, browser automation and document pipelines that classify, redact, route and report on their own, backed by proper REST APIs, with a person in the loop for judgement calls.",
    tools: ["n8n", "Python", "Playwright", "PDF processing", "Docker", "REST APIs"],
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
    title: "AI engineering & intelligent systems",
    items: [
      "Large Language Models (LLMs)",
      "AI agents",
      "Retrieval-Augmented Generation (RAG)",
      "Conversational AI",
      "Prompt engineering",
      "OpenAI APIs",
      "Multi-model LLM integration",
      "Embeddings",
      "Vector databases",
    ],
  },
  {
    title: "AI automation & orchestration",
    items: [
      "n8n",
      "Workflow automation",
      "Business process automation",
      "Webhooks",
      "Browser automation",
      "Playwright",
      "Selenium",
      "ManyChat",
    ],
  },
  {
    title: "Backend engineering & APIs",
    items: [
      "Python",
      "Node.js",
      "PHP",
      "TypeScript",
      "RESTful API development",
      "System integration",
    ],
  },
  {
    title: "Frontend",
    items: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive web development"],
  },
  {
    title: "CMS & enterprise platforms",
    items: ["TYPO3", "WordPress plugin development", "Joomla"],
  },
  {
    title: "Databases & storage",
    items: ["MySQL", "PostgreSQL", "Redis", "SQLite", "Supabase", "Vector databases"],
  },
  {
    title: "Cloud, DevOps & infrastructure",
    items: [
      "Docker",
      "DigitalOcean",
      "Linux server administration",
      "CI/CD",
      "Git, GitHub, GitLab",
    ],
  },
  {
    title: "Enterprise integrations",
    items: ["Microsoft Graph API", "Microsoft Entra ID", "SSO", "Jira", "Slack", "Agile/Scrum"],
  },
] as const;
