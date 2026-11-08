import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Availability({ className, style }: { className?: string; style?: CSSProperties }) {
  if (!site.availability.open) return null;
  return (
    <p
      className={cn("flex items-center gap-2.5 text-[0.95rem] text-muted", className)}
      style={style}
    >
      <span className="relative flex size-2.5" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-accent opacity-40 motion-safe:animate-ping [animation-iteration-count:3]" />
        <span className="relative size-2.5 rounded-full bg-accent" />
      </span>
      {site.availability.text}
    </p>
  );
}
