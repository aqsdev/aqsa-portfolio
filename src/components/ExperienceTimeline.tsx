import { useEffect, useRef, useState } from "react";
import { formatPeriod, type Role } from "@/data/experience";

function TimelineItem({ role, index }: { role: Role; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const period = formatPeriod(role);

  return (
    <li ref={ref} className="relative pb-14 pl-12 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute left-[3px] top-1.5 size-3 rounded-full border-2 border-accent bg-bg transition-transform duration-500 ease-out"
        style={{
          transform: visible ? "scale(1)" : "scale(0)",
          transitionDelay: visible ? `${Math.min(index, 3) * 80}ms` : "0ms",
        }}
      />
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transitionDelay: visible ? `${Math.min(index, 3) * 80}ms` : "0ms",
        }}
      >
        <p className="text-[0.95rem] text-muted">
          {period}
          {role.location ? ` · ${role.location}` : ""}
        </p>
        <h3 className="type-h3 mt-1">
          {role.title}
          {role.company && <span className="font-normal text-muted">, {role.company}</span>}
        </h3>
        <p className="mt-2 max-w-[64ch] text-muted">{role.summary}</p>
        {role.highlights.length > 0 && (
          <ul className="mt-4 max-w-[64ch] space-y-2">
            {role.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent"
                />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/**
 * A single dashed line spans the whole list and draws itself in step with
 * scroll position, rather than animating per-card: a tall card (lots of
 * highlights) can't leave the line short of the next dot, because there's
 * only one line and its length is tied directly to scroll progress.
 */
export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function measure() {
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.85;
      const total = rect.height + viewportAnchor - window.innerHeight * 0.25;
      const scrolled = viewportAnchor - rect.top;
      setProgress(Math.min(1, Math.max(0, total > 0 ? scrolled / total : 0)));
    }
    // rAF-throttled: a raw scroll listener can fire dozens of times per
    // frame, each one triggering a React re-render, which is what makes
    // scroll-linked effects feel janky instead of smooth.
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    }
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-4">
      <span
        aria-hidden="true"
        className="absolute left-[8.5px] top-6 w-0 border-l-2 border-dashed border-line-strong"
        style={{ height: `calc((100% - 3.5rem) * ${progress})` }}
      />
      {roles.map((role, i) => (
        <TimelineItem key={`${role.title}-${role.company}`} role={role} index={i} />
      ))}
    </ol>
  );
}
