# DataGuard — Simple Project Summary

Date: 2026-02-17

This document explains the project in easy language.

Overview

- DataGuard is a single-page web app built with React and Vite.
- It helps you check if your email or phone appears in data breaches, check website safety, and track forms where you shared your data.

How to run the app locally

1. Open a terminal and go to the `app` folder:

```
cd "d:\DataGuard Personal Breach Checker\app"
```

2. Install dependencies (if not already):

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser at: http://localhost:5173/

What the app does (simple)

- Breach Checker: Type an email and click Search. The app asks a public service (XposedOrNot) if your email was in any breach. The result is shown on the page but not saved.

- Form Tracker: You can add entries about websites where you shared personal data (website name, email used, data shared, date, risk). These entries are saved only in your browser. They are stored in the browser's Local Storage under the key `dataguard_forms`.

- Website Safety and Phone Protection: These sections run local checks or mock data to show safety information. They do not send your data anywhere.

- Breach News, Email Protection, Stats: These show sample data or advice in the app.

Where data is stored

- Form Tracker data → browser Local Storage (key: `dataguard_forms`).
- Other features mostly use temporary memory; only the Breach Checker calls an external API for a search.

Packages used (important ones)

- React (UI framework)
- Vite (dev server / bundler)
- Tailwind CSS (styles)
- react-hook-form (form helpers)
- recharts (charts)
- @radix-ui/react-* (UI primitives)
- sonner (notifications)
- zod (validation)

No backend code

- This project does not include a backend server. It is a frontend app. The only external API used is `https://api.xposedornot.com/v1/check-email/<email>` for breach checks.

How to see your saved form data in the browser

- Open DevTools (press F12 or Ctrl+Shift+I).
- Go to the Application (Chrome/Edge) or Storage (Firefox) tab.
- Find Local Storage → http://localhost:5173 → `dataguard_forms`.
- Or run in Console:

```javascript
JSON.parse(localStorage.getItem('dataguard_forms') || '[]')
```

Privacy note (short)

- The data you add to Form Tracker stays in your browser only.
- When you search with the Breach Checker, your email is sent to a third-party API (XposedOrNot) for the check.

If you want more details or a shorter summary, tell me which part to simplify further.
