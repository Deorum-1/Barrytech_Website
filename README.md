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
- The free assessment form sends the request to Web3Forms, emails the visitor detailed descriptions of selected services through EmailJS, and sends a separate EmailJS notification to BarryTech.

## Assessment form setup

Create a Web3Forms access key for the inbox that should receive assessment requests. In EmailJS, set the template's **To Email** field to `{{to_email}}` so it uses the visitor address for the service email and `info@sai.com.ng` for the BarryTech notification. Use `to_name`, `email_subject`, `email_body`, and `reply_to` in the template. Then add these values to `.env.local`:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_access_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart the development server after changing `.env.local`. Web3Forms submits the visitor's name, email, phone, organization type, selected services, and message to the inbox associated with its access key. EmailJS sends the detailed service descriptions to the visitor and a separate notification containing the selected services and form details to `info@sai.com.ng`.

When deploying, add all four variables to the hosting provider's build environment and redeploy. The Web3Forms access key and EmailJS public key are included in the browser build. Never commit `.env.local` or private service credentials.
