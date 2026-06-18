# XERON Frontend (React + Vite)

Static marketing site for [XERON](https://xeron.link), built with React 19, Vite, React Router v6+, and Tailwind CSS v4.

## Setup

```bash
cd frontend-react
npm install
cp .env.example .env   # optional — set VITE_API_BASE_URL for local API
```

Add static assets to `public/` (not in git):

- `BG.png` — page background
- `ImagePlaceholder.png` — portfolio/about placeholders

## Development

```bash
npm run dev
```

Open http://localhost:5173

## Production build

```bash
npm run build
```

Output: `dist/` (static files). Deploy to any static host (Netlify, Hostinger, etc.).

`public/_redirects` includes SPA fallback for Netlify-style hosts:

```
/*    /index.html   200
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services list |
| `/services/:slug` | Service detail |
| `/portfolio` | Portfolio list |
| `/portfolio/:slug` | Portfolio detail |
| `/portfolio/:slug/:section` | Portfolio process section |
| `/contact` | Contact |
| `/jobs` | Jobs list |
| `/jobs/:slug` | Job detail |

## API

All data fetches use `src/lib/constants.js` → `BASE_URL` (default: `https://xeronapi.xeron.tech`).

Override with `VITE_API_BASE_URL` in `.env` for local Laravel (`http://127.0.0.1:3300`).
