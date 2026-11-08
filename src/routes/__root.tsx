import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";
import { buttonStyles } from "@/components/button";
import { Container, Layout } from "@/components/Layout";
import { site } from "@/data/site";
import appCss from "../styles.css?url";

// Runs before first paint: applies the saved theme, or the system theme on a first visit.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})();`;

// Structured data so search engines understand this is a person's portfolio.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github],
  knowsAbout: [
    "AI automation",
    "Large language models",
    "Retrieval-augmented generation",
    "n8n",
    "Full-stack web development",
  ],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#f5f6f2", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#0a0c08", media: "(prefers-color-scheme: dark)" },
      { title: `${site.name} | ${site.role}` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      { children: themeScript },
      { type: "application/ld+json", children: JSON.stringify(personSchema) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    // data-theme is set by themeScript before hydration, so React must not warn about it.
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      {import.meta.env.PROD && <Analytics />}
    </>
  );
}

function NotFound() {
  return (
    <Layout>
      <Container className="py-24 sm:py-32">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="type-h1 mt-3 max-w-2xl">This page doesn’t exist.</h1>
        <p className="type-lead mt-5 max-w-xl">
          The link may be old, or the address may have a typo. These pages do exist:
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className={buttonStyles("primary")}>
            Go to the home page
          </Link>
          <Link to="/work" className={buttonStyles("secondary")}>
            See my work
          </Link>
        </div>
      </Container>
    </Layout>
  );
}

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  if (import.meta.env.DEV) console.error(error);
  return (
    <Layout>
      <Container className="py-24 sm:py-32">
        <h1 className="type-h1 max-w-2xl">This page didn’t load.</h1>
        <p className="type-lead mt-5 max-w-xl">
          Something went wrong while loading it. Try again, or email me at{" "}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className={buttonStyles("primary")}
            onClick={() => {
              void router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <Link to="/" className={buttonStyles("secondary")}>
            Go to the home page
          </Link>
        </div>
      </Container>
    </Layout>
  );
}
