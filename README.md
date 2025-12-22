# BiblioSmart · Modern Library SaaS

> **BiblioSmart** is a full-stack SaaS platform that helps libraries deliver premium digital reading experiences, operate multi-role back offices, and unlock subscription revenue with enterprise-grade security in mind.

---

## Vision & Objectives

- Provide a unified catalog + reading experience that feels like a native app for patrons.
- Give library teams admin tooling (catalog, users, analytics, invoices) that is fast, friendly, and auditable.
- Offer SaaS guardrails: tenancy isolation, subscription management, automated onboarding, and deployment playbooks.
- Ship in a way that a real startup can iterate on: typed stack, automation-ready scripts, security-first defaults.

---

## Product Pillars & Current Feature Set

### Reader & Patron Experience
- Marketing/landing page with value prop, social proof, and dynamic metrics (`frontend/src/pages/Home.tsx`).
- Public catalog: faceted search, debounced filtering, animated cards, and availability toggles (`pages/Catalogue.tsx`).
- Detail view with pricing, Stripe-ready purchase hooks, share CTAs, and PDF download (`pages/BookDetail.tsx`).
- Secure reader built on `react-pdf` (zoom, pagination, fullscreen, download fallback, paywall guard) (`pages/BookReader.tsx`).
- Auth flows: login, register, forgot/reset password with EmailJS fallback, and protected routing.

### Librarian & Admin Suite
- Admin dashboard + quick-launch tiles (`pages/AdminDashboard.tsx`).
- Book management CRUD with validation, toasts, and delete confirmations (`pages/BookManagement.tsx`).
- User management with search, inline edits, role toggles, and delete protection (`pages/UserManagement.tsx`).
- Analytics powered by `recharts` (revenue, sales, category distribution, top sellers) (`pages/Analytics.tsx`).
- Settings hub for email + payment configuration, general SaaS toggles, and helper copy (`pages/Settings.tsx`).
- Static operational pages (legal notice, privacy policy, contact).

### Platform & API Capabilities
- Monorepo using npm workspaces (`package.json`) with isolated frontend/backend packages.
- Backend API (Express + TypeScript + Prisma) with controllers for auth, books, purchases, and users.
- JWT auth with HTTP-only cookies, refresh tokens, bcrypt passwords, per-route Zod validation.
- Prisma schema + seeds for users, books, purchases, refresh tokens (`backend/prisma`).
- Rate limiting (`middleware/rateLimiter.ts`), Helmet, CORS with origin allow-list, centralized error handling.
- Email service for password reset tokens (EmailJS metadata bridge) and extensibility hooks.
- Stripe service + multi-tenancy services prepared for next milestones (`backend/src/services`).

---

## In-flight / Upcoming Capabilities

See `SAAS_ROADMAP.md` for full detail. Highlights already scaffolded in the codebase:

- **True multi-tenancy**: `Organization` + `Subscription` models, tenant-aware middleware, plan limits.
- **Stripe subscriptions**: checkout, billing portal, lifecycle webhooks, plan upgrades/downgrades, cancellation.
- **File management**: S3/Cloudinary integration for covers/PDFs with per-plan quotas and CDN delivery.
- **Transactional email**: move from EmailJS demo mode to SendGrid/Mailgun/Resend for welcome, invoices, reminders.
- **Observability**: structured logging, Sentry, and product analytics instrumentation.
- **CI/CD**: deployment scripts for Railway/Vercel, secrets automation, and staged environments.

---

## Technical Stack

| Layer | Technologies & Notes |
| --- | --- |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Recharts, React Router, Zustand, EmailJS, Stripe.js, React PDF |
| Backend API | Node.js 18, Express, TypeScript, Prisma, PostgreSQL, bcrypt, JWT, Zod validation, Helmet, CORS, express-rate-limit, Multer/Cloudinary placeholders |
| Tooling & DX | npm workspaces, ESLint, Prettier, Tailwind CLI, Nodemon, ts-node, Prisma Migrate/Studio, PostCSS, Husky-ready scripts |
| Documentation | Deployment/security/runbooks (`ADMIN_SETUP_GUIDE.md`, `SECURITY_IMPLEMENTATION.md`, `PRODUCTION_DEPLOYMENT_GUIDE.md`, etc.) |

---

## Architecture Overview

BiblioSmart follows a clean separation between client and API while sharing typings and environment contracts through workspace scripts.

