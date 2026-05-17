import type { Linter } from "eslint";
import globals from "globals";

import { baseConfig } from "./base";

const __dirname = decodeURIComponent(new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

export const nestConfig: Linter.Config[] = [
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
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-unsafe-argument": "warn",
        },
        ignores: ["dist/**", "node_modules/**", "jest*", "eslint.config.mjs"],
    },
];
