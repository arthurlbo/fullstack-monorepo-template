# API

This is our NestJS API template in the monorepo.

## What is inside?

- NestJS 11 + TypeScript
- TypeORM + PostgreSQL
- Helmet (security headers) + Compression
- Swagger (API documentation)
- Jest (unit tests)
- Supertest (end-to-end tests)
- Dockerfile for containerized deployments

## Getting Started

Install dependencies at the monorepo root and run the dev server:

```bash
pnpm install
pnpm --filter api dev
```

The server runs by default on the port defined by `API_PORT` in your `.env.*` file (typically `3001`).

## Endpoints

| Path | Description |
|---|---|
| `GET /health` | Health check (excluded from global prefix) |
| `GET /api/docs` | Swagger documentation UI |
| `* /api/v1/*` | All API routes (global prefix + URI versioning) |

## Available Commands

```bash
pnpm --filter api dev                  # Start in watch mode
pnpm --filter api dev:debug            # Start in debug + watch mode
pnpm --filter api build               # Build for production
pnpm --filter api start               # Start built app
pnpm --filter api typecheck           # Type-check TypeScript files
pnpm --filter api lint                # Check lint and formatting
pnpm --filter api lint:fix            # Fix lint and formatting
pnpm --filter api test:unit           # Run unit tests
pnpm --filter api test:unit:coverage  # Run unit tests with coverage
pnpm --filter api test:e2e            # Run end-to-end tests
pnpm --filter api test:all            # Run all tests
```

## Structure

```text
apps/api/
├─ src/
│  ├─ main.ts             # Bootstrap (Swagger, CORS, shutdown hooks)
│  ├─ app.module.ts       # Root module
│  ├─ app.controller.ts   # Example controller
│  ├─ app.service.ts      # Example service
│  ├─ app.setup.ts        # App configuration (shared between main and e2e)
│  ├─ health/             # Health check module (@nestjs/terminus)
│  ├─ core/               # Application, domain, infrastructure layers
│  ├─ presentation/       # Controllers, presenters
│  └─ shared/             # Shared utilities within the API
├─ test/
│  └─ e2e/                # E2E tests (Supertest)
├─ jest.config.ts
├─ jest.setup.ts
├─ jest-e2e.config.js
└─ Dockerfile
```
