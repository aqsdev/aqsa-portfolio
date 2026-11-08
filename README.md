# Aqsa Shakoor — Portfolio

Personal portfolio of **Aqsa Shakoor**, full-stack developer and AI automation engineer.

Built with TanStack Start (React + TypeScript), Tailwind CSS v4 and a serverless contact form powered by Resend. Every page is pre-rendered to static HTML at build time, so the site is fast and fully readable by search engines.

## Pages

| Address        | Page                                                       |
| -------------- | ---------------------------------------------------------- |
| `/`            | Home: introduction, selected work, services, process       |
| `/work`        | All case studies                                           |
| `/work/<slug>` | One case study (e.g. `/work/document-processing-pipeline`) |
| `/about`       | Background, experience, education, skills                  |
| `/contact`     | Contact form and direct links                              |
| `/resume`      | Short link that opens the CV PDF                           |
| `/projects`    | Old address, permanently redirects to `/work`              |

## Editing your content

You rarely need to touch the page code. All the words live in `src/data/`:

| File                     | What it controls                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `src/data/site.ts`       | Name, headline, intro, email, social links, availability, services, skills, CV, photo         |
| `src/data/projects.ts`   | Case studies. Set `status: "draft"` to hide one, `featured: true` to show it on the home page |
| `src/data/experience.ts` | Work history, education, languages                                                            |

Search the project for `TODO` to find everything still waiting for your input. Anything marked TODO is **hidden from visitors** until you fill it in, so the site is always safe to publish.

**Adding a project:** copy one of the draft entries at the bottom of `projects.ts`, fill it in and change `status` to `"published"`. Its page appears automatically at `/work/<slug>` and is added to the sitemap.

**Adding a screenshot to a project:** put the image in `public/images/work/` and add `cover: { src: "/images/work/your-file.png", alt: "Describe what's in the image" }` to the project.

**Adding your photo:** save a square photo as `public/images/aqsa-shakoor.jpg` and set `photo.src` in `site.ts` to `"/images/aqsa-shakoor.jpg"`.

**Updating your CV:** replace `public/Aqsa-Shakoor-Resume.pdf` with the new file, keeping the same name.

## Running it on your computer

You need [Node.js](https://nodejs.org) 20.19 or newer (22 recommended).

```sh
npm install
cp .env.example .env     # optional: add your Resend key to test the form
npm run dev              # opens on http://localhost:3000
```

Other commands:

```sh
npm run build       # production build (also generates the sitemap)
npm run preview     # run the production build locally
npm run typecheck   # TypeScript checks
npm run lint        # code style checks
npm run check       # all of the above in one go
```

## Deploying (free) with GitHub and Vercel

### 1. Put the code on GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click **New repository**, name it `portfolio`, keep it **Public** (recruiters can see your code) and don't add a README.
3. In this project folder, run:

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/aqsdev/portfolio.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Sign up at [vercel.com](https://vercel.com) with **Continue with GitHub** (Hobby plan, free).
2. Click **Add New → Project** and import the `portfolio` repository.
3. Change the **Project Name** to `aqsashakoor`. This gives you the address `https://aqsashakoor.vercel.app`. If that name is taken, pick another and set `SITE_URL` to match (next step).
4. Open **Environment Variables** and add the keys from `.env.example` (see the Resend section below for the key).
5. Click **Deploy**. Vercel detects everything automatically.

From now on, every `git push` to `main` redeploys the site within a minute or two.

### 3. Connect the contact form (Resend, free)

1. Sign up at [resend.com](https://resend.com) **using aqsashakoor21@gmail.com**. Until you verify your own domain, Resend only delivers to the email you signed up with.
2. Go to **API Keys → Create API Key** and copy it.
3. In Vercel: **Settings → Environment Variables**, add `RESEND_API_KEY` with that value, then **Deployments → ⋯ → Redeploy**.
4. Send yourself a test message from `/contact`. When you reply to it, your reply goes straight to the sender.

The form has spam protection built in: a hidden trap field, a minimum fill-in time and a limit on messages per sender.

### 4. Optional: your own domain

A domain such as `aqsashakoor.com` or `aqsashakoor.dev` costs about $10–15 a year and looks more professional on a CV.

1. Buy it from any registrar (Namecheap, Porkbun, Cloudflare).
2. In Vercel: **Settings → Domains → Add** and follow the DNS instructions.
3. Set `SITE_URL` to `https://aqsashakoor.com` in Vercel and redeploy, so the sitemap, share previews and search results use the new address.
4. Optional: verify the domain in Resend to send from `hello@aqsashakoor.com`, and set `CONTACT_FROM_EMAIL`.

### 5. After launch

- **Google:** add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://<your-site>/sitemap.xml`.
- **Analytics:** in Vercel, open the project's **Analytics** tab and click **Enable**. It's privacy-friendly and free on Hobby.
- **Share preview:** paste your URL into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to check how it looks when shared.
- Add the link to your LinkedIn profile, GitHub profile and CV.

## Project structure

```
public/                 Static files: CV, icons, share image
src/
  components/           Header, footer, workflow diagram, contact form, etc.
  data/                 All the content (edit these)
  lib/
    contact.ts          Server function that sends contact messages via Resend
    contact-schema.ts   Form validation shared by the browser and the server
    seo.ts              Titles, descriptions and share tags for each page
  routes/               One file per page (file-based routing)
  styles.css            Colours, fonts and type scale for light and dark themes
vercel.json             Security and caching headers
.github/workflows/      Automatic checks on every push
```

## What's built in

- Light and dark themes (follows the visitor's system setting, remembers their choice, no flash on load)
- Pre-rendered pages, self-hosted fonts and no unused code, for fast loading
- SEO: unique title and description per page, canonical URLs, sitemap, robots.txt, structured data, share image
- Accessibility: keyboard navigation with visible focus, skip link, screen-reader labels, reduced-motion support, correct heading order
- Security headers and CSRF protection for the contact form

## License

The code is available for reference. The content (text, CV, images and branding) belongs to Aqsa Shakoor and may not be reused.
