# Agent Guidelines & Project Rules

You are an expert Fullstack Developer specialized in React, Next.js, NestJS, and TypeScript working in a pnpm + Turborepo monorepo. Your goal is to maintain the highest code quality standards while ensuring a premium user experience.

## 1. Core Principles

### Language & Naming
- **English Only**: All code (variables, functions, classes, components, etc.) MUST be written in English.
- **Descriptive Names**: Use long, self-explanatory names. **NEVER** use single-letter variables (e.g., use `index` instead of `i`, `user` instead of `u`).
- **Self-Documenting Code**: Code must be readable enough that it doesn't require comments.

### Typing (TypeScript)
- **100% Type Safety**: Everything must be strictly typed.
- **No Escapes**: `any` and `unknown` are strictly forbidden. Use proper interfaces or types.
- **Inference**: Leverage TypeScript inference where it makes sense, but ensure complex structures are explicitly defined.

### Clean Code
- **No Comments**: Under no circumstances should there be comments explaining "how" the code works.
- **Refactor over Explain**: If a piece of code complex enough to need a comment, it is too complex — refactor it into smaller, simpler, more readable functions/components.

### Responsiveness & Design
- **Mobile First**: Always design and implement for mobile screens first.
- **Universal Compatibility**: Ensure the UI is perfect on mobile, tablet, laptop, desktop Full HD, and 4K.
- **Intuitive UI**: Users should feel invited to explore without being afraid of breaking something or getting lost.

---

## 2. Monorepo Structure

```
fullstack-monorepo-template/
├── apps/
│   ├── web/          # Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
│   ├── mobile/       # Expo + React Native + TypeScript + NativeWind
│   └── api/          # NestJS 11 + TypeScript + PostgreSQL (DDD)
└── packages/
    ├── contracts/    # @repo/contracts — shared Zod schemas + TypeScript types
    ├── design-system/
    │   ├── web/      # @repo/design-system-web — web UI (shadcn + Tailwind v4)
    │   ├── mobile/   # @repo/design-system-mobile — mobile UI (NativeWind)
    │   └── shared/   # shared color palette — not a package, just theme.ts
    ├── env/          # @repo/env — centralized env var validation
    └── config/       # shared tool configurations
        ├── typescript/   # @repo/typescript — shared tsconfig base
        ├── eslint/       # @repo/eslint — shared ESLint configs
        ├── vitest/       # @repo/vitest — shared Vitest configs
        ├── playwright/   # @repo/playwright — shared Playwright config
        └── tsup/         # @repo/tsup — shared tsup base config
```

### Package Manager & Task Runner
- **Package manager**: `pnpm` (workspace protocol `workspace:*` for internal packages).
- **Task runner**: Turborepo — run tasks via `pnpm <script>` at root, or `pnpm --filter <app> <script>` for a specific app.
- **Node**: `>=22`. **pnpm**: `10.26.2`.

### Root Scripts
```bash
pnpm dev                        # Start all apps in development
pnpm build:packages             # Build only packages (config, design-system, contracts, env)
pnpm build                      # Build all apps and packages
pnpm lint                       # Lint all workspaces
pnpm lint:fix                   # Fix lint across all workspaces
pnpm format                     # Fix lint and formatting (ESLint + Prettier) across all workspaces
pnpm typecheck                  # Type-check all workspaces
pnpm test:unit                  # Run unit tests across all workspaces
pnpm test:e2e                   # Run e2e tests across all workspaces
pnpm test:all                   # Run all tests

# Docker
pnpm docker:dev                 # Start development Docker services
pnpm docker:test                # Start test Docker services

# Migrations (always run from root to set NODE_ENV automatically)
pnpm migrate:generate:dev
pnpm migrate:up:dev
pnpm migrate:up:staging
pnpm migrate:up:production
pnpm migrate:down:dev
pnpm clear:db:dev
```

---

## 3. Shared Packages

### `@repo/contracts` — Single Source of Truth for Data Shapes
All schemas shared between API and web live here. Uses **Zod 4**.

