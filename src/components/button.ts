import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

/** Shared button styles, usable on <a>, <Link> and <button>. */
export function buttonStyles(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-medium",
    "transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" && "bg-accent text-accent-ink hover:bg-ink hover:text-bg",
    variant === "secondary" &&
      "border border-line-strong text-ink hover:border-ink hover:bg-surface",
    variant === "ghost" && "px-3 text-muted hover:text-ink",
    className,
  );
}
