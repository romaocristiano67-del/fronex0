# Fronex

Fronex is a premium institutional landing page for digital services built with Next.js 14, Tailwind CSS and a dark glassmorphism visual language. The current public experience is focused on brand presentation, service positioning and WhatsApp conversion.

## Current scope

- Premium homepage with hero, services, process and CTA sections
- Custom Fronex branding with logo, favicon and Open Graph asset
- WhatsApp CTAs with automatic service-aware messages
- Structured data, robots and sitemap for baseline SEO
- Supabase schema prepared as the foundation for a future marketplace layer

The visual and structural base is intentionally preserved. This repository is now hardened for production deployment, with Vercel as the primary target and Netlify as a secondary fallback.

## Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS
- Supabase JavaScript client

## Environment variables

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Supported variables:

- `SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_WHATSAPP_PHONE`

## Local development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
npm run check
```

Clean local build and temporary folders:

```bash
npm run clean
```

## Deploy

### Vercel

Vercel is the official deployment target for this project.

- Framework preset: `Next.js`
- Install command: `npm install`
- Build command: `npm run build`
- Output: automatic from Next.js

Set the environment variables from `.env.example` in the Vercel dashboard before deploying.

### Netlify

Netlify is kept as a secondary fallback for the current static frontend footprint.

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `18`

If the project later grows into a fuller App Router backend or server actions workflow, Vercel should remain the preferred host.

## Supabase foundation

The file [`database/schema.sql`](./database/schema.sql) contains the prepared schema for:

- profiles
- categories
- listings
- listing images
- subscription plans
- subscriptions
- messages

It is included as the base for the future marketplace evolution, but the current homepage does not yet expose the full marketplace UI.

## Production notes

- The homepage is static and prerender-friendly.
- Metadata, favicon, sitemap and robots are already wired.
- No server-only secret is consumed by the current client code.
- The current conversion path is WhatsApp-first and uses the selected service context automatically.
