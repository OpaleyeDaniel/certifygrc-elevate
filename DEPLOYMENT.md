# Deploying CertifyGRC to Vercel

This app is a **Vite + React** static frontend with **serverless API routes** in `/api` (email via **Resend HTTPS API** when `RESEND_API_KEY` is set, otherwise **SMTP** via Nodemailer). Vercel runs `npm run build`, serves `dist/`, and deploys each `api/*.ts` file as a Node serverless function.

## Prerequisites

- Node.js 20+ (see `package.json` → `engines`)
- A Git repository (GitHub, GitLab, or Bitbucket) connected to Vercel, **or** the [Vercel CLI](https://vercel.com/docs/cli)

## Environment variables (required for forms)

Copy `.env.example` to `.env.local` for local dev. In Vercel, add the **same keys** under **Project → Settings → Environment Variables**:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | **(Recommended on Vercel)** Resend API key — avoids SMTP egress issues. If set, `SMTP_*` is not required. |
| `SMTP_HOST` | SMTP server hostname (required only when not using Resend) |
| `SMTP_PORT` | Usually `587` (STARTTLS) or `465` (SSL) |
| `SMTP_SECURE` | `true` for 465; often `false` or omit for 587 |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password or app password |
| `CONTACT_EMAIL_FROM` | Verified sender address |
| `CONTACT_EMAIL_TO` | Inbox for form submissions |

Optional: `SMTP_DEBUG=true` for troubleshooting (disable in production).

**Local dev without mail:** add `MAIL_SKIP_SEND=true` to `.env.local` (requires `NODE_ENV=development`, i.e. `npm run dev`) so `/api/send-waitlist` returns success without Resend/SMTP. Remove or set `false` when testing real email delivery.

Apply to **Production** and **Preview** if you want forms to work on preview deployments.

## Deploy with GitHub (recommended)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import the repo.
3. **Project name:** set to `certifygrc` (or your preferred slug; this becomes `certifygrc.vercel.app` unless you add a custom domain).
4. **Framework preset:** Vite (auto-detected from `vite.config.ts`).
5. **Build Command:** `npm run build` (already set in `vercel.json`).
6. **Output Directory:** `dist` (already set in `vercel.json`).
7. **Install Command:** `npm install` (default).
8. Add the environment variables above.
9. Deploy.

## Deploy with Vercel CLI

```bash
npm i -g vercel
cd /path/to/certifygrc-elevate
vercel login
vercel link
vercel env pull .env.local
# Set secrets in dashboard or: vercel env add SMTP_HOST production
vercel --prod
```

First deploy may prompt for project name — use **certifygrc**.

## Routing behavior

- `vercel.json` rewrites non-API paths to `/index.html` so **React Router** works (no 404 on refresh).
- Paths under `/api/*` are handled by serverless functions, not the SPA rewrite.

## SMTP on Vercel

- Use a real SMTP provider (SendGrid, Mailgun, Amazon SES, etc.); avoid Gmail for production volume.
- Ensure `CONTACT_EMAIL_FROM` is allowed/sender-verified for that provider.
- If sends time out, increase function duration in each `api/*.ts` via `export const config = { maxDuration: 60 }` (requires a Vercel plan that supports it).
- Form APIs return **502** when the SMTP transport fails and **503** when required mail env vars are missing. Clients never receive raw SMTP errors; check **Vercel → Functions → Logs** (or your observability tool) for JSON lines with `mail_transport_failure` / `mail_not_configured` and fields like `reason`, `code`, and `message`.

### Example SMTP configuration (SendGrid-style)

Use the values your provider gives you; names map to this app’s variables:

| Setting | Example value |
|--------|----------------|
| `SMTP_HOST` | `smtp.sendgrid.net` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` (omit when using 587 with STARTTLS; the app auto-selects TLS mode from the port) |
| `SMTP_USER` | `apikey` (SendGrid) or the username your provider specifies |
| `SMTP_PASS` | API key or SMTP password |
| `CONTACT_EMAIL_FROM` | A verified sender, e.g. `noreply@yourdomain.com` |
| `CONTACT_EMAIL_TO` | Inbox for leads, e.g. `leads@yourdomain.com` |

**Port / TLS:** `587` → STARTTLS (`secure: false` in Nodemailer). `465` → implicit TLS (`secure: true`). Mismatching port and TLS mode is a common cause of `ETLS` / connection failures.

### If mail still fails on production

Typical causes: wrong host, port, or credentials; sender not verified; provider blocks SMTP from your IP (use a transactional provider with SMTP); DNS `ENOTFOUND` for `SMTP_HOST`; firewall/VPN blocking outbound 587/465. **Vercel serverless** can reach outbound SMTP on 587/465 when the provider allows it; if your provider only allows certain IPs, use their **HTTP API** (e.g. SendGrid/Mailgun REST) instead of SMTP, or switch providers.

### Fallback when mail is down

1. **Short term:** Log the failure (already done server-side) and show a generic message to users (implemented). Optionally add a **mailto:** link with `subject`/`body` pre-filled.
2. **Medium term:** Persist submissions to a **database** or **queue** (e.g. Vercel KV + background job) and retry later.
3. **Alternative transport:** Replace Nodemailer SMTP with your provider’s **HTTP API** in the same serverless function (same env vars, different client code).

### Verification checklist

**Local (`npm run dev`)**

- [ ] `.env.local` has all required variables (see table above).
- [ ] Submit contact, consultation, partner, and waitlist forms; no user-facing SMTP text.
- [ ] On intentional bad SMTP host, confirm UI shows the generic message and **terminal** logs show `mail_transport_failure` with `reason`.

**Staging / Preview**

- [ ] Vercel env vars set for **Preview** (if you use preview deploys).
- [ ] Same form tests against the preview URL.

**Production**

- [ ] All env vars set for **Production**; redeploy after changing secrets.
- [ ] Submit each form once; confirm internal notification + user confirmation (where applicable).
- [ ] In Vercel logs, confirm no `mail_not_configured` in steady state.

## Custom domain

In Vercel: **Project → Settings → Domains** → add `certifygrc.com` (or your domain) and follow DNS instructions.

## Local production check

```bash
npm run build
npm run preview
```

API routes are **not** emulated by `vite preview`; use `npm run dev` (dev middleware in `vite.config.ts`) or hit a **preview deployment** on Vercel to test `/api/*` end-to-end.
