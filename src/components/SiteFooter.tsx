import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { nav, site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import { Monogram } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Monogram />
            <p className="font-display text-lg font-semibold">{site.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-[0.95rem] text-muted">{site.role}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-medium text-ink">Pages</p>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            <li>
              <Link to="/" className="text-muted transition-colors hover:text-ink">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-medium text-ink">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <LinkedInIcon className="size-4" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-muted sm:px-8">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
