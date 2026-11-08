import { Link, useRouterState } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./button";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const navLinkClass =
  "rounded-full px-3.5 py-2 text-[0.95rem] text-muted transition-colors hover:text-ink";
const navLinkActive = "text-ink bg-surface shadow-[inset_0_0_0_1px_var(--line)]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close the mobile menu after navigating or when Escape is pressed.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={navLinkClass}
              activeProps={{ className: navLinkActive, "aria-current": "page" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {site.resume.ready && (
            <a
              href={site.resume.href}
              className={buttonStyles("secondary", "hidden py-2 sm:inline-flex")}
              download
            >
              <Download className="size-4" aria-hidden="true" />
              Résumé
            </a>
          )}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-surface md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-line bg-bg px-5 pb-6 pt-3 md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="block border-b border-line py-3.5 font-display text-2xl font-semibold text-muted"
                  activeProps={{ className: "!text-ink", "aria-current": "page" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {site.resume.ready && (
          <a href={site.resume.href} download className={cn(buttonStyles("secondary"), "mt-6")}>
            <Download className="size-4" aria-hidden="true" />
            Download résumé
          </a>
        )}
      </div>
    </header>
  );
}
