/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site URL, injected at build time from the SITE_URL env var. */
  readonly SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
