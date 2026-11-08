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
    title: "Backend & AI Automation Developer",
    company: "Gosign GmbH",
    location: "Remote, Germany",
    start: "Mar 2023",
    end: "Feb 2026",
    summary:
      "Back-end systems, TYPO3 extension development and AI-driven automation for production environments.",
    highlights: [
      "Built an email-triggered document pipeline that extracts and redacts sensitive data from PDFs, merges documents, stores them in TYPO3 and replies with secure links.",
      "Developed and maintained custom TYPO3 extensions with Extbase and Fluid.",
      "Built REST API integrations between external services and TYPO3.",
      "Designed AI-driven automation workflows in n8n and integrated AI chatbots into web platforms.",
      "Optimised MySQL queries to improve back-end performance.",
      "Deployed applications with Docker and managed hosting with ISPConfig.",
      "Worked with front-end teams using React and TypeScript.",
    ],
  },
  {
    title: "WordPress Developer (Intern)",
    company: "Yellow Sols",
    location: "",
    start: "Jun 2022",
    end: "Sep 2022",
    summary: "Custom WordPress themes and plugins for responsive, fast websites.",
    highlights: [
      "Developed custom WordPress themes and plugins.",
      "Built responsive, optimised websites.",
      "Implemented front-end features with HTML, CSS and JavaScript.",
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
  { name: "Arabic", level: "Basic" },
];

export function formatPeriod(role: { start: string; end: string }): string {
  if (role.start && role.end) return `${role.start} – ${role.end}`;
  return role.start || role.end;
}
