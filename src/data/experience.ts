/**
 * Work history, newest first. Taken from your CV.
 */
export type Role = {
  title: string;
  /** Leave empty to hide. */
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    title: "Freelance AI & Backend Developer",
    company: "Self-Employed",
    location: "Remote",
    start: "Mar 2026",
    end: "Present",
    summary:
      "AI-powered applications, intelligent automation systems and custom backend solutions for independent clients.",
    highlights: [
      "Built a configurable Python-based conversational AI engine integrating LLM APIs, intent detection, structured conversation flows and YAML-driven playbooks.",
      "Integrated OpenAI-compatible LLM services through API gateways, implementing context-aware prompting and stage-based conversational experiences.",
      "Developed browser automation solutions using Playwright and Selenium to automate repetitive web interactions and operational processes.",
      "Built custom backend services and API integrations using Python, PHP and Node.js, connecting AI capabilities to existing applications and external platforms.",
    ],
  },
  {
    title: "Backend & AI Automation Developer",
    company: "Gosign GmbH",
    location: "Remote, Germany",
    start: "Mar 2023",
    end: "Feb 2026",
    summary:
      "Enterprise backend systems, AI platform development and TYPO3 integrations for clients across Europe.",
    highlights: [
      "Engineered and maintained enterprise software supporting a user base of 100,000+ across Europe.",
      "Built an AI-powered document pipeline handling 1,000+ documents: PDF extraction, sensitive-data and signature redaction, merging, TYPO3 storage and automated replies.",
      "Developed custom TYPO3 extensions and privacy-focused functionality supporting GDPR-related data protection requirements.",
      "Contributed to an internal enterprise AI platform with multi-model LLM integration, collaborative chat, AI-powered text/image generation and RAG-based document search.",
      "Implemented enterprise integrations with Microsoft Entra ID and Microsoft Graph API, enabling SSO and secure access to Microsoft 365 resources.",
      "Architected custom TYPO3 extensions and REST API integrations using PHP, Extbase and Fluid for international client projects.",
      "Collaborated with distributed engineering teams using Docker, GitHub, GitLab, code reviews and CI/CD.",
    ],
  },
  {
    title: "WordPress Developer (Intern)",
    company: "Yellow Sols",
    location: "",
    start: "Jun 2022",
    end: "Sep 2022",
    summary: "Custom WordPress themes and plugins for responsive, SEO-friendly websites.",
    highlights: [
      "Developed and customised WordPress themes and plugins using PHP for client-specific functionality.",
      "Built responsive, SEO-friendly website interfaces using HTML, CSS, Bootstrap and JavaScript.",
      "Supported debugging and cross-browser compatibility improvements.",
    ],
  },
];

export const education = [
  {
    degree: "BS Computer Science",
    school: "University of Sargodha",
    start: "2019",
    end: "2023",
  },
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Urdu", level: "Native" },
  { name: "Punjabi", level: "Native" },
  { name: "Arabic", level: "Basic" },
];

export function formatPeriod(role: { start: string; end: string }): string {
  if (role.start && role.end) return `${role.start} – ${role.end}`;
  return role.start || role.end;
}
