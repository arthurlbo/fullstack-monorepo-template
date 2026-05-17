# Full-stack Monorepo Template

> A modern, production-ready monorepo template to kickstart your Full-stack development with Next.js, NestJS, and shared configuration packages.

## Overview

This is a comprehensive monorepo template built with **pnpm workspaces** and **Turbo** for efficient builds and task orchestration. It provides a solid foundation for building scalable Full-stack applications with shared configuration, design systems, validation schemas, and utilities.

## What's inside?

### Apps

- **`web`**: Next.js 16 + React 19 app with TypeScript, Tailwind CSS v4, Vitest, and Playwright
- **`api`**: NestJS 11 API with TypeScript, TypeORM, Zod, Helmet, Compression, Vitest, and Supertest

### Packages

- **`@repo/design-system`**: Shared UI primitives (Tailwind CSS + shadcn/ui)
- **`@repo/env`**: Centralized environment variable validation with Zod
- **`@repo/contracts`**: Shared Zod schemas and inferred TypeScript types (validation contracts between web and API)
- **`@repo/eslint`**: Shared ESLint configurations (base, Next.js, NestJS, React)
- **`@repo/vitest`**: Shared Vitest configurations for testing
- **`@repo/playwright`**: Shared Playwright configuration for E2E tests
- **`@repo/typescript`**: Shared TypeScript configurations
- **`@repo/tsup`**: Shared tsup configuration for bundling packages

## Tech Stack

- **Monorepo**: pnpm workspaces + Turbo
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: NestJS 11, TypeScript
- **Database**: TypeORM + PostgreSQL
- **Validation**: Zod (shared schemas via `@repo/contracts`)
- **Testing**: Vitest, Playwright, Supertest
- **Linting/Formatting**: ESLint 9, Prettier
- **Git hooks**: Husky + Commitlint
- **Containerization**: Docker + Docker Compose

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm >= 10.26.2
- Docker (optional, for containerized development)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev                    # All apps
pnpm --filter web dev       # Web only
pnpm --filter api dev       # API only
```

Open <http://localhost:3000> for the web app and <http://localhost:3001> for the API.

## Project Structure

```text
fullstack-monorepo-template/
├── apps/
│   ├── web/                # Next.js 16 + React 19
│   └── api/                # NestJS 11
├── packages/
│   ├── contracts/          # Shared Zod schemas and TypeScript types
│   ├── design-system/      # UI primitives
│   ├── env/                # Environment validation
│   └── config/             # Shared configurations
│       ├── eslint/
│       ├── vitest/
│       ├── playwright/
│       ├── typescript/
│       └── tsup/
├── docker-compose.*.yaml
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Available Commands

### General

```bash
pnpm dev                # Run all apps in dev mode
pnpm build              # Build all apps and packages
pnpm lint               # Lint all apps and packages
pnpm lint:fix           # Fix lint across all apps and packages
pnpm format             # Fix lint and formatting across all apps and packages
pnpm typecheck          # Type-check all TypeScript files
```

### Start (built apps)

```bash
pnpm start:dev          # Start all built apps (development env)
pnpm start:staging      # Start all built apps (staging env)
pnpm start:production   # Start all built apps (production env)
```

### Testing

```bash
pnpm test:unit          # Unit tests across all apps
pnpm test:e2e           # End-to-end tests across all apps
pnpm test:all           # All tests across all apps
```

### Database

```bash
pnpm migrate:generate:dev       # Generate a new migration file (development)
pnpm migrate:up:dev             # Run pending migrations (development)
pnpm migrate:up:staging         # Run pending migrations (staging)
pnpm migrate:up:production      # Run pending migrations (production)
pnpm migrate:down:dev           # Revert last migration (development)
pnpm migrate:down:staging       # Revert last migration (staging)
pnpm clear:db:dev               # Drop all tables (development)
```

### Docker

```bash
pnpm docker:dev         # Start development environment
pnpm docker:test        # Start test environment
pnpm docker:staging     # Start staging environment
pnpm docker:production  # Start production environment
```

### Git

```bash
pnpm commit             # Interactive commit with Commitizen
```

## Environment Variables

Environment files are managed at the monorepo root and validated via `@repo/env`:

- `.env.development` — Development environment
- `.env.staging` — Staging environment
- `.env.production` — Production environment
- `.env.test` — Test environment

## Contributing

1. Create a new branch from `main`
2. Make your changes
3. Run `pnpm lint:fix` and `pnpm typecheck`
4. Run `pnpm test:all` to verify nothing is broken
5. Commit using `pnpm commit` (follows Conventional Commits)
6. Create a Pull Request
