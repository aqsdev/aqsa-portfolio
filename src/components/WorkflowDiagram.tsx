import { useId } from "react";

type NodeProps = {
  x: number;
  y: number;
  w: number;
  kind: string;
  text: string;
  tone?: "default" | "accent" | "signal";
};

const H = 56;

function Node({ x, y, w, kind, text, tone = "default" }: NodeProps) {
  const box =
    tone === "accent"
      ? "fill-accent-soft stroke-accent"
      : tone === "signal"
        ? "fill-signal-soft stroke-signal"
        : "fill-surface stroke-line-strong";
  const label =
    tone === "accent" ? "fill-accent" : tone === "signal" ? "fill-signal" : "fill-muted";
  return (
    <g>
      <rect x={x} y={y} width={w} height={H} rx={H / 2} className={box} strokeWidth={1.25} />
      <text
        x={x + 16}
        y={y + 22}
        className={`${label} font-mono`}
        fontSize={11}
        letterSpacing={0.2}
      >
        {kind}
      </text>
      <text x={x + 16} y={y + 43} className="fill-ink font-sans" fontSize={15} fontWeight={500}>
        {text}
      </text>
    </g>
  );
}

/**
 * The hero illustration: an agentic workflow drawn as a node graph.
 * A pulse travels each branch three times after load, then the diagram rests
 * (and never moves for visitors who prefer reduced motion).
 */
export function WorkflowDiagram() {
  const titleId = useId();
  const descId = useId();
  const yesPath = "M230 44 V246 H90 V402 H230 V448";
  const noPath = "M230 44 V246 H370 V402 H230 V448";

  return (
    <figure className="m-0 w-full max-w-[480px]">
      <svg
        viewBox="0 0 460 492"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="h-auto w-full"
      >
        <title id={titleId}>Diagram of an agentic workflow</title>
        <desc id={descId}>
          A new inquiry email triggers a language-model step that reads and classifies it. If the
          model is confident, it drafts the reply. If not, it asks a person. Both paths end by
          logging the decision.
        </desc>

        {/* Edges */}
        <g className="stroke-line-strong" strokeWidth={1.5} fill="none">
          <path d="M230 72 V110" />
          <path d="M230 166 V200" />
          <path d="M152 246 H90 V316" />
          <path d="M308 246 H370 V316" />
          <path d="M90 372 V402 H370 V372" />
          <path d="M230 402 V420" />
        </g>
        <g className="fill-muted font-mono" fontSize={11}>
          <text x={112} y={238}>
            yes
          </text>
          <text x={322} y={238}>
            no
          </text>
        </g>

        {/* Pulses travel beneath the nodes so they appear to pass through them. */}
        <g className="flow-pulse">
          <circle r={4.5} className="fill-accent" opacity={0}>
            <animateMotion
              path={yesPath}
              dur="4.6s"
              begin="0.9s"
              repeatCount="3"
              id="yesPulse"
              fill="remove"
            />
            <set attributeName="opacity" to="1" begin="yesPulse.begin" end="yesPulse.end" />
          </circle>
          <circle r={4.5} className="fill-signal" opacity={0}>
            <animateMotion
              path={noPath}
              dur="4.6s"
              begin="3.2s"
              repeatCount="3"
              id="noPulse"
              fill="remove"
            />
            <set attributeName="opacity" to="1" begin="noPulse.begin" end="noPulse.end" />
          </circle>
        </g>

        {/* Nodes */}
        <Node x={130} y={16} w={200} kind="trigger" text="New inquiry email" />
        <Node x={130} y={110} w={200} kind="llm step" text="Read and classify" tone="accent" />
        <g>
          <path
            d="M230 200 L308 246 L230 292 L152 246 Z"
            className="fill-surface stroke-line-strong"
            strokeWidth={1.25}
            strokeLinejoin="round"
          />
          <text
            x={230}
            y={251}
            textAnchor="middle"
            className="fill-ink font-sans"
            fontSize={14}
            fontWeight={500}
          >
            Confident?
          </text>
        </g>
        <Node x={10} y={316} w={160} kind="action" text="Draft the reply" />
        <Node x={290} y={316} w={160} kind="human in the loop" text="Ask a person" tone="signal" />
        <Node x={130} y={420} w={200} kind="log" text="Record the decision" />
      </svg>
      <figcaption className="mt-4 max-w-[46ch] text-sm text-muted">
        How one of my workflows handles a new inquiry: the model reads it, decides what to do, and
        asks a person when it isn’t sure.
      </figcaption>
    </figure>
  );
}