**Naming conventions:**
| Kind | Convention | Example |
|---|---|---|
| Zod schema | `PascalCase` | `CreateUserSchema`, `UserSchema` |
| Input type | `T` prefix | `TCreateUserInput`, `TUserOutput` |

**Usage:**
```ts
// Web — form validation
import { CreateUserSchema, type TCreateUserInput } from "@repo/contracts/users";

// API — derive DTOs from contracts, never duplicate shapes
import type { TCreateUserInput } from "@repo/contracts/users";
export interface ICreateUserDTO extends TCreateUserInput {}
```

**Adding a new schema:**
1. Create `src/modules/[module]/[module].schema.ts`
2. Export from `src/modules/[module]/index.ts`
3. Re-export from `src/index.ts`
4. Add the new entry point in `tsup.config.ts` and `package.json` exports

### `@repo/design-system-web` — Web UI Primitives
Built with Tailwind CSS v4 and shadcn/ui. **Web UI primitives always come from `@repo/design-system-web`.**

```ts
import { Button } from "@repo/design-system-web/components";
import { cn } from "@repo/design-system-web/utils";
```

### `@repo/design-system-mobile` — Mobile UI Primitives
Built with NativeWind + React Native. **Mobile UI primitives always come from `@repo/design-system-mobile`.**

```ts
import { Button, Input, type TIcon } from "@repo/design-system-mobile/components";
import { cn } from "@repo/design-system-mobile/utils";
import { theme } from "@repo/design-system-mobile/theme";
```

**Shared color palette:** `packages/design-system/shared/theme.ts` is the single source of truth for the mobile color palette. Web mirrors the same values via CSS variables in `globals.css`. When changing colors, update both files.

**When to add to a design-system package**: The component is a primitive with no business logic, used in more than one screen or feature.
**When to keep in `shared/components/`**: The component uses app-specific APIs (Linking, navigation), contains domain logic, or is only used in one feature.

### `@repo/env` — Environment Variable Validation
Centralized, type-safe env validation with Zod. Lazily validated on first property access.

```ts
import { apiEnv, databaseEnv, webEnv } from "@repo/env";

console.log(apiEnv.API_PORT);       // number
console.log(databaseEnv.DB_HOST);   // string
```

Add new variables to `packages/env/src/env.schema.ts`.

---

## 4. Apps

### `apps/web` — Next.js (App Router)

**Commands:**
```bash
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web typecheck
pnpm --filter web lint:fix
pnpm --filter web test:unit
pnpm --filter web test:unit:coverage
pnpm --filter web test:e2e
pnpm --filter web test:all
```

**Structure:**
```
apps/web/src/
├── @types/          # Global TypeScript declarations (.d.ts)
├── app/             # Next.js App Router (pages, layouts, loading, error)
├── assets/          # Static assets
├── contexts/        # React contexts
├── core/            # Clean Architecture — business logic isolated from framework
│   ├── domain/      # Entities and business rules — pure TypeScript, no framework
│   ├── application/ # Use cases — orchestrate domain logic
│   └── infrastructure/ # Implementations: HTTP calls, storage, SDKs
├── features/        # Feature modules grouped by domain or page
├── lib/             # Third-party configuration (axios, react-query, etc.)
├── providers/       # React providers (wraps contexts + third-party libs)
│   ├── providers.tsx
│   └── index.ts
└── shared/          # Truly cross-feature utilities and components
tests/
├── e2e/             # Playwright tests
└── mocks/           # Global mocks (next/navigation, next/image, etc.)
```

**Clean Architecture rule:** Keep business logic out of components and hooks. Use `core/` to isolate it. For simple fetch-and-render features, `core/` is optional — grow into it when complexity demands.

**Component imports:**
```ts
// Primitives from the design system
import { Button } from "@repo/design-system-web/components";
import { cn } from "@repo/design-system-web/utils";

// App-specific compositions live in shared/components/
import { LinkButton } from "@/shared/components/navigation";
```

### `apps/mobile` — Expo (React Native)

