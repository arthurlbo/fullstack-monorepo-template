# Web

This is our Next.js app template in the monorepo.

## What is inside?

- Next.js 16 + React 19 + TypeScript
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

## Available Commands

```bash
pnpm --filter web dev                  # Start in development mode (Turbopack)
pnpm --filter web build               # Build for production
pnpm --filter web start               # Start built app
pnpm --filter web typecheck           # Type-check TypeScript files
pnpm --filter web lint                # Check lint and formatting
pnpm --filter web lint:fix            # Fix lint and formatting
pnpm --filter web test:unit           # Run unit tests
pnpm --filter web test:unit:coverage  # Run unit tests with coverage
pnpm --filter web test:e2e            # Run Playwright end-to-end tests
pnpm --filter web test:e2e:ui         # Run Playwright tests with interactive UI
pnpm --filter web test:all            # Run all tests
```

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
│  └─ mocks/
├─ jest.config.ts
├─ jest.setup.ts
├─ playwright.config.ts
├─ next.config.ts
└─ Dockerfile
```
