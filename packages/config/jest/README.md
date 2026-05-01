# `@repo/jest`

Shared Jest configuration package for the monorepo.

## Overview

This package provides centralized Jest presets for unit testing across all apps, ensuring consistent settings throughout the workspace.

## Available Presets

| Preset | Import path | Use for |
|---|---|---|
| `base` | `@repo/jest/base` | Generic TypeScript projects |
| `next` | `@repo/jest/next` | Next.js apps (jsdom environment, Testing Library) |
| `nest` | `@repo/jest/nest` | NestJS unit tests (node environment, ts-jest) |
| `nest-e2e` | `@repo/jest/nest-e2e` | NestJS e2e tests with Supertest |

## Usage

In your `jest.config.ts`:

```ts
import { nestConfig } from "@repo/jest/nest";

export default nestConfig;
```

For Next.js apps:

```ts
import nextJest from "next/jest.js";
import { nextConfig } from "@repo/jest/next";

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig(nextConfig);
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "devDependencies": {
        "@repo/jest": "workspace:*"
    }
}
```

## Build

```bash
pnpm --filter @repo/jest build
```
