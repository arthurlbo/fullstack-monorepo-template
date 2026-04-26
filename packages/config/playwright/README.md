# `@repo/playwright`

Shared Playwright configuration package for the monorepo.

## Overview

This package provides a centralized Playwright base configuration for end-to-end testing, ensuring consistent settings across all apps in the workspace.

## Usage

In your `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";
import baseConfig from "@repo/playwright";

export default defineConfig({
    ...baseConfig,
    testDir: "./tests/e2e",
    use: {
        ...baseConfig.use,
        baseURL: "http://localhost:3000",
    },
});
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "devDependencies": {
        "@repo/playwright": "workspace:*"
    }
}
```

## Build

```bash
pnpm --filter @repo/playwright build
```
