import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "dist");

await mkdir(distDir, { recursive: true });

// Bundle the TS entry into a single file. We expose every export through
// a tiny footer that re-binds them at top-level so that QML's `import "x.js" as Logic`
// surfaces them as `Logic.run`, `Logic.<otherExport>` etc.
const exportNames = ["run"];

await build({
  entryPoints: [resolve(here, "src/logic.ts")],
  outfile: resolve(distDir, "logic.js"),
  bundle: true,
  format: "iife",
  globalName: "__musescorePlugin",
  target: "es2017",
  platform: "neutral",
  legalComments: "none",
  footer: {
    js: exportNames.map((n) => `var ${n} = __musescorePlugin.${n};`).join("\n"),
  },
});

await copyFile(resolve(here, "plugin.qml"), resolve(distDir, "plugin.qml"));

console.log("built dist/plugin.qml + dist/logic.js");
