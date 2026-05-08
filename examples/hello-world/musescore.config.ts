import type { PluginManifest } from "@kjfsm/musescore-plugin-sdk-types";

const manifest: PluginManifest = {
  menuPath: "Plugins.Hello World",
  title: "Hello World",
  version: "0.1.0",
  description: "Minimal MuseScore 4 plugin written in TypeScript.",
  pluginType: "dock",
  requiresScore: false,
};

export default manifest;
