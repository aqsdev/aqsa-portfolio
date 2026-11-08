import { site } from "@/data/site";

type SeoInput = {
  /** Page title without the site name. Omit on the home page. */
  title?: string;
  description?: string;
  /** Path of the page, e.g. "/work". Used for the canonical URL. */
  path: string;
  type?: "website" | "article" | "profile";
};

const OG_IMAGE = { path: "/og.png", width: "1200", height: "630" };

/** Builds the title, description, canonical URL and social sharing tags for a page. */
export function seo({ title, description = site.description, path, type = "website" }: SeoInput) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.role}`;
  const url = `${site.url}${path === "/" ? "" : path}` || site.url;
  const image = `${site.url}${OG_IMAGE.path}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:type", content: type },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: OG_IMAGE.width },
      { property: "og:image:height", content: OG_IMAGE.height },
      { property: "og:image:alt", content: `${site.name}, ${site.role}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
