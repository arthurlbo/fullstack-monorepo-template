import globals from "globals";

import { baseConfig } from "./base.js";

export const nestConfig = [
    ...baseConfig,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: "commonjs",
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-unsafe-argument": "warn",
        },
        ignores: ["dist/**", "node_modules/**", "eslint.config.mjs"],
    },
];