```
Browser (React, Tailwind, Router, Zustand)
        │ REST / Fetch, Cookies, Stripe.js
        ▼
Express API (Controllers → Services → Prisma DAO)
        │
Prisma Client
        │
PostgreSQL (users, books, purchases, refresh_tokens, future org/subscription tables)
```

Key flows:
- Auth: React context → `/api/auth/*` → cookies + refresh token rotation.
- Catalog: BookContext fetches `/api/books`, caches client-side, exposes CRUD to admin views.
- Purchases: PurchaseContext wraps `/api/purchases` endpoints and enforces access control in BookReader.
- Password reset: EmailJS integration requests `/api/auth/forgot-password` (backend returns template payload + secure token).
- Stripe & tenancy: service classes prepared for plan-aware logic even if routes are currently disabled.

---

## Repository Layout

```
.
├── backend/                     # Express API
│   ├── prisma/                  # Schema, migrations, seed data
│   └── src/
│       ├── config/              # Prisma singleton, env helpers
│       ├── controllers/         # Auth, books, users, purchases
│       ├── middleware/          # Auth, rate limiting, validation, errors
│       ├── routes/              # Route registrations (+ future .disabled routes)
│       ├── services/            # Stripe, organizations, email
│       ├── utils/               # JWT, password helpers
│       └── server.ts            # API bootstrap
├── frontend/                    # React app (Vite + Tailwind)
│   ├── src/
│   │   ├── pages/               # Feature screens (catalog, dashboards, settings…)
│   │   ├── components/          # UI primitives, auth helpers
│   │   ├── context/             # Auth, Books, Purchases providers
│   │   ├── hooks/               # Theme, debounce, toasts
│   │   ├── config/ & api/       # REST helpers & endpoints
│   │   └── styles/              # Tailwind layers
│   └── public/                  # Static assets, favicons
├── docs/*.md                    # Operational guides (security, roadmap, deployment…)
└── package.json                 # Workspace orchestration
```

Each doc in `/` (e.g. `SECURITY_IMPLEMENTATION.md`, `PROGRESS_REPORT.md`, `STRIPE_SETUP_GUIDE.md`) is production-ready documentation for onboarding ops, devs, and auditors.

---

## Local Development

### Prerequisites
- Node.js ≥ 18
- npm ≥ 8 (workspaces aware)
- PostgreSQL 14+ (local instance or managed service)
- Optional: Docker for DB, Stripe CLI for webhook testing

### 1. Clone & install

```bash
git clone https://github.com/your-org/BiblioSmart.git
cd BiblioSmart
npm install
```

### 2. Configure environment variables

Create `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bibliosmart"
JWT_ACCESS_SECRET="replace-with-strong-secret"
JWT_REFRESH_SECRET="replace-with-refresh-secret"
FRONTEND_URL="http://localhost:5173"
EMAILJS_SERVICE_ID=""
EMAILJS_TEMPLATE_ID=""
EMAILJS_PUBLIC_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_BASIC_PRICE_ID=""
STRIPE_PRO_PRICE_ID=""
STRIPE_ENTERPRISE_PRICE_ID=""
```

Create `frontend/.env`:

```env
VITE_API_URL="http://localhost:5001/api"
VITE_STRIPE_PUBLIC_KEY=""
```

> Tip: keep secrets in Doppler, 1Password, or Railway/Vercel project vars for staging/production.

### 3. Database & Prisma

```bash
cd backend
npx prisma migrate dev
npx prisma db seed   # optional sample data
npx prisma studio    # explore tables if needed
```

### 4. Run the platform

```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

- API: `http://localhost:5001/api`
- Frontend: `http://localhost:5173`

### 5. Production build

```bash
npm run build                # runs frontend + backend builds
(cd backend && npm run start)  # serve compiled API (dist/server.js)
(cd frontend && npm run preview) # or deploy via Vercel/Netlify
```

---

## Useful Scripts

| Command | Description |
| --- | --- |
| `npm run dev:frontend` | Launch Vite dev server with HMR. |
| `npm run dev:backend` | Run Express API with Nodemon + ts-node. |
| `npm run build` | Build frontend artifacts & transpile backend TypeScript. |
| `npm run lint` | ESLint across workspaces. |
| `npm run format` | Prettier pass on frontend sources. |
| `npm run prisma:migrate` (backend) | Apply migrations. |

