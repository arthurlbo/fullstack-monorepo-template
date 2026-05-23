# Full-stack Monorepo Template

> A modern, production-ready monorepo template to kickstart your Full-stack development with Next.js, NestJS, Expo, and shared configuration packages.

## What's inside?

### Apps

- **`web`**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + Vitest + Playwright
- **`mobile`**: Expo + React Native + TypeScript + NativeWind + Vitest
- **`api`**: NestJS 11 + TypeScript + TypeORM + PostgreSQL + Zod + Vitest + Supertest

### Packages

- **`@repo/design-system-web`**: Web UI primitives (Tailwind CSS v4 + shadcn/ui)
- **`@repo/design-system-mobile`**: Mobile UI primitives (NativeWind + React Native)
- **`@repo/contracts`**: Shared Zod schemas and inferred TypeScript types
- **`@repo/env`**: Centralized environment variable validation with Zod
- **`@repo/eslint`**: Shared ESLint configurations (base, Next.js, NestJS, React, Expo)
- **`@repo/vitest`**: Shared Vitest configurations
- **`@repo/playwright`**: Shared Playwright configuration
- **`@repo/typescript`**: Shared TypeScript configurations
- **`@repo/tsup`**: Shared tsup configuration for bundling packages

## Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Web**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Mobile**: Expo, React Native, TypeScript, NativeWind (Tailwind v3)
- **Backend**: NestJS 11, TypeScript, TypeORM, PostgreSQL
- **Validation**: Zod (shared schemas via `@repo/contracts`)
- **Testing**: Vitest, Playwright, Supertest
- **Linting/Formatting**: ESLint 10, Prettier
- **Git hooks**: Husky + Commitlint + lint-staged
- **Containerization**: Docker + Docker Compose
- **Package versioning**: Changesets
- **Dependency updates**: Dependabot (weekly, grouped by ecosystem)

## Getting Started

### Prerequisites

- Node.js >= 22 (use `nvm` or `fnm` — a `.nvmrc` with `24.16.0` is provided)
- pnpm >= 10.26.2
- Docker (optional, for containerized development)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Build packages

Packages ship compiled output (`dist/`). Build them once before starting the dev server:

```bash
pnpm build:packages
```

### 3. Start development

```bash
pnpm dev                        # All apps
pnpm --filter web dev           # Web only
pnpm --filter mobile start      # Mobile only (Expo)
pnpm --filter api dev           # API only
```

- Web: <http://localhost:3000>
- API: <http://localhost:3001>
- API docs: <http://localhost:3001/api/docs>

## Project Structure

```text
fullstack-monorepo-template/
├── apps/
│   ├── web/                # Next.js 16 + React 19
│   ├── mobile/             # Expo + React Native
│   └── api/                # NestJS 11
├── packages/
│   ├── contracts/          # Shared Zod schemas and TypeScript types
│   ├── design-system/
│   │   ├── web/            # @repo/design-system-web (shadcn + Tailwind v4)
│   │   ├── mobile/         # @repo/design-system-mobile (NativeWind)
│   │   └── shared/         # Shared color palette (theme.ts)
│   ├── env/                # Centralized environment variable validation
│   └── config/             # Shared tool configurations
│       ├── eslint/
│       ├── vitest/
│       ├── playwright/
│       ├── typescript/
│       └── tsup/
├── .changeset/             # Pending changeset files
├── .github/
│   ├── workflows/ci.yml    # CI pipeline
│   └── dependabot.yml      # Automated dependency updates
├── .husky/                 # Git hooks (pre-commit, commit-msg)
├── .nvmrc                  # Node.js version pin (24.16.0)
├── docker-compose.*.yaml
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Available Commands

### General

```bash
pnpm build:packages     # Build all packages (config, design-system, contracts, env)
pnpm build              # Build all packages and apps via Turborepo
pnpm dev                # Run all apps in dev mode
pnpm lint               # Lint all workspaces
pnpm lint:fix           # Fix lint across all workspaces
pnpm format             # Fix lint and formatting across all workspaces
pnpm typecheck          # Type-check all workspaces
```

### Start (production build)

```bash
pnpm start:dev          # Start all built apps (development env)
pnpm start:staging      # Start all built apps (staging env)
pnpm start:production   # Start all built apps (production env)
```

### Testing

```bash
pnpm test:unit          # Unit tests across all workspaces
pnpm test:e2e           # End-to-end tests across all workspaces
pnpm test:all           # All tests across all workspaces
```

### Database

```bash
pnpm migrate:generate:dev       # Generate a new migration (development)
pnpm migrate:up:dev             # Run pending migrations (development)
pnpm migrate:up:staging         # Run pending migrations (staging)
pnpm migrate:up:production      # Run pending migrations (production)
pnpm migrate:down:dev           # Revert last migration (development)
pnpm clear:db:dev               # Drop all tables (development)
```

### Docker

```bash
pnpm docker:dev         # Start development services
pnpm docker:test        # Start test services
pnpm docker:staging     # Start staging services
pnpm docker:production  # Start production services
```

### Git

```bash
pnpm commit             # Interactive commit with Commitizen
```

### Changesets

Changesets track breaking changes and new features in packages, then automate `CHANGELOG.md` and version bumps.

```bash
pnpm changeset          # Open the wizard to describe a change (patch/minor/major)
pnpm changeset:version  # Apply pending changesets — bumps versions and updates CHANGELOGs
pnpm changeset:publish  # Build and publish packages to the registry
pnpm changeset:status   # List packages with unpublished changes
```

## Git Hooks

| Hook | Trigger | Action |
|---|---|---|
| `pre-commit` | Every `git commit` | Runs `pnpm format` across the workspace |
| `commit-msg` | Every `git commit` | Validates message against Conventional Commits via commitlint |

## Environment Variables

Environment files live at the monorepo root and are validated via `@repo/env`:

- `.env.development` — Development environment
- `.env.staging` — Staging environment
- `.env.production` — Production environment
- `.env.test` — Test environment

## Contributing

1. Create a new branch from `main`
2. Make your changes
3. If you modified a package under `packages/`, run `pnpm changeset` and describe the impact
4. Run `pnpm lint:fix` and `pnpm typecheck`
5. Run `pnpm test:all` to verify nothing is broken
6. Commit using `pnpm commit` (follows Conventional Commits)
7. Create a Pull Request
