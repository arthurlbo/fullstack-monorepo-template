# Web

This is ou Next.js app template in the monorepo.

## What is inside?

- Next.js 16
- React 19 + TypeScript
- Tailwind CSS v4
- Jest + Testing Library (unit tests)
- Playwright (end-to-end tests)
- Dockerfile for containerized deployments

## Getting Started

Install dependencies at the monorepo root and run the dev server:

```bash
pnpm install
pnpm --filter web dev
```

Open <http://localhost:3000> in your browser.

## Structure

```text
apps/web/
├─ public/
├─ src/
│  ├─ app/                 # App Router (layout, pages, providers)
│  ├─ assets/              # Static assets
│  ├─ core/                # Core layers (application/domain/infrastructure)
│  ├─ features/            # Feature modules (by domain)
│  └─ shared/              # Shared utilities/components within the app
├─ tests/
│  ├─ e2e/                 # Playwright tests
│  ├─ mocks/
├─ eslint.config.mjs
├─ jest.config.ts
├─ jest.setup.ts
├─ playwright.config.ts
└─ next.config.ts
└─ Dockerfile
```
