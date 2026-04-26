# `@repo/design-system`

Shared UI components and utilities package for the monorepo.

## Overview

Built with Tailwind CSS v4 and based on shadcn/ui, this package provides reusable React components and utilities to ensure design consistency across all apps in the workspace.

## Available Exports

| Export path | Contents |
|---|---|
| `@repo/design-system/components` | Shared React components (Button, etc.) |
| `@repo/design-system/utils` | Utility functions (`cn`, etc.) |
| `@repo/design-system/globals.css` | Global CSS with Tailwind base + design tokens |
| `@repo/design-system/postcss.config` | PostCSS configuration for Tailwind CSS v4 |

## Usage

```ts
import { Button } from "@repo/design-system/components";
import { cn } from "@repo/design-system/utils";
```

In your `globals.css`:

```css
@import "@repo/design-system/globals.css";
```

In your `postcss.config.mjs`:

```js
export { default } from "@repo/design-system/postcss.config";
```

## Installation

This package is already part of the workspace. To use it in your app:

```json
{
    "dependencies": {
        "@repo/design-system": "workspace:*"
    }
}
```

## Build

```bash
pnpm --filter @repo/design-system build
```
