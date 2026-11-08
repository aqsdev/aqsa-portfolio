import { useEffect, useRef, useState } from "react";
import { formatPeriod, type Role } from "@/data/experience";

function TimelineItem({ role, isLast }: { role: Role; isLast: boolean }) {
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
        style={{ transform: visible ? "scale(1)" : "scale(0)" }}
      />
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[8.5px] top-6 w-0 origin-top border-l-2 border-dashed border-line-strong transition-transform duration-[1200ms] ease-out"
          style={{ transform: visible ? "scaleY(1)" : "scaleY(0)" }}
        />
      )}
      <div
        className="transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
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

export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  return (
    <ol className="mt-4">
      {roles.map((role, i) => (
        <TimelineItem
          key={`${role.title}-${role.company}`}
          role={role}
          isLast={i === roles.length - 1}
        />
      ))}
    </ol>
  );
}
