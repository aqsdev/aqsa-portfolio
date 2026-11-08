import type { CSSProperties } from "react";
import type { PipelineStep } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Small inline pipeline used in project lists: step labels joined by connectors. */
export function PipelineCompact({
  steps,
  className,
}: {
  steps: PipelineStep[];
  className?: string;
}) {
  if (steps.length === 0) return null;
  return (
    <ol aria-label="How it works" className={cn("flex flex-wrap items-center gap-y-2", className)}>
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-center">
          <span
            className={cn(
              "rounded-md border px-2.5 py-1 text-[0.8rem] leading-none",
              i === 0
                ? "border-accent/50 bg-accent-soft text-ink"
                : "border-line-strong/70 bg-surface text-muted",
            )}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="mx-1 block h-px w-4 bg-line-strong" />
          )}
        </li>
      ))}
    </ol>
  );
}

/** Full pipeline diagram used on case studies. Vertical on mobile, horizontal on desktop. */
export function PipelineDiagram({ steps }: { steps: PipelineStep[] }) {
  if (steps.length === 0) return null;
  return (
    <ol
      className="grid gap-0 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-4"
      style={{ "--steps": steps.length } as CSSProperties}
    >
      {steps.map((step, i) => (
        <li key={step.label} className="relative flex gap-4 pb-8 lg:block lg:pb-0">
          {/* connector */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[15px] top-8 bottom-0 w-px bg-line-strong lg:left-8 lg:right-[-1rem] lg:top-[15px] lg:bottom-auto lg:h-px lg:w-auto"
            />
          )}
          <span
            className={cn(
              "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border font-mono text-sm",
              i === 0
                ? "border-accent bg-accent text-accent-ink"
                : "border-line-strong bg-surface text-ink",
            )}
          >
            {i + 1}
          </span>
          <div className="lg:mt-4 lg:pr-2">
            <p className="font-medium text-ink">{step.label}</p>
            <p className="mt-1 text-[0.95rem] text-muted">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
