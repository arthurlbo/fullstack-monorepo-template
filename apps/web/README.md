# Web

This is the Next.js app in the monorepo.

## What is inside?

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Vitest + Testing Library (unit tests)
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
pnpm --filter web dev                 # Start in development mode (Turbopack)
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
│  ├─ @types/                         # Global TypeScript declarations (.d.ts)
│  ├─ app/                            # Next.js App Router
│  ├─ assets/                         # Static assets
│  ├─ contexts/                       # Contexts used in the application
│  ├─ core/                           # Clean Arch for core layers
│  │   ├─ domain/
│  │   ├─ application/
│  │   └─ infrastructure/
│  ├─ features/                       # Feature modules (grouped by domain or page)
│  ├─ lib/                            # Third-party configuration (axios, react-query, etc.)
│  ├─ providers/                      # React providers (wraps contexts + third-party libs)
│  │   ├─ providers.tsx
│  │   └─ index.ts
│  └─ shared/                         # Truly cross-feature utilities and components
├─ tests/
│  ├─ e2e/                            # Playwright tests
│  └─ mocks/                          # Global mocks (next/navigation, next/image, etc.)
├─ vitest.config.ts
├─ vitest.setup.ts
├─ playwright.config.ts
├─ next.config.ts
└─ Dockerfile
```

---

## Clean Architecture

Keeps business logic out of components and hooks. Instead of fetching data and applying rules directly inside React, the `core/` directory isolates that logic in plain TypeScript that has no dependency on any framework.

```
core/
├── domain/         # Entities and business rules - pure TypeScript, no framework
├── application/    # Orchestrates domain logic, defines what each operation does
└── infrastructure/ # Implements the operations: HTTP calls, storage, third-party SDKs
```

> For landing pages or features that are just "fetch and render", `core/` adds structure with no payoff. Keep it empty and grow into it when the complexity demands.

---

## Design System Convention

> **UI primitives always come from `@repo/design-system`.**

The design system is the single source of truth for base components (Button, Input, Badge, etc.) shared across all web apps.

```ts
// Correct — primitives from the package
import { Button, Input } from "@repo/design-system/components"

// Correct — compositions specific to the app live in shared/components/
import { LinkButton } from "@/shared/components/navigation"
import { EquipmentCard } from "@/shared/components/operation"
```

**When to add to `@repo/design-system`:** The component is a primitive with no business logic, is used in more than one app.

**When to keep in `shared/components/`:** The component uses app-specific APIs, contains domain logic, or is only used in one app.

---

## Barrel File Convention

Barrel files (`index.ts`) exist to define a **public API** — what a module exposes to the outside.

| Location                                                                                                 | Use barrel? | Reason                                                     |
|----------------------------------------------------------------------------------------------------------|-------------|------------------------------------------------------------|
| `features/[feature]/index.ts`                                                                            | **Yes**     | Defines the public API of the feature                      |
| `shared/components/ui/index.ts`                                                                          | **Yes**     | Aggregates all UI primitives                               |
| `lib/index.ts`                                                                                           | **Yes**     | Aggregates infrastructure config                           |
| `core/domain/index.ts`                                                                                   | **Yes**     | Aggregates entities and interfaces                         |
| `providers/index.ts`                                                                                     | **Yes**     | Single import point for providers                          |
| Individual components with more than one file.                                                           | **Yes**     | E.g. `Button.tsx` + `Button.styles.ts` + `button.test.tsx` |
| If there's only one file, you don't need a barrel or a parent folder, unless it makes sense, off course. | **No**      |                                                            |

---

## File naming

| File | Type | Tool |
|---|---|---|
| `[file].test.ts(x)` | Unit / Component | Vitest + Testing Library |
| `[file].spec.ts(x)` | End-to-end | Playwright |
