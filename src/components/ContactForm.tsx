import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { sendContactMessage } from "@/lib/contact";
import { contactSchema, fieldErrorsFrom, topics, type ContactField } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./button";

type Status = "idle" | "sending" | "sent" | "error";
type Values = Record<ContactField, string>;

const empty: Values = { name: "", email: "", topic: "", message: "" };

const inputClass =
  "mt-2 block w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-ink placeholder:text-muted/70 " +
  "transition-colors hover:border-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent " +
  "aria-[invalid=true]:border-danger";

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const startedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  function update(field: ContactField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const payload = {
      ...values,
      website: honeypot.current?.value ?? "",
      startedAt: startedAt.current || Date.now(),
    };

    const check = contactSchema.safeParse(payload);
    if (!check.success) {
      const fieldErrors = fieldErrorsFrom(check.error);
      setErrors(fieldErrors);
      const first = (Object.keys(fieldErrors) as ContactField[])[0];
      if (first) document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const result = await sendContactMessage({ data: payload });
      if (result.ok) {
        setSentTo({ name: values.name.trim().split(/\s+/)[0] ?? "", email: values.email.trim() });
        setValues(empty);
        setErrors({});
        setStatus("sent");
      } else {
        setErrors(result.fieldErrors ?? {});
        setFormError(result.error);
        setStatus("error");
      }
    } catch {
      setFormError("Your message couldn’t be sent. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-accent/40 bg-accent-soft p-8 outline-none"
      >
        <CheckCircle2 className="size-7 text-accent" aria-hidden="true" />
        <h2 className="type-h3 mt-4">
          Message sent. Thanks{sentTo.name ? `, ${sentTo.name}` : ""}.
        </h2>
        <p className="mt-2 text-muted">
          I’ll reply to <span className="text-ink">{sentTo.email}</span> soon.
        </p>
        <button
          type="button"
          className={buttonStyles("secondary", "mt-6")}
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const describe = (f: ContactField) => (errors[f] ? `${id}-${f}-error` : undefined);
  const errorText = (f: ContactField) =>
    errors[f] ? (
      <p id={`${id}-${f}-error`} className="mt-2 text-sm text-danger">
        {errors[f]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={formError ? `${id}-form-error` : undefined}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="font-medium">
            Your name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={inputClass}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="font-medium">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={inputClass}
          />
          {errorText("email")}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`${id}-topic`} className="font-medium">
          What’s it about?
        </label>
        <select
          id={`${id}-topic`}
          name="topic"
          value={values.topic}
          onChange={(e) => update("topic", e.target.value)}
          aria-invalid={!!errors.topic}
          aria-describedby={describe("topic")}
          className={cn(
            inputClass,
            "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237d8c88' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Choose one
          </option>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errorText("topic")}
      </div>

      <div className="mt-6">
        <label htmlFor={`${id}-message`} className="font-medium">
          Message
        </label>
        <p id={`${id}-message-hint`} className="mt-1 text-sm text-muted">
          What are you working on, and what would you like help with?
        </p>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={[`${id}-message-hint`, describe("message")].filter(Boolean).join(" ")}
          className={cn(inputClass, "resize-y")}
        />
        {errorText("message")}
      </div>

      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input
          ref={honeypot}
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {formError && (
        <p
          id={`${id}-form-error`}
          role="alert"
          className="mt-6 rounded-xl border border-danger/40 px-4 py-3 text-danger"
        >
          {formError}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          className={buttonStyles("primary", "px-7")}
          disabled={status === "sending"}
        >
          {status === "sending" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-muted">
          Your message goes straight to my inbox. Nothing is stored or shared.
        </p>
      </div>
    </form>
  );
}
