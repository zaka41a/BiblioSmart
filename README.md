# BiblioSmart Monorepo

BiblioSmart is a modern platform that lets readers discover, borrow, and manage physical or digital books. This repository contains both the React + Tailwind CSS front-end and the Express + Prisma API back-end.

## Stack Overview

| Layer | Technology |
| --- | --- |
| Front-end | React 18, Vite, TypeScript, Tailwind CSS, React Router, Zustand |
| Back-end | Node.js, Express, TypeScript, Prisma, PostgreSQL |
| Auth | JWT (access + refresh) with secure cookies |
| Tooling | ESLint, Prettier, Husky-ready scripts, pnpm-compatible workspaces |

## Quick Start

> **Prerequisites**
>
> - Node.js 18+
> - PostgreSQL 14+ running locally or via Docker
>
> Optional: pnpm or npm 7+ for workspaces.

```bash
# Install dependencies (from repo root)
npm install

# Spin up database (if you have Docker)
docker compose up -d db

# Generate Prisma client & seed
tcd backend
npx prisma migrate dev
npx prisma db seed

# Run both apps (separate terminals)
npm run dev:backend
npm run dev:frontend
```

Front-end dev server defaults to `http://localhost:5173`. The API listens on `http://localhost:5001`.

## Structure

```
bibliosmart/
├── backend/          # Express API + Prisma ORM
│   ├── prisma/       # Schema + seed data (20 books)
│   └── src/          # Controllers, routes, middleware
├── frontend/         # React app with Tailwind UI
│   ├── src/pages     # Feature pages (home, catalog, dashboards)
│   ├── src/components# Reusable UI components
│   ├── src/hooks     # Custom hooks (theme, search)
│   └── src/api       # API clients (REST)
└── README.md         # You are here
```

## Next Steps

- Add CI scripts (lint, test, build)
- Connect real notification service (email/WebPush)
- Layer in GraphQL gateway if federation is required later
- Harden production security (rate limits, helmet, CSRF tokens)

Happy building! 📚⚡️
