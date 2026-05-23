import path from "node:path";
import { fileURLToPath } from "node:url";
import { createExpoConfig } from "@repo/vitest/expo";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default createExpoConfig(rootDir);
