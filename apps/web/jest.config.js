import nextJest from "next/jest.js";

import { nextConfig } from "@repo/jest-config";

const createJestConfig = nextJest({
    dir: "./",
});

export default createJestConfig(nextConfig);
