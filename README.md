# Solemate — (Under construction)

Solemate — a modern shoe shop built with Next.js (TypeScript), Tailwind CSS and Material Symbols. The project is a learning / demo app where client-side features (useReducer + useContext) and many Next.js capabilities were explored. The site follows performance, accessibility and best-practice guidance, but is still a work in progress (mobile tweaks, dark mode and a few pages need polishing).

## Live demo (Netlify): https://solemateshoes.netlify.app/

---

![web.dev performance report](/public/images/readme/website_performance.png)

---

## Tech stack & libs

- Next.js (TypeScript)

- Tailwind CSS

- Material Symbols (icons as fonts)

- React useReducer + useContext for app state (cart/favorites)

- ESLint, Prettier (where configured)

---

## Current status / Known issues

- Site is under construction.

- Mobile responsiveness and dark mode need improvement.

- Favorites page, checkout flow and cart UX require further work.

- SSR and hydration issues that were addressed (see notes below), but edge cases may remain.

- Many client-side Next.js features used for learning (routing, API routes, image optimizations, dynamic routes, params).

---

## Recruiter — quick flow

General user/recruiter flow implemented end-to-end:

1. Home page: marketing, featured shoes.

2. Explore page: browse product list.

3. Apply filters and sort (client-side filtering implemented).

4. Click an item to view an individual shoe page (/explore/[id]).

5. Add to cart from list or product page.

6. Remove items from cart.

7. Add to favorites from product page (favorites page needs further work).

---

## Highlights & engineering notes

- Accessibility: semantic HTML, alt text for images, focus management for modals and keyboard navigation considered.

- Performance: image optimization using Next/Image, code-splitting, lazy-loading where beneficial, and best-practice meta tags.

- SSR & hydration: dynamic content is server-rendered where appropriate and hydrated client-side. Common hydration mismatches were fixed.

- Tailwind fixes: corrected purge/content config, resolved class name generation issues that caused missing styles in production.

- State management: useReducer drives cart/favorites logic; useContext exposes state/actions to components — simple, testable and easy to extend.

- Testing & linting: run available scripts (if present) to check style and correctness.

- Accessibility & best practices from web.dev were consulted when implementing features.

---

## Files & structure (high level)

- app/ routes

- components/ — UI components

- public/ — static assets

- styles/ — Tailwind entry / global styles

- context/ — hooks, reducers and context providers

- utils/ — utilities for data fetching, filtering

---

## Get started (clone, install, run)

Clone:

```bash
git clone <repository-url>

cd <repo-folder>
```

Install dependencies:

```bash
# npm
npm install

# or yarn
yarn install

# or pnpm
pnpm install
```

Run development server:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

Open http://localhost:3000

Build & run production locally:

```bash
# build
npm run build

# start
npm start
```

---

## Deploy (Netlify - example workflow)

Netlify supports Next.js in multiple ways. Two common approaches:

1. Static export (if your app can be fully exported):
   ```bash
   npm run build
   npm run export   # produces /out
   # then deploy with Netlify CLI
   netlify deploy --prod --dir=out
   ```
2. Full Next.js on Netlify (server functions / adapter):

   - Use Netlify's Next.js plugin or a community adapter. Configure build command as `npm run build` and follow Netlify docs for Next.js deployments.

   - Ensure required environment variables are set in Netlify dashboard.

---