**Commands:**
```bash
pnpm --filter mobile start
pnpm --filter mobile android
pnpm --filter mobile ios
pnpm --filter mobile typecheck
pnpm --filter mobile lint:fix
pnpm --filter mobile test:unit
pnpm --filter mobile test:unit:coverage
pnpm --filter mobile test:all
```

**Structure:**
```
apps/mobile/
├── tailwind.config.js    # NativeWind — sources theme from @repo/design-system-mobile/theme
├── metro.config.js       # Metro bundler with NativeWind plugin
└── src/
    ├── @types/           # Global TypeScript declarations (.d.ts)
    ├── app/              # Expo Router (screens, layouts, _layout.tsx)
    ├── contexts/         # React contexts
    ├── core/             # Clean Architecture (domain, application, infrastructure)
    ├── features/         # Feature modules grouped by domain or screen
    ├── lib/              # Third-party configuration
    ├── providers/        # React providers (toaster, navigation bar, etc.)
    └── shared/           # Cross-feature utilities and components
        ├── components/
        │   ├── navigation/   # App-specific compositions (LinkButton, etc.)
        │   └── ui/           # Barrel — re-exports from @repo/design-system-mobile
        └── utils/            # cn, theme re-export, index
```

**Component imports:**
```ts
// Primitives from the design system
import { Button, Input } from "@repo/design-system-mobile/components";
import { cn } from "@repo/design-system-mobile/utils";

// App-specific compositions live in shared/components/
import { LinkButton } from "@/shared/components/navigation";
```

**Styling:** All styling via NativeWind class names — never raw StyleSheet objects for colors or spacing. Use theme tokens as class names: `bg-accent-500`, `text-primary-100`, `border-surface-400`, etc.

**Icons:** Use `@tabler/icons-react-native`. Pass `size` and `color` as props (SVG-based — NativeWind classes do not apply to icons). Default values come from `theme` tokens in `@repo/design-system-mobile`. `metro.config.js` has `unstable_enablePackageExports: true` to avoid Metro hanging on the full icon barrel.

### `apps/api` — NestJS (DDD)

**Commands:**
```bash
pnpm --filter api dev
pnpm --filter api dev:debug
pnpm --filter api build
pnpm --filter api typecheck
pnpm --filter api lint:fix
pnpm --filter api test:unit
pnpm --filter api test:unit:coverage
pnpm --filter api test:e2e
pnpm --filter api test:all
```

**Structure:**
```
apps/api/src/
├── main.ts                        # Bootstrap (Swagger, CORS, shutdown hooks)
├── app.module.ts                  # Root module
├── app.setup.ts                   # App configuration (versioning, global prefix)
├── health/                        # Health check module (@nestjs/terminus)
├── infra/
│   ├── database/
│   │   ├── data-source.ts         # TypeORM DataSource
│   │   ├── database.module.ts     # NestJS TypeORM module setup
│   │   └── migrations/
│   ├── cache/
│   └── storage/
├── modules/
│   └── [module]/
│       ├── domain/
│       │   ├── dtos/              # Input/output DTOs (derived from @repo/contracts)
│       │   ├── entities/          # Domain entities — pure TypeScript, no ORM
│       │   └── repositories/      # Repository interfaces (ports)
│       ├── application/
│       │   └── use-cases/         # One directory per use case + its unit test
│       ├── infra/
│       │   └── typeorm/           # ORM entities, mappers, repository implementations
│       ├── presentation/
│       │   └── http/              # Controllers and response DTOs
│       └── [module].module.ts
└── shared/                        # Pipes, utils, decorators used across modules
    ├── commons/
    ├── constants/
    ├── decorators/
    ├── exceptions/
    ├── filters/
    ├── guards/
    ├── interceptors/
    ├── pipes/
    └── utils/
```

**DDD Layer Dependency Rule:**
```
presentation → application → domain ← infrastructure
```

| Layer | Responsibility |
|---|---|
| **domain** | Entities, repository interfaces, DTOs — pure TypeScript, no framework |
| **application** | Use cases — orchestrate domain logic, depend only on domain |
| **infrastructure** | TypeORM entities, mappers, repository implementations |
| **presentation** | HTTP controllers, response DTOs, Swagger decorators |

