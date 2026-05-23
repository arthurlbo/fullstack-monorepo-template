import { expoConfig } from "@repo/eslint/expo";

/** @type {import("eslint").Linter.Config[]} */
export default [
    ...expoConfig,
    {
        ignores: ["babel.config.js", "metro.config.js", "tailwind.config.js", "expo-env.d.ts", "nativewind-env.d.ts"],
    },
];
