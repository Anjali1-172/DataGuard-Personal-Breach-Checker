# DataGuard — Project Documentation

Generated: 2026-02-17

## Overview

DataGuard is a client-side web application (Vite + React) that provides breach checking, website safety analysis, form tracking, and guidance for protecting email and phone identities.

This document covers: architecture, packages, how features work, where user data is stored, run/build instructions, and how to export this documentation to PDF.

---

**Repository root**: app/

## Tech stack & packages

- Runtime: React (v19.x)
- Bundler / dev server: Vite
- Styling: Tailwind CSS + tailwindcss-animate
- UI primitives: Radix UI packages
- Forms: `react-hook-form` (ui helpers present)
- State management: local component state (React `useState`, `useEffect`)
- Storage: `localStorage` for user-tracked forms
- Charts: `recharts`
- Validation: `zod` (installed)
- Notifications: `sonner`
- Utilities: `clsx`, `date-fns`, `lucide-react`

Key `dependencies` (from `package.json`):

- react, react-dom
- @vitejs/plugin-react, vite
- tailwindcss, postcss, autoprefixer
- @radix-ui/react-* (many primitives)
- react-hook-form
- recharts
- zod
- sonner
- vaul (drawer usage)
- lucide-react
- date-fns

Dev dependencies include: `typescript`, `eslint`, `@eslint/js`, `@types/*` packages, and `tailwindcss` tooling.

(See the full list in [app/package.json](app/package.json)).

## Project structure (top-level `app/src`)

- `main.tsx` / `index.css` / `App.(jsx|tsx)` — application entry and layout.
- `components/` — shared components, e.g. `BreachChecker.jsx`, `Navigation.jsx`, UI primitives under `components/ui/`.
- `sections/` — main page sections: `HeroSection`, `FormTracker`, `WebsiteSafety`, `EmailProtection`, `PhoneProtection`, `BreachNews`, `StatsSection`, `Footer`.
- `lib/`, `hooks/` — utility helper(s) (lightweight project utilities).

## Architecture (overall)

- Single-page frontend app built with Vite + React.
- No backend present in the repository — app is a static SPA that calls external public APIs or uses mock data.
- Persistence for user-entered form tracker entries is client-only: `localStorage`.
- External API usage: the Breach Checker calls `https://api.xposedornot.com/v1/check-email/<email>`.

## Frontend responsibilities (features)

### Breach Checker
- Component: `app/src/components/BreachChecker.jsx`.
- UI: allows user to enter an email (or phone tab) and trigger a check.
- Behavior: when submitted, it invokes the `onCheck(email)` callback passed from `App.jsx`.
- API: `App.jsx` implements `handleBreachCheck` which performs:
  - `fetch("https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}")`
  - Parses JSON and displays breach results in the `BreachChecker` UI.
- Storage: searches are anonymous and not stored by the app.

