import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

// Protects server functions (the contact form) from cross-site request forgery.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));
