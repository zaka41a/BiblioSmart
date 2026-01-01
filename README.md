<div align="center">

# 📚 BiblioSmart — Premium Library SaaS

**Empower every library with a beautiful reader experience, data-driven ops cockpit, and enterprise-ready guardrails.**

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)](#) [![Next Gen](https://img.shields.io/badge/TypeScript-5-2f74c0?style=flat&logo=typescript)](#) [![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=flat&logo=prisma)](#) [![Express](https://img.shields.io/badge/Express-API-111?style=flat&logo=express)](#)

🔗 **Live stack**: React + Vite + Tailwind • Express + Prisma + PostgreSQL • JWT, EmailJS, Stripe-ready  
🧭 **Docs**: See [`DOCUMENTATION.md`](DOCUMENTATION.md) for the full playbook.

</div>

---

## 🚀 Why BiblioSmart?

- **Modern reader experience** with animated catalog cards, immersive PDF reader, and free/paid access control.
- **Ops cockpit** for librarians: book/user CRUD, analytics, settings, and SaaS-ready toggles.
- **Security baked in**: JWT cookies, rate limiting, Helmet, Zod validation, password reset tokens, doc’d audits.
- **Multi-tenant + Stripe foundations** prepared for real subscription plans and billing automation.
- **Serious documentation**: deployment, security, beta plan, production readiness, roadmap, final implementation report.

---

## 🌟 Product Vision & Goals

| 🎯 Goal | ✅ Current Status |
| --- | --- |
| Deliver Netflix-grade reading UX for patrons | Hero landing page, catalog with filters, BookDetail + paywall, BookReader |
| Streamline librarian workflows | Dedicated Admin dashboard, Book/User management, analytics, settings |
| Turn libraries into SaaS customers | Purchase flows, Stripe integration scaffolding, plan-based limits pending |
| Ship like a startup | Monorepo with typed stack, workspace scripts, runbooks, and production guides |

---

## 🌈 Feature Universe

### 📚 Patron Experience
- Landing page with motion badges, KPI counters, testimonials hooks.
- Catalog search with debounced queries, genre pills, availability filter, and stats banner.
- Book detail page featuring pricing badge, call-to-actions, favorites, sample review cards.
- Secure PDF reader: zoom, pagination, fullscreen, downloads, graceful fallback when no PDF.
- Auth flows: login/register, forgot/reset password (EmailJS fallback), protected routes per role.

### 🛠 Librarian & Admin Suite
- Admin dashboard hero + quick actions cards.
- Book CRUD with modal forms, validation, toasts, delete confirmation, CSV-ready layout.
- User management: search, inline edit modal, role toggle, password reset and deletion guardrails.
- Analytics view (Recharts): revenue, sales trend, categories distribution, top sellers table.
- Settings center with tabs (Email, Payment, General) persisting to `localStorage`.
- Legal, privacy, contact, and contextual helper text for public transparency.

### 🧱 Platform Services
- Express API using modular controllers, Prisma ORM, typed middleware, and health endpoint.
- Prisma schema for `users`, `books`, `purchases`, `refresh_tokens` + seed data.
- Purchase controller for direct acquisitions, stats endpoints, and admin oversight.
- Email service with crypto-secured reset tokens + metadata bridging to EmailJS.
- Stripe + Organization services ready for multi-tenant subscription lifecycle (routes parked for rollout).

---

## 🧠 Architecture in a Glance

```
Client (React 18 + Vite + Tailwind + Zustand)
        │ REST / Fetch API
        ▼
Express API (Controllers → Services → Middleware)
        │
Prisma Client
        │
PostgreSQL (users, books, purchases, refresh_tokens + future org/subscription tables)
```

- **Front**: Context providers (Auth/Books/Purchases) abstract API access and caching.  
- **Back**: Express server wires routes with Zod validation, authentication middleware, and rate limiting.  
- **Docs-first**: `/` holds guides for operations, security, Stripe, rollout plans, and reporting.

---

## 🧩 Stack Deep Dive

| Layer | Ingredients |
| --- | --- |
| Frontend | React 18, TypeScript, Vite, TailwindCSS, Framer Motion, React Router, Recharts, React PDF, EmailJS, Stripe.js, Zustand |
| Backend | Node.js 18, Express, TypeScript, Prisma, PostgreSQL, bcrypt, JWT (access+refresh), Zod, Helmet, express-rate-limit, Multer/Cloudinary ready |
| Tooling / DX | npm workspaces, ESLint, Prettier, Tailwind CLI, ts-node, Nodemon, Prisma Migrate/Studio, PostCSS, Husky-ready scripts |
| Ops Docs | `ADMIN_SETUP_GUIDE.md`, `SECURITY_IMPLEMENTATION.md`, `PRODUCTION_DEPLOYMENT_GUIDE.md`, `STRIPE_SETUP_GUIDE.md`, etc. |

---

## 🗂 Repository Topology

```
.
├── backend/
│   ├── prisma/           # schema, migrations, seed
│   └── src/
│       ├── config/       # Prisma singleton, env helpers
│       ├── controllers/  # auth, books, purchases, users
│       ├── middleware/   # auth, rate limiting, validation, errors
│       ├── routes/       # v1 endpoints (+ future *.disabled routes)
│       ├── services/     # email, stripe, organization
│       └── utils/        # jwt, password helpers
├── frontend/
│   ├── src/
│   │   ├── pages/        # Home, Catalogue, BookDetail, Admin suites…
│   │   ├── components/   # UI kit + auth helpers
│   │   ├── context/      # Auth/Book/Purchase providers
│   │   ├── hooks/        # useTheme, useDebouncedValue, toasts
│   │   └── config/api/   # Endpoint registry + fetch helper
│   └── public/           # Static assets
├── docs/*.md             # Operational guides & reports
└── README.md             # ← you are here
```

---

## 🛠 Local Development

### Prerequisites
- Node.js ≥ 18
- npm ≥ 8 (workspaces)
- PostgreSQL 14+ (local, Docker, or managed)
- Optional: Stripe CLI, Docker

### 1. Install

```bash
git clone https://github.com/your-org/BiblioSmart.git
cd BiblioSmart
npm install
```

### 2. Configure `.env`

`backend/.env` (sample):
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bibliosmart"
JWT_ACCESS_SECRET="replace-me"
JWT_REFRESH_SECRET="replace-me-too"
FRONTEND_URL="http://localhost:5173"
EMAILJS_SERVICE_ID=""
EMAILJS_TEMPLATE_ID=""
EMAILJS_PUBLIC_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_BASIC_PRICE_ID=""
STRIPE_PRO_PRICE_ID=""
STRIPE_ENTERPRISE_PRICE_ID=""
```

`frontend/.env`:
```env
VITE_API_URL="http://localhost:5001/api"
VITE_STRIPE_PUBLIC_KEY=""
```

### 3. Database bootstrap

```bash
cd backend
npx prisma db push --force-reset   # sync schema
npx prisma db seed                 # create admin/user + sample books
```

### 4. Run apps

```bash
npm run dev:backend   # http://localhost:5001
npm run dev:frontend  # http://localhost:5173
```

### 5. Build & preview

```bash
npm run build
(cd backend && npm run start)
(cd frontend && npm run preview)
```

---

## 🧪 Helpful Scripts

| Command | What it does |
| --- | --- |
| `npm run dev:frontend` | Launch Vite + React dev server with HMR. |
| `npm run dev:backend` | Nodemon + ts-node for Express API. |
| `npm run build` | Builds frontend assets and compiles backend to `dist/`. |
| `npm run lint` | ESLint on both workspaces. |
| `npm run format` | Prettier on frontend sources. |
| `npx prisma studio` | GUI to inspect DB tables. |

---

## 🔐 Security Posture

- Helmet, strict CORS, rate limiters (global/auth/upload/plan-specific) wired in.
- Passwords hashed via bcrypt; access tokens set as HTTP-only cookies + optional bearer usage.
- Refresh tokens stored in DB with unique constraint; password reset tokens hashed and timeboxed.
- Purchase endpoints enforce `authenticate + authorizeAdmin` where required.
- Security runbooks with audit logs & fix history: `SECURITY_IMPLEMENTATION.md`, `SECURITY_AUDIT.md`, `SECURITY_FIXES_APPLIED.md`.
- Next steps: enable MFA/WebAuthn, per-tenant rate limiting, CSRF tokens for cookie flows, audit logging.

---

## ⚡ Performance & Reliability

- Vite + Tailwind JIT keeps bundles lean and stylings incremental.
- Memoization (`useMemo`, `useDebouncedValue`), Suspense-ready contexts, and skeleton states reduce render thrash.
- BookReader and analytics lazily load heavy libs (react-pdf, recharts).
- Prisma client reused as singleton; query logging toggled by `NODE_ENV`.
- Planned: CDN-backed PDF/cover uploads, Sentry/PostHog instrumentation, plan-driven throttling.

---

## 🗺️ Roadmap Snapshot

- ✅ Core CRUD, reader flows, purchase flows, documentation suite.
- 🔄 Password reset API wiring (routes), admin panel polish, QA automation.
- 🚧 Multi-tenancy schema + Stripe lifecycle + plan limits.
- 🚧 File uploads (S3/Cloudinary) + CDN + quotas.
- 🚧 Observability stack (Sentry + PostHog/Mixpanel).
- 🚧 Automated tests (Jest/Supertest/Playwright) + CI pipelines.

Detailed action items live in `SAAS_ROADMAP.md`, `PROGRESS_REPORT.md`, `FINAL_IMPLEMENTATION_REPORT.md`.

---

## 🤝 Contribution Guidelines

1. Fork & branch from `main` (`feat/*`, `fix/*`, `docs/*`).
2. Keep backend/frontend changes scannable; add screenshots for UI tweaks.
3. Run `npm run lint` (and tests when available) before pushing.
4. Update docs/README when behavior changes.
5. Open PR with context, verification steps, and risk notes.

> Security-sensitive work? Coordinate privately before opening the PR.

---

## 📄 License

This repo currently ships **without a license**.  
👉 Recommendation: add the MIT License to stay startup-friendly while keeping contributions open. (Create a `LICENSE` file before going public.)

---

## 📚 Documentation Suite

See [`DOCUMENTATION.md`](DOCUMENTATION.md) for a curated index. Highlights include:

- `ADMIN_SETUP_GUIDE.md` — provisioning orgs, admins, environments.
- `PRODUCTION_DEPLOYMENT_GUIDE.md` — Railway/Vercel deploys + Stripe webhooks.
- `SECURITY_IMPLEMENTATION.md` / `SECURITY_AUDIT.md` — control lists & findings.
- `STRIPE_SETUP_GUIDE.md` — pricing, webhook, CLI scripts.
- `USER_GUIDE.md` — onboarding for librarians/patrons.
- `BETA_TEST_PLAN.md`, `PROGRESS_REPORT.md`, `FINAL_IMPLEMENTATION_REPORT.md` — alignment artifacts.

---

Made with 💚 for librarians, readers, and SaaS teams everywhere.
