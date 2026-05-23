# Design System

Shared UI packages for the monorepo, split by platform. All packages live under `packages/design-system/` and are picked up automatically by the pnpm workspace.

## Structure

```
packages/design-system/
├── web/      # @repo/design-system-web   — web UI (shadcn + Tailwind v4)
├── mobile/   # @repo/design-system-mobile — mobile UI (NativeWind)
└── shared/   # not a package — just theme.ts, the shared color palette
```

---

## `@repo/design-system-web`

Built with **Tailwind CSS v4** and **shadcn/ui**. Consumed only by `apps/web`.

### Exports

| Path | Contents |
|---|---|
| `@repo/design-system-web/components` | React components (Button, etc.) |
| `@repo/design-system-web/utils` | `cn` utility |
| `@repo/design-system-web/globals.css` | Tailwind base + design tokens (CSS variables) |
| `@repo/design-system-web/postcss.config` | PostCSS config for Tailwind v4 |

### `"use client"` pragma

Components that use hooks or event handlers include a `"use client"` pragma at the top of each file. This allows Next.js to tree-shake cleanly — Server Components remain server-side while only interactive components are sent to the client bundle.

When adding a new component to this package, include `"use client"` at the top if it uses any React hooks or browser event handlers. Pure presentational components with no interactivity do not need it.

### Usage

```ts
import { Button } from "@repo/design-system-web/components";
import { cn } from "@repo/design-system-web/utils";
```

```css
/* globals.css */
@import "@repo/design-system-web/globals.css";
```

```js
// postcss.config.mjs
import config from "@repo/design-system-web/postcss.config";
export default config;
```

### Build

```bash
pnpm --filter @repo/design-system-web build
```

---

## `@repo/design-system-mobile`

Built with **NativeWind** + **React Native**. Consumed only by `apps/mobile`.

Components (`/components`, `/utils`) are exported as TypeScript source — Metro bundler handles transpilation. The theme (`/theme`) is pre-built to CJS/ESM so `tailwind.config.js` can `require()` it.

### Exports

| Path | Contents |
|---|---|
| `@repo/design-system-mobile/components` | React Native components (Button, Input) |
| `@repo/design-system-mobile/utils` | `cn` utility for NativeWind |
| `@repo/design-system-mobile/theme` | Tailwind theme object (built CJS + ESM) |

### Usage

```ts
import { Button, Input } from "@repo/design-system-mobile/components";
import { cn } from "@repo/design-system-mobile/utils";
import { theme } from "@repo/design-system-mobile/theme";
```

```js
// tailwind.config.js
const { theme } = require("@repo/design-system-mobile/theme");

module.exports = {
    theme: { extend: { ...theme } },
    presets: [require("nativewind/preset")],
};
```

### Build

Only the theme entry point needs to be built (components are consumed as TypeScript source by Metro):

```bash
pnpm --filter @repo/design-system-mobile build
```

---

## Shared color palette (`shared/theme.ts`)

`packages/design-system/shared/theme.ts` is the **single source of truth** for the mobile color palette. It is not a separate npm package — just a TypeScript file imported by `packages/design-system/mobile/src/theme.ts` and bundled into the mobile theme build.

The web package mirrors the same color values via CSS variables in `globals.css`.

**When changing colors:** update `shared/theme.ts` (mobile) **and** the corresponding CSS variable values in `web/globals.css` (web).

### Color scale

| Token | Usage |
|---|---|
| `background` / `foreground` | Page and text base colors |
| `primary-100` → `primary-700` | Text hierarchy and neutral fills |
| `accent-100` → `accent-700` | Brand color — buttons, links, focus rings |
| `surface-100` → `surface-700` | Card backgrounds, borders, inputs |
