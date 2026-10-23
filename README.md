# BarryTech Website

React + Vite + Tailwind CSS (v3) + React Router + Framer Motion + Lucide icons.

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
```

- Content lives in `src/data/` (company.js, services.js), so copy changes need no component edits.
- Contact details, WhatsApp number, and map link live in `company.contact` and are used by the navbar, contact page, footer, and structured data.
- Brand colors (from the logo) are defined in `tailwind.config.js` (`brand`, `hot`, `ink`).
- Page titles/descriptions are set per route with `src/hooks/usePageMeta.js`. Update the placeholder social preview at `public/og-image.png` when branding changes.
- The contact form currently opens the visitor's email app (mailto). To capture submissions in a backend, replace the handler in `src/pages/Contact.jsx`.
