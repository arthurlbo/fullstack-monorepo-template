# Mobile App

Expo (React Native) app powered by NativeWind for styling.

## Stack

- **Expo** with Expo Router (file-based navigation)
- **React Native** + TypeScript
- **NativeWind** — Tailwind CSS for React Native (v3.x)

## Tailwind Version

This app uses **Tailwind CSS v3** via NativeWind, while `apps/web` uses **Tailwind CSS v4**.

This is intentional: NativeWind does not yet support Tailwind v4. The split is expected and both apps share the same design token values — the mobile palette is defined in `packages/design-system/shared/theme.ts` and consumed by `tailwind.config.js` here, while the web mirrors those values as CSS variables in `packages/design-system/web/globals.css`.

When NativeWind adds v4 support, both apps can be aligned on the same major version.

## Getting Started

```bash
# Install dependencies from the root
pnpm install

# Start the Expo dev server
pnpm --filter mobile start

# Run on Android emulator
pnpm --filter mobile android

# Run on iOS simulator
pnpm --filter mobile ios
```

## Commands

```bash
pnpm --filter mobile typecheck       # Type-check
pnpm --filter mobile lint:fix        # Lint and fix
pnpm --filter mobile test:unit       # Unit tests
pnpm --filter mobile test:unit:coverage  # Coverage report
pnpm --filter mobile test:all        # All tests
```

## Styling

All styling is done via NativeWind class names — never raw `StyleSheet` objects for colors or spacing. Use design tokens from `@repo/design-system-mobile`:

```tsx
import { theme } from "@repo/design-system-mobile/theme";
import { cn } from "@repo/design-system-mobile/utils";

// Class names use the shared token names
<View className="bg-primary-500 px-4 py-3" />;
```

## Icons

Icons come from `@tabler/icons-react-native`. Pass `size` and `color` as props — NativeWind classes do not apply to SVG-based icon components.

```tsx
import { IconHome } from "@tabler/icons-react-native";

import { theme } from "@repo/design-system-mobile/theme";

<IconHome size={24} color={theme.colors.primary[500]} />;
```
