const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.unstable_enablePackageExports = true;
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
];

// Force single instance of react-native-css-interop across the monorepo.
// pnpm installs it both as a direct dep (apps/mobile) and transiently (via nativewind),
// which creates two instances and breaks CSS Interop's singleton state.
config.resolver.extraNodeModules = {
    "react-native-css-interop": path.dirname(
        require.resolve("react-native-css-interop/package.json", { paths: [projectRoot] }),
    ),
};

module.exports = withNativeWind(config, { input: "./src/app/globals.css" });
