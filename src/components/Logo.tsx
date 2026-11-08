import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** The "as" monogram. Mirrors public/favicon.svg. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid size-9 shrink-0 place-items-center rounded-[10px] bg-accent font-display text-[1.05rem] font-bold leading-none tracking-[-0.06em] text-accent-ink",
        className,
      )}
    >
      <span className="-mt-0.5">as</span>
      <span className="absolute -right-[3px] -top-[3px] size-2.5 rounded-full border-2 border-bg bg-signal" />
    </span>
  );
}

export function Logo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3 rounded-lg"
      aria-label={`${site.name}, home`}
    >
      <Monogram />
      <span className="font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">
        {site.name}
      </span>
    </Link>
  );
}