Files to inspect:
- [app/src/components/BreachChecker.jsx](app/src/components/BreachChecker.jsx#L1-L20)
- [app/src/App.jsx](app/src/App.jsx#L31-L40)

### Form Tracker
- Component: `app/src/sections/FormTracker.jsx`.
- Purpose: let users track where they've shared personal data (website, email, data shared, date, risk level).
- Storage: saved in browser `localStorage` under key `dataguard_forms`.
- Code:
  - On mount, reads `localStorage.getItem('dataguard_forms')` and sets state.
  - `saveForms` writes updated array via `localStorage.setItem('dataguard_forms', JSON.stringify(updatedForms))`.
  - UI supports add, delete, and sample data when none stored.

Reference:
- [app/src/sections/FormTracker.jsx](app/src/sections/FormTracker.jsx#L1-L30)

### Website Safety
- Component: `app/src/sections/WebsiteSafety.jsx`.
- Behavior: accepts a URL and runs a simulated check (mocked data in file `mockWebsiteData`). No outgoing network call is performed — results are generated locally.

### Phone Protection
- Component: `app/src/sections/PhoneProtection.jsx`.
- Behavior: simulates exposure checks locally (randomized risk scores). No network persistence.

### Email Protection
- Component: `app/src/sections/EmailProtection.jsx`.
- Behavior: UI guide with security checklist and progress bar stored in local component state; no persistence.

### Breach News
- Component: `app/src/sections/BreachNews.jsx`.
- Behavior: consumes `breachNewsData` array in-file (simulated). No external API calls.

### Footer newsletter subscribe
- Component: `app/src/sections/Footer.jsx`.
- Behavior: local `subscribed` state toggled on submit — not persisted and not sent to any backend.

## Backend / APIs

- This repository has no backend server code.
- External API used:
  - XposedOrNot: `https://api.xposedornot.com/v1/check-email/<email>` — called from `App.jsx` inside `handleBreachCheck`.
- All other data is mocked or simulated in the frontend; there is no server-side storage.

## Where user data is stored

- Tracked forms: in browser `localStorage` under key `dataguard_forms` (see `FormTracker.jsx`).
- Newsletter subscribe action: only local state (`Footer.jsx`), not stored or sent.
- Searches from BreachChecker: results are fetched from external API and shown in memory only — not stored.

## How to run locally

Open a terminal, change to `app` and run:

```bash
cd "d:\DataGuard Personal Breach Checker\app"
npm install   # if not already installed
npm run dev    # starts Vite dev server at http://localhost:5173/
```

Build production:

```bash
npm run build
npm run preview   # serve build locally (no HMR)
```

## How to inspect stored form data (browser)

- Open the running app at `http://localhost:5173/`.
- Chrome/Edge DevTools: `Application` → `Local Storage` → `http://localhost:5173` → `dataguard_forms` key.
- Or Console:

```javascript
JSON.parse(localStorage.getItem('dataguard_forms') || '[]')
```

## Security & privacy notes

- This app stores user-tracked forms locally only — data never leaves the user's browser as part of that feature.
- The breach checker calls a third-party API (XposedOrNot) — the email sent to that API will be visible to that external service per its policy.
- No authentication is implemented — the app is a public SPA.

## File references

- App entry: [app/src/App.jsx](app/src/App.jsx#L1-L40)
- Breach checker: [app/src/components/BreachChecker.jsx](app/src/components/BreachChecker.jsx#L1-L40)
- Form tracker: [app/src/sections/FormTracker.jsx](app/src/sections/FormTracker.jsx#L1-L40)
- Website safety: [app/src/sections/WebsiteSafety.jsx](app/src/sections/WebsiteSafety.jsx#L1-L40)
- Phone protection: [app/src/sections/PhoneProtection.jsx](app/src/sections/PhoneProtection.jsx#L1-L40)
- Email protection: [app/src/sections/EmailProtection.jsx](app/src/sections/EmailProtection.jsx#L1-L40)
- Breach news: [app/src/sections/BreachNews.jsx](app/src/sections/BreachNews.jsx#L1-L40)
- Footer: [app/src/sections/Footer.jsx](app/src/sections/Footer.jsx#L1-L40)
- Package manifest: [app/package.json](app/package.json)

---

## Export this doc to PDF

Two easy options:

1) Print from browser (recommended):
   - Open `app/PROJECT_DOCUMENTATION.md` in VS Code or open the Markdown in a browser preview.
   - In Chrome, open the file or a Markdown preview, then `Ctrl+P` → `Save as PDF`.

2) Use `pandoc` (CLI):

```bash
# install pandoc (if not installed)
# on Windows: choco install pandoc  (or download from pandoc.org)
pandoc app/PROJECT_DOCUMENTATION.md -o app/PROJECT_DOCUMENTATION.pdf
```

3) Use Chromium headless via `npx` (if you prefer automated conversion):

```bash
# convert HTML rendered from markdown to PDF using markdown-pdf or puppeteer
npx markdown-pdf app/PROJECT_DOCUMENTATION.md -o app/PROJECT_DOCUMENTATION.pdf
# or use puppeteer script to render markdown->html->pdf
```

