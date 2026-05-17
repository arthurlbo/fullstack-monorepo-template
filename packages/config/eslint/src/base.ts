import eslint from "@eslint/js";
import type { Linter } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

const toLinterConfig = (config: unknown): Linter.Config => config as Linter.Config;
const toLinterConfigArray = (configs: readonly unknown[]): Linter.Config[] =>
    configs.map((config) => toLinterConfig(config));
type ConfigPlugin = NonNullable<Linter.Config["plugins"]>[string];

const prettierLinterPlugin = prettierPlugin as unknown as ConfigPlugin;
const turboLinterPlugin = turboPlugin as unknown as ConfigPlugin;

export const baseConfig: Linter.Config[] = [
    toLinterConfig(eslint.configs.recommended),
    ...toLinterConfigArray(tseslint.configs.recommended),
    toLinterConfig(eslintConfigPrettier),
    {
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "interface",
                    format: ["PascalCase"],
                    custom: {
                        regex: "^I[A-Z]",
                        match: true,
                    },
                },
                {
                    selector: "typeAlias",
                    format: ["PascalCase"],
                    custom: {
                        regex: "^T[A-Z]",
                        match: true,
                    },
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },
    {
        plugins: {
            prettier: prettierLinterPlugin,
        },
        rules: {
            "prettier/prettier": "error",
        },
    },
    {
        plugins: {
            turbo: turboLinterPlugin,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "warn",
        },
    },
    {
        ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**"],
    },
];
