import type { InlineConfig } from "vitest/node";

export const baseConfig: InlineConfig = {
    globals: true,
    coverage: {
        provider: "v8",
        reportsDirectory: "coverage",
    },
    setupFiles: ["./vitest.setup.ts"],
};
