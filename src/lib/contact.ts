import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { site } from "@/data/site";
import {
  contactSchema,
  fieldErrorsFrom,
  topics,
  type ContactInput,
  type ContactResult,
} from "./contact-schema";

const MIN_FILL_TIME_MS = 3_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 };

// Best-effort, per-instance rate limit. Enough to stop a single noisy sender;
// Vercel's firewall handles large-scale abuse.
const recent = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5_000) recent.clear();
  return hits.length > RATE_LIMIT.max;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmail(data: ContactInput) {
  const topicLabel = topics.find((t) => t.value === data.topic)?.label ?? data.topic;
  const subject = `Portfolio message from ${data.name}: ${topicLabel}`;
  const text = [
    `From: ${data.name} <${data.email}>`,
    `About: ${topicLabel}`,
    "",
    data.message,
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#122120;max-width:560px">
      <p style="margin:0 0 4px"><strong>From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>
      <p style="margin:0 0 16px"><strong>About:</strong> ${escapeHtml(topicLabel)}</p>
      <div style="white-space:pre-wrap;border-left:3px solid #0a7564;padding-left:14px">${escapeHtml(data.message)}</div>
      <p style="margin:24px 0 0;color:#53625f;font-size:13px">Sent from the contact form on your portfolio. Reply to this email to answer them directly.</p>
    </div>`;
  return { subject, text, html };
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data: raw }): Promise<ContactResult> => {
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        ok: false,
        error: "Some fields need attention.",
        fieldErrors: fieldErrorsFrom(parsed.error),
      };
    }
    const data = parsed.data;

    // Bots: pretend it worked so they don't retry, but send nothing.
    if (data.website || Date.now() - data.startedAt < MIN_FILL_TIME_MS) {
      return { ok: true };
    }

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    if (isRateLimited(ip)) {
      return {
        ok: false,
        error: `You’ve sent several messages in a short time. Wait a few minutes, or email me at ${site.email}.`,
      };
    }

    const apiKey = process.env["RESEND_API_KEY"];
    const to = process.env["CONTACT_TO_EMAIL"] || site.email;
    const from =
      process.env["CONTACT_FROM_EMAIL"] || "Portfolio contact form <onboarding@resend.dev>";

    if (!apiKey) {
      if (process.env["NODE_ENV"] !== "production") {
        console.info(
          "[contact] RESEND_API_KEY is not set; message logged instead of sent:\n",
          data,
        );
        return { ok: true };
      }
      console.error("[contact] RESEND_API_KEY is missing in production.");
      return {
        ok: false,
        error: `The form isn’t connected yet. Please email me directly at ${site.email}.`,
      };
    }

    const { subject, text, html } = buildEmail(data);
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text, html }),
      });
      if (!res.ok) {
        console.error("[contact] Resend rejected the message:", res.status, await res.text());
        throw new Error(`Resend responded with ${res.status}`);
      }
      return { ok: true };
    } catch (err) {
      console.error("[contact] Sending failed:", err);
      return {
        ok: false,
        error: `Your message couldn’t be sent. Try again in a moment, or email me at ${site.email}.`,
      };
    }
  });
