# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

TypeScript SDK for authoring MuseScore 4 plugins. A MuseScore plugin is a `.qml` file (QML + embedded JavaScript); this repo lets you write the JS half in TypeScript with type definitions generated directly from the official MuseScore C++ headers.

## Workspace layout

pnpm monorepo (`pnpm-workspace.yaml` includes `packages/*` and `examples/*`), orchestrated by turbo:

- `packages/types/` — `@kjfsm/musescore-plugin-sdk-types` (published). Hand-written entry points (`src/index.ts`, `src/manifest.ts`, `src/globals.ts`) plus `src/generated/` produced by the generator.
- `packages/types-generator/` — internal, **not published**. Reads `config.json` (pinned MuseScore tag + header list), fetches headers from `raw.githubusercontent.com`, parses with regex, emits TS into `packages/types/src/generated/`.
- `examples/hello-world/` — canonical plugin layout. Bundled with esbuild as IIFE so QML's `import "logic.js" as Logic` can call exported functions like `Logic.run(...)`.

## Common commands

Run from the repo root:

```sh
pnpm install
pnpm build          # turbo run build
pnpm test           # turbo run test (vitest in each package)
pnpm typecheck      # turbo run typecheck (tsc --noEmit)
pnpm lint           # biome check .
pnpm format         # biome format --write .
pnpm publint        # turbo run publint --filter="./packages/*"
pnpm attw           # turbo run attw   --filter="./packages/*"
pnpm generate:types # regenerate types/src/generated/ from upstream MuseScore
```

Single-package operations use `pnpm --filter`:

```sh
pnpm --filter @kjfsm/musescore-plugin-sdk-types build
pnpm --filter @kjfsm/musescore-plugin-sdk-hello-world build
pnpm --filter @kjfsm/musescore-plugin-sdk-types-generator test
```

Run a single test file or single test (vitest) in a workspace package:

```sh
pnpm --filter @kjfsm/musescore-plugin-sdk-types-generator exec vitest run tests/parse.test.ts
pnpm --filter @kjfsm/musescore-plugin-sdk-types-generator exec vitest run -t "extracts classes"
```

## Type generator architecture

The generator turns MuseScore's C++ Plugin API headers into TS interfaces. Pipeline (see `packages/types-generator/src/`):

1. `fetch.ts` — `resolveCommitSha` pins `ref` (e.g. `v4.6.0`) to a 40-char SHA via the GitHub API; `fetchHeaders` downloads each header listed in `config.json`. Both cache under `packages/types-generator/.cache/<ref>/...` so reruns are offline. Set `GITHUB_TOKEN` (or `GH_TOKEN`) to dodge the 60 req/hr unauthenticated GitHub API limit.
2. `parse.ts` — regex-based parser (no tree-sitter dependency despite the package description). Strips comments/strings, then finds `class Foo : public Bar { ... }` blocks and extracts `Q_PROPERTY(...)`, `Q_INVOKABLE` methods, and inline / free-standing enums.
3. `map-types.ts` — maps C++ types to TS: `qreal/int/...` → `number`, `QString` → `string`, `bool` → `boolean`, `QList<T>` / `QVector<T>` → `T[]`, `QMap<K,V>` → `Record<K,V>`, pointers → `T | null`, `QVariant`/`QJSValue` → `unknown`. Strips namespaces like `mu::engraving::apiv1::`.
4. `emit.ts` — produces `plugin-api.ts` and `enums.ts`. Dedupes classes (when the same class appears in multiple headers, properties/methods are merged), threads inheritance via `extends BaseClass`, handles property/method name collisions with `Omit<...>`. Auxiliary unmapped Qt types (e.g. `QPointF`) are aliased inline. Enums emit as `as const` objects + union types (apiv1 surfaces them as ints).
5. `index.ts` `generate(...)` orchestrates and writes `_meta.ts` with `{repository, tag, commitSha}`. **No timestamp is recorded** — output must be a pure function of `(repository, ref, headers)` so the CI drift check is stable.

The CI job `generated-types-drift` runs `pnpm generate:types` and `git diff --exit-code -- packages/types/src/generated`; do not hand-edit files under `packages/types/src/generated/` — bump `config.json` or change generator code, then regenerate and commit the result.

To bump the MuseScore version: edit `packages/types-generator/config.json` (`ref` field), then `pnpm generate:types && pnpm typecheck`, and commit `config.json` + `packages/types/src/generated/` together.

## Plugin example architecture

`examples/hello-world/` is the reference layout consumers should mirror:

- `plugin.qml` is hand-written and is the source of truth MuseScore loads. It declares the `MuseScore { ... }` block (menuPath, title, version, `onRun`) and does `import "logic.js" as Logic`.
- `src/logic.ts` imports types via `import type { Score } from "@kjfsm/musescore-plugin-sdk-types"` and exports plain functions.
- `musescore.config.ts` exports a `PluginManifest` for tooling; **the QML `MuseScore { }` block is what actually drives MuseScore at runtime**, so keep them in sync manually.
- `build.ts` (esbuild) bundles `src/logic.ts` to a single IIFE assigned to `globalName: "__musescorePlugin"`, then appends a footer that re-exports each name at top level (`var run = __musescorePlugin.run;`). This is the bridge that lets QML's `import "logic.js" as Logic` see `Logic.run`. **Every TS export you want to call from QML must be added to the `exportNames` array in `build.ts`** — esbuild's IIFE format alone does not expose them to QML.
- `target: "es2017"`, `platform: "neutral"`. QML's JS engine is roughly that level — avoid features that need Node/browser APIs.
- Globals like `curScore` and `Qt.quit()` are declared in `@kjfsm/musescore-plugin-sdk-types/globals` (see `packages/types/src/globals.ts`).

To install a built plugin: `pnpm --filter ./examples/hello-world build`, copy `dist/` to `~/Documents/MuseScore4/Plugins/<name>/`, enable in MuseScore 4's Plugin Manager.

## Conventions

- TypeScript strict mode plus `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` (`tsconfig.base.json`). Index access returns `T | undefined`; account for it.
- ESM-only output (`"type": "module"`, `module: "ESNext"`, `moduleResolution: "Bundler"`). Imports use `.js` extensions even from `.ts` sources.
- Biome formats with 2-space indent, double quotes, semicolons, trailing commas, 100-col lines. `**/*.qml` and `packages/types/src/generated/**` are excluded from formatting/linting.
- Turbo task graph: `build`, `typecheck`, `test` all `dependsOn: ["^build"]`, so changing `packages/types` forces dependents to rebuild before running.

## Releases

Changesets-driven publish via `.github/workflows/release.yml`:

- Add a changeset with `pnpm changeset` when changing a published package (`packages/types`). The example workspace is `private: true` and is not published.
- On merge to `main`, `changesets/action` opens or updates a "Version Packages" PR, then publishes to npm with provenance (`NPM_CONFIG_PROVENANCE=true`, `permissions.id-token: write`).
- The release workflow uses `RELEASE_PAT` (not the default `GITHUB_TOKEN`) so the PR it opens triggers `release-dry-run.yml`, which runs `pnpm publish --dry-run` on the `changeset-release/*` branch to catch version-collision / npm auth / provenance issues before the real publish.
- Required repo secrets: `RELEASE_PAT` (fine-grained PAT, Contents: RW + Pull requests: RW) and `NPM_TOKEN` (npm Automation token).
