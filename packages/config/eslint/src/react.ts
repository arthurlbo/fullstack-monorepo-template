import type { Linter } from "eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import { baseConfig } from "./base";

const toLinterConfig = (config: unknown): Linter.Config => config as Linter.Config;
type ConfigPlugin = NonNullable<Linter.Config["plugins"]>[string];

const reactRecommendedConfig = toLinterConfig(pluginReact.configs.flat.recommended);
const reactHooksPlugin = pluginReactHooks as unknown as ConfigPlugin;

export const reactConfig: Linter.Config[] = [
    ...baseConfig,
    {
        ...reactRecommendedConfig,
        languageOptions: {
            ...reactRecommendedConfig.languageOptions,
            globals: {
                ...globals.serviceworker,
            },
        },
    },
    {
        plugins: {
            "react-hooks": reactHooksPlugin,
        },
        settings: { react: { version: "detect" } },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
        },
    },
    {
        ignores: ["next-env.d.ts", "node_modules/**", "dist/**", "build/**", "coverage/**"],
    },
];
