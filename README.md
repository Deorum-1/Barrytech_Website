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
- Dark mode is used on the first visit unless a theme choice has already been saved. The sun/moon button can switch themes, and explicit choices are saved in `localStorage`.
- To test both themes, run `npm run dev`, use the navigation theme button, and reload to confirm the selection persists. Clear the `barrytech-theme` local storage key to test the dark-mode first-visit behavior.
- Page titles/descriptions are set per route with `src/hooks/usePageMeta.js`. Update the placeholder social preview at `public/og-image.png` when branding changes.
- The free assessment form sends the request and selected service names to Web3Forms, then emails the visitor detailed descriptions of selected services through EmailJS.

## Assessment form setup

Create a Web3Forms access key for the `info@sai.com.ng` inbox. In EmailJS, set the template's **To Email** field to `{{to_email}}` so service details go to the visitor. Use `to_name`, `email_subject`, and `reply_to` in the template. Set the email body to HTML and insert `{{{email_body}}}` (triple braces) so the formatted service headings render bold and distinct. Then add these values to `.env.local`:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_access_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart the development server after changing `.env.local`. The Web3Forms access key must belong to the inbox that should receive the visitor's name, email, phone, organization type, selected services, and message. EmailJS sends the detailed service descriptions to the visitor.

When deploying, add all four variables to the hosting provider's build environment and redeploy. The Web3Forms access key and EmailJS public key are included in the browser build. Never commit `.env.local` or private service credentials.
