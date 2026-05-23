import fs from "node:fs/promises";

import { baseConfig } from "@repo/tsup";
import { defineConfig } from "tsup";

export default defineConfig({
    ...baseConfig,
    external: ["react"],
    entry: ["src/components/index.ts", "src/shared/utils/index.ts"],
    banner: {
        js: '"use client";',
    },
    onSuccess: async () => {
        await fs.copyFile("globals.css", "dist/globals.css");
        await fs.copyFile("postcss.config.mjs", "dist/postcss.config.mjs");
    },
});
