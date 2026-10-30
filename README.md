# Dolgion Oldokh: Portfolio

Next.js (App Router) portfolio for systems, infrastructure and IT operations roles. Every page is statically prerendered.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| What | File |
| --- | --- |
| All content (hero, case studies, experience, skills, about) | `data/profile.ts` |
| Home page | `app/page.tsx` |
| Case study pages (`/work/<slug>`) | `app/work/[slug]/page.tsx` |
| Header / footer | `components/SiteChrome.tsx` |
| Styles and design tokens | `app/globals.css` |
| Social preview images | `app/opengraph-image.tsx`, `app/work/[slug]/opengraph-image.tsx` |

## Adding screenshots to a case study

Put a sanitised PNG in `public/images/` using the file name already listed in that case study's
`screenshots` array (e.g. `images/odoo13.png`, `images/itcore-tickets.png`). Files that don't exist
are skipped at build time, so nothing broken is ever shown.

Before adding a screenshot, crop or blur: IP addresses, hostnames, URLs of internal systems,
usernames, emails, customer names, credentials and anything showing real network topology.

## Content rules

No invented metrics, dates, certifications or endorsements. The Odoo migration is in progress:
never describe it as completed or as live in production.
