import { z } from "zod";

/** Shared by the form (instant feedback) and the server (the real check). */
export const topics = [
  { value: "role", label: "A full-time or contract role" },
  { value: "project", label: "A freelance project" },
  { value: "collaboration", label: "A collaboration" },
  { value: "other", label: "Something else" },
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100, "Keep your name under 100 characters."),
  email: z.string().trim().email("Enter a valid email address, like name@company.com.").max(200),
  topic: z.enum(["role", "project", "collaboration", "other"], {
    errorMap: () => ({ message: "Choose what your message is about." }),
  }),
  message: z
    .string()
    .trim()
    .min(20, "Add a little more detail (at least 20 characters).")
    .max(5000, "Keep your message under 5,000 characters."),
  // Spam protection. Real visitors never see or fill this field.
  website: z.string().max(0).optional().or(z.literal("")),
  // When the form was first shown. Bots submit instantly; people don't.
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "topic" | "message";

export type ContactResult =
  { ok: true } | { ok: false; error: string; fieldErrors?: Partial<Record<ContactField, string>> };

export function fieldErrorsFrom(error: z.ZodError): Partial<Record<ContactField, string>> {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if ((key === "name" || key === "email" || key === "topic" || key === "message") && !out[key]) {
      out[key] = issue.message;
    }
  }
  return out;
}
