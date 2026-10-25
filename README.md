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
- The “Call BarryTech” form uses EmailJS to notify `info@sai.com.ng` and email selected service details to the visitor.

## Email delivery setup

Email delivery needs an EmailJS account and a connected email service. In the EmailJS dashboard, create one template with these dynamic fields:

- **To Email:** `{{to_email}}`
- **Reply To:** `{{reply_to}}`
- **Subject:** `{{email_subject}}`
- **Content:** `{{email_body}}` (use a plain-text body so line breaks remain readable)

Copy `.env.example` to `.env.local` and fill in the service ID, template ID, and public key from EmailJS. Add the same three variables to the production host's build environment and rebuild the site. The form sends one notification to BarryTech and one tailored service guide to the visitor. The two requests are spaced to comply with EmailJS's send rate limit. Do not put an EmailJS private key in the website.
