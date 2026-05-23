import type { Linter } from "eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

import { baseConfig } from "./base";

const toLinterConfig = (config: unknown): Linter.Config => config as Linter.Config;
type ConfigPlugin = NonNullable<Linter.Config["plugins"]>[string];

const reactRecommendedConfig = toLinterConfig(pluginReact.configs.flat.recommended);
const reactHooksPlugin = pluginReactHooks as unknown as ConfigPlugin;

export const expoConfig: Linter.Config[] = [
    ...baseConfig,
    {
        ...reactRecommendedConfig,
    },
    {
        plugins: {
            "react-hooks": reactHooksPlugin,
        },
        settings: { react: { version: "19.0" } },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "coverage/**",
            "android/**",
            "ios/**",
            ".expo/**",
        ],
    },
];
