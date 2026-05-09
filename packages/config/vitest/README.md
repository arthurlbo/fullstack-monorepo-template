# `@repo/vitest`

Shared Vitest configuration package for the monorepo.

## Overview

This package provides centralized Vitest presets for unit and e2e testing across all apps, ensuring consistent settings throughout the workspace.

## Available Presets

| Preset | Import path | Use for |
|---|---|---|
| `base` | `@repo/vitest/base` | Generic TypeScript projects |
| `next` | `@repo/vitest/next` | Next.js apps (jsdom environment, React, Testing Library) |
| `nest` | `@repo/vitest/nest` | NestJS unit tests (node environment, SWC, decorator metadata) |
| `nest-e2e` | `@repo/vitest/nest-e2e` | NestJS e2e tests with Supertest |

## What each preset includes

### `nest` and `nest-e2e`

- **SWC transformer** via `unplugin-swc` — handles `emitDecoratorMetadata` for NestJS decorators
- **`vite-tsconfig-paths`** — resolves TypeScript path aliases from `tsconfig.json`
- **`globals: true`** — `describe`, `it`, `expect`, `vi` available globally
- **`environment: "node"`** — Node.js test environment

### `next`

- **`@vitejs/plugin-react`** — JSX transform for React 19
- **`vite-tsconfig-paths`** — resolves TypeScript path aliases from `tsconfig.json`
- **`globals: true`** — `describe`, `it`, `expect`, `vi` available globally
- **`environment: "jsdom"`** — browser-like environment via jsdom

## Usage

### NestJS unit tests

In your `vitest.config.ts`:

```ts
import { nestConfig } from "@repo/vitest/nest";

export default nestConfig;
```

### NestJS e2e tests

In your `vitest-e2e.config.ts`:

```ts
import { nestE2eConfig } from "@repo/vitest/nest-e2e";

export default nestE2eConfig;
```

### Next.js apps

In your `vitest.config.ts`:

```ts
import { nextConfig } from "@repo/vitest/next";

export default nextConfig;
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "devDependencies": {
        "@repo/vitest": "workspace:*",
        "vitest": "^3.0.0",
        "@vitest/coverage-v8": "^3.0.0"
    }
}
```

For **NestJS apps**, also add the SWC peer dependency:

```json
{
    "devDependencies": {
        "@swc/core": "^1.0.0"
    }
}
```

For **Next.js apps**, also add the jsdom environment:

```json
{
    "devDependencies": {
        "jsdom": "^26.0.0"
    }
}
```

## Scripts

Each app exposes these test scripts:

```bash
pnpm test:unit            # Run tests once (CI mode)
pnpm test:unit:coverage   # Run tests with v8 coverage report
pnpm test:unit:watch      # Run tests in watch mode (development)
pnpm test:e2e             # Run e2e tests (NestJS apps only)
```

## Setup files

Each app should have a `vitest.setup.ts` at its root. This file runs before each test suite.

### NestJS (`vitest.setup.ts`)

```ts
// Empty by default — add global setup here (e.g. database seeds, mock initializations)
```

### Next.js (`vitest.setup.ts`)

```ts
import "@testing-library/jest-dom/vitest";

Element.prototype.scrollIntoView = vi.fn();
// Additional browser API mocks as needed
```

## tsconfig integration

Add `"vitest/globals"` to `compilerOptions.types` in your app's `tsconfig.json` to get full TypeScript support for global test APIs:

```json
{
    "compilerOptions": {
        "types": ["vitest/globals", "node"]
    }
}
```

For Next.js apps using Testing Library:

```json
{
    "compilerOptions": {
        "types": ["vitest/globals", "@testing-library/jest-dom"]
    }
}
```

## Build

```bash
pnpm --filter @repo/vitest build
```
