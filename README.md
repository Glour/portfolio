# Aleksandr Bogdanov — Portfolio

Personal portfolio of Aleksandr Bogdanov, Backend Engineer / Tech Lead / AI Engineer.

**Live:** [https://bogdanov.dev](https://bogdanov.dev) (или текущий домен)

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** next-intl (RU / EN)
- **Deploy:** GitHub Actions → SSH → VPS

## Structure

```
app/
├── [locale]/          # RU / EN pages (next-intl)
│   ├── page.tsx       # Main page (Hero, Projects, Skills, Contact)
│   ├── layout.tsx     # Locale layout with NextIntlClientProvider
│   └── projects/      # All projects page
├── components/
│   ├── 3d/HeroScene.tsx       # Cursor glow + ambient blobs (Three.js-free)
│   ├── layout/Header.tsx
│   ├── layout/Footer.tsx
│   └── ui/ProjectsCarousel.tsx  # Projects carousel with tabs
├── data/profile.ts    # Personal info, tech stack
└── globals.css

messages/
├── ru.json            # Russian translations + project data
└── en.json            # English translations + project data

public/screenshots/    # Project screenshots (2 per project)

.github/workflows/
└── deploy.yml         # Auto-deploy on push to main
```

## Local Development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Deploy

Push to `main` → GitHub Actions деплоит на VPS через SSH.

Requires GitHub secrets:
- `DEPLOY_HOST` — server IP
- `DEPLOY_USER` — SSH user
- `DEPLOY_KEY` — private SSH key

## Adding a Project

Edit `messages/ru.json` and `messages/en.json` — add entry to `projectsList`:

```json
{
  "title": "Project Name",
  "role": "Your Role",
  "category": "ai|fullstack|blockchain|trading|telegram|automation",
  "description": "Short description",
  "features": ["Feature 1", "Feature 2"],
  "tech": ["Next.js", "FastAPI", "PostgreSQL"],
  "period": "2025–2026",
  "link": "https://example.com",
  "highlight": true,
  "screenshots": ["/screenshots/proj-1.png", "/screenshots/proj-2.png"]
}
```

Place screenshots in `public/screenshots/` (recommended size: 1280×800).

Projects without screenshots (`highlight: true`, no `screenshots` field) display as full-width text cards.
