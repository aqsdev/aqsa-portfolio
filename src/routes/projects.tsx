import { createFileRoute, redirect } from "@tanstack/react-router";

// The old /projects address now lives at /work. Keeps old links working.
export const Route = createFileRoute("/projects")({
  beforeLoad: () => {
    throw redirect({ to: "/work", statusCode: 301 });
  },
});
