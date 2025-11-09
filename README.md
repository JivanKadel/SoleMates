# Solemates

Solemates - where you find your perfect shoes.

This is an Ecommerce site built with Next.js (TS), Tailwind CSS.

## Download or Clone

- Download the repository as a ZIP from GitHub and extract it, or

- Clone the repo:

```bash
git clone <repository-url>

cd <repo-folder>
```

## Install

Install dependencies using your preferred package manager:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

```

## Run (development)

Start the development server:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

Open http://localhost:3000 in your browser.

## Build and Run (production)

Build and start the production server:

```bash
# build
npm run build

# start
npm start
```

(Or use the equivalent yarn/pnpm commands.)

## Environment

If the project requires environment variables, create a `.env.local` file at the project root and add required keys (API credentials, payment keys, etc.). Example:

```
NEXT_PUBLIC_API_URL=VALUE
```

## Deploy

The app is ready to deploy to platforms like Vercel, Netlify, Cloudflare, Fly.io or any node hosting that supports Next.js. See Next.js deployment docs for platform-specific details.

## Notes

- Edit pages in the `app/` (or `pages/`) directory and components in `components/`.

- Static assets go in `public/`.

- Run tests or linting with the scripts defined in `package.json` (if provided).
