import { baseConfig } from "@repo/tsup";
import { defineConfig } from "tsup";

export default defineConfig({
    ...baseConfig,
    entry: ["src/theme.ts"],
    external: ["react", "react-native"],
});