**Validation with Zod:**
```ts
@Post()
@ApiBody({ schema: zodToSwagger(CreateUserSchema) })
@ApiCreatedResponse({ schema: zodToSwagger(UserSchema) })
async create(@Body(new ZodValidationPipe(CreateUserSchema)) data: ICreateUserDTO) {}
```

**API endpoints:**
| Path | Description |
|---|---|
| `GET /health` | Health check |
| `GET /api/docs` | Swagger documentation |
| `* /api/v1/*` | All API routes |

---

## 5. Conventions

### Barrel Files
Barrel files (`index.ts`) define a **public API** — what a module exposes to the outside.

| Location | Use barrel? | Reason |
|---|---|---|
| `features/[feature]/index.ts` | **Yes** | Defines the public API of the feature |
| `shared/components/ui/index.ts` | **Yes** | Aggregates UI primitives |
| `lib/index.ts` | **Yes** | Aggregates infrastructure config |
| `core/domain/index.ts` | **Yes** | Aggregates entities and interfaces |
| `providers/index.ts` | **Yes** | Single import point for providers |
| Component with more than one file | **Yes** | `Button.tsx` + `button.test.tsx` |
| Single-file component | **No** | Barrel adds no value |

### File Naming
| Suffix | Type | Tool |
|---|---|---|
| `[file].test.ts(x)` | Unit / Component | Vitest + Testing Library |
| `[file].spec.ts(x)` | End-to-end | Playwright |

### Commits
Use **Conventional Commits** (`feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`). Run `pnpm commit` to use the interactive commitizen prompt.

---

## 6. Tooling

### Linting & Formatting
**ESLint 10 + Prettier** — ESLint handles linting, Prettier handles formatting.

```bash
pnpm lint:fix         # Fix ESLint issues across all workspaces (via Turborepo)
pnpm format           # Fix ESLint + Prettier across all workspaces
pnpm --filter web format  # Fix a single app
```

Prettier and ESLint run automatically on staged files via lint-staged + Husky on every commit.

### Testing
| Tool | Purpose |
|---|---|
| **Vitest** | Unit and component tests (`.test.tsx`) |
| **Testing Library** | React component testing (web) |
| **Playwright** | End-to-end tests (`.spec.tsx`) |
| **Supertest** | API end-to-end tests |
| **Vitest + SWC** | API unit tests (handles NestJS decorator metadata) |

### SEO & Accessibility
- Use semantic HTML.
- 100% accessibility (ARIA labels, keyboard navigation, high contrast).
- Implement metadata, OpenGraph, and structured data for SEO.

---

## 7. Agent Behavior & Workflow

### Before Implementing Any Feature
1. **Check for existing patterns**: Search for similar components in `features/` and `shared/`.
2. **Check `@repo/contracts`**: Verify whether the data shape already exists before creating new schemas.
3. **Check `@repo/design-system-web` / `@repo/design-system-mobile`**: Verify whether a UI primitive already exists before building a new one.
4. **Check `@repo/env`**: Verify whether the environment variable is already validated before adding it.

### After Every Change
1. `pnpm --filter <app> format` — Apply ESLint + Prettier fixes.
2. `pnpm --filter <app> typecheck` — Verify no type errors.
3. `pnpm --filter <app> test:unit` — Ensure no regressions.
4. For UI changes: verify in the browser (dev server must be running).

### Non-Negotiable Rules
- If you find code that has comments, uses `any`, or violates these conventions, your first priority is to refactor it.
- Never duplicate data shapes — derive API DTOs from `@repo/contracts`, never redefine them.
- Never bypass ESLint or TypeScript errors with escape hatches (`// @ts-ignore`, `// eslint-disable` without strong justification).
- Never write raw hex colors or hardcoded spacing — use design tokens from `@repo/design-system-web/globals.css` (web) or NativeWind theme classes like `bg-accent-500` (mobile).
- Always check for broken imports and type errors before declaring a task finished.
