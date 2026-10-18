# Sansum Water Tanzania — Website Source

Production-ready marketing website for Sansum Water (Dar es Salaam, Tanzania).
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion
and shadcn/ui.

## Run Locally

```bash
bun install        # or: npm install
bun run dev        # http://localhost:3000
```

## Production Build & Start

```bash
bun run build      # creates .next/standalone (output: "standalone")
bun run start      # NODE_ENV=production bun .next/standalone/server.js
```

The build script copies `.next/static` and `public/` into the standalone
output, so the whole server lives in `.next/standalone/` — ideal for VPS /
Docker deploys (e.g. behind the included Caddyfile reverse proxy).

### Environment Variables

| Variable               | Required | Purpose                                             |
| ---------------------- | -------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | prod     | Live domain (e.g. https://sansum.co.tz) used for canonical/OpenGraph URLs; falls back to http://localhost:3000 |

### Deploy Checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
2. `bun run build && bun run start` (or run the standalone server in a container).
3. Reverse-proxy port 3000 behind HTTPS (Caddyfile included).

## Project Structure

```
src/
  app/                 # App Router
    page.tsx           # Home: Hero → Highlights → Products → About →
                       #   Manufacturing Process → Quality → Testimonials →
                       #   CTA → Contact
    order/page.tsx     # Order Now page (UI-only form + live summary)
    not-found.tsx      # Branded 404
    layout.tsx         # Fonts, SEO metadata, OG tags
    globals.css        # Tailwind theme tokens + custom hover rules
  components/site/     # All site sections (navbar, footer, hero, order-now…)
  components/ui/       # shadcn/ui primitives
public/
  brand/               # Logo, hero, CTA and manufacturing assets
  products/            # Bottle packshots (1L, 3L, 5L, 10L)
```

## Notes

- The Order Now page is a pure UI implementation: no form submission, backend
  or API calls; the Submit button is a visual element only.
- Product prices are intentionally absent — the order summary shows a
  placeholder total that the Sansum Water team confirms on contact.
- The top bar is hidden on mobile (< 640px) by design.
- Footer credit links to https://www.rwextech.co.tz/
