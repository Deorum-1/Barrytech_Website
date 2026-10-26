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
- The free assessment form is submitted through Web3Forms to the inbox associated with its access key.

## Assessment form setup

Create a Web3Forms access key for the inbox that should receive assessment requests. Configure EmailJS with a template that uses `to_email`, `to_name`, `email_subject`, `email_body`, and `reply_to`, then add these values to `.env.local`:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_access_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart the development server after changing `.env.local`. The assessment form sends the visitor's name, email, phone, organization type, selected services, and message to Web3Forms. It also sends a detailed selected-service email to the visitor using EmailJS. The email field is used as the reply-to address.

When deploying, add all four variables to the hosting provider's build environment and redeploy. The Web3Forms access key and EmailJS public key are included in the browser build. Never commit `.env.local` or private service credentials.