---

## Configuration & Data Notes

- **Seed data**: `backend/prisma/seed.ts` provisions admin/user accounts plus curated books.
- **Docs as SOP**: runbooks walk through admin setup, beta testing, production hardening, and post-mortem reports.
- **Feature flags**: `.disabled` route files keep experimental endpoints checked-in without shipping them.
- **Local settings**: Email/Stripe/General settings are persisted in `localStorage` for demo/testing UX.

---

## Best Practices Already in Place

- Full TypeScript coverage (frontend + backend) with shared domain typing via Prisma.
- Providers (`AuthContext`, `BookContext`, `PurchaseContext`) decouple network state from UI.
- Form validation with Zod on the server, UI-level validation + friendly toasts on the client.
- HTTP-only cookies for access tokens plus refresh rotation endpoints.
- Rate limiting presets for API, auth, uploads, and future tenant-level throttling.
- Documented operational playbooks for deployment, security audits, beta programs, and multi-tenancy rollout.

---

## Security

- Helmet, CORS config, and `express-rate-limit` guard rails activated in `server.ts`.
- Passwords hashed with bcrypt, refresh tokens stored in DB, reset tokens hashed via SHA-256.
- Purchase and admin routes enforce role-based access middleware.
- Email reset flows avoid leaking user existence and support demo-only fallback copy.
- Stripe service ready for signature verification, webhook processing, and billing portal flows.
- Security reports + fix logs tracked in `SECURITY_AUDIT.md` and `SECURITY_FIXES_APPLIED.md`.

> Next steps: enable MFA / WebAuthn, CSRF protection, audit logging, and tenant-aware rate enforcement once multi-tenancy schema lands.

---

## Performance & Reliability

- Vite bundling + Tailwind JIT for fast builds and minimal CSS.
- SPA interactions use memoization (`useMemo`, `useDebouncedValue`), motion-based lazy transitions, and contextual caching.
- Prisma client reuse prevents connection storms; logging configurable per env.
- Analytics dashboards and BookReader split heavy components (`react-pdf`, `recharts`) to avoid blocking initial paint.
- Planned CDN/offloading for PDFs and covers to keep API lean.

---

## Roadmap Snapshot

- ✅ Core CRUD (books/users) + reader/purchase flows.
- 🚧 Multi-tenancy + Stripe subscriptions + organization-level limits.
- 🚧 File storage + CDN delivery + quotas per plan.
- 🚧 Observability and alerting (Sentry, PostHog/Mixpanel, structured logs).
- 🚧 Automated test suites (Jest, Playwright) and CI enforcement.
- 🚧 Advanced SaaS tooling: invitations, audit trails, SLA dashboards.

Track detailed progress in `SAAS_ROADMAP.md`, `PROGRESS_REPORT.md`, and `FINAL_IMPLEMENTATION_REPORT.md`.

---

## Contribution Guidelines

1. Fork & branch from `main` (`feat/*`, `fix/*` naming).
2. Keep frontend and backend changes in isolated commits when possible.
3. Run `npm run lint` and relevant tests before pushing.
4. Update documentation (README or `/docs/*.md`) when behavior changes.
5. Open a PR with context, screenshots, and testing evidence.

> For security-sensitive work, coordinate with maintainers before publishing the branch.

---

## License

No license file is committed yet. **Recommendation:** adopt the MIT License to keep the codebase compatible with commercial SaaS while allowing contributors to reuse patterns. Add a `LICENSE` file at the repo root before going public.

---

## Additional Documentation

- `ADMIN_SETUP_GUIDE.md` — how to provision orgs, admins, and environments.
- `PRODUCTION_DEPLOYMENT_GUIDE.md` — Railway + Vercel deployment SOP with Stripe webhooks.
- `SECURITY_IMPLEMENTATION.md` / `SECURITY_AUDIT.md` — controls, fixes, and compliance checklist.
- `STRIPE_SETUP_GUIDE.md` — pricing, webhook, and CLI instructions.
- `USER_GUIDE.md` — onboarding for librarians/patrons.
- `BETA_TEST_PLAN.md`, `FINAL_IMPLEMENTATION_REPORT.md`, `PROGRESS_REPORT.md` — delivery documentation for stakeholders.

Dive into these documents for deeper operational context when preparing a real production rollout.
