import { createFileRoute, redirect } from "@tanstack/react-router";
import { site } from "@/data/site";

// A short, shareable address for your CV: yoursite.com/resume
export const Route = createFileRoute("/resume")({
  beforeLoad: () => {
    if (site.resume.ready) {
      throw redirect({ href: site.resume.href, reloadDocument: true, statusCode: 302 });
    }
    throw redirect({ to: "/about", statusCode: 302 });
  },
});
