import { baseConfig } from "@repo/tsup";
import { type Options, defineConfig } from "tsup";

const config: Options = {
    ...baseConfig,
    bundle: true,
    entry: ["index.ts"],
    external: ["playwright"],
};

export default defineConfig(config);
