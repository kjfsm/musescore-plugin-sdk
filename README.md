# musescore-plugin-sdk

TypeScript SDK for authoring MuseScore 4 plugins.

A MuseScore plugin is a `.qml` file (QML + embedded JavaScript). This SDK lets you write the JavaScript half in TypeScript with full type information generated directly from the official MuseScore C++ headers.

## Packages

| Package | Purpose | Publish |
|---|---|---|
| `@kjfsm/musescore-plugin-sdk-types` | TypeScript type definitions for the MuseScore 4 Plugin API. | ✅ |
| `@kjfsm/musescore-plugin-sdk-types-generator` | Internal: regenerates `@kjfsm/musescore-plugin-sdk-types` from `musescore/MuseScore` C++ headers. | ❌ |

## Repository layout

```
packages/
  types/                 # @kjfsm/musescore-plugin-sdk-types — published type defs
  types-generator/       # internal generator script
examples/
  hello-world/           # TS plugin + hand-written QML, built via esbuild
```

## Workflow

Install:

```sh
pnpm install
```

Regenerate the types from the latest MuseScore source pinned in `packages/types-generator/config.json`:

```sh
pnpm generate:types
```

Build everything (types package, example plugin):

```sh
pnpm build
```

Other tasks:

```sh
pnpm test         # vitest across all packages
pnpm typecheck    # tsc --noEmit across all packages
pnpm lint         # biome check
pnpm format       # biome format --write
```

## Authoring a plugin

See `examples/hello-world/` for the canonical layout:

```
my-plugin/
├── plugin.qml          # hand-written, declares MuseScore { ... onRun: { Logic.run(curScore) } }
├── src/logic.ts        # TypeScript with `import type { Score } from "@kjfsm/musescore-plugin-sdk-types"`
├── musescore.config.ts # PluginManifest (informational; QML is the source of truth)
└── build.ts            # esbuild script: bundles src/logic.ts → dist/logic.js, copies plugin.qml
```

The QML side imports the compiled JS via `import "logic.js" as Logic` and calls `Logic.run(curScore)` from `onRun`.

To install the built plugin into MuseScore 4:

1. `pnpm --filter ./examples/hello-world build`
2. Copy `examples/hello-world/dist/` to `~/Documents/MuseScore4/Plugins/hello-world/`
3. Open MuseScore 4 → Plugin Manager → enable "Hello World"
4. Plugins menu → Hello World

## CI / リリース設定

### 必要なリポジトリシークレット

| シークレット名 | 用途 | 設定方法 |
|---|---|---|
| `RELEASE_PAT` | リリース用 Personal Access Token | 後述 |
| `NPM_TOKEN` | npm へのパッケージ公開 | npm の Access Tokens ページで `Automation` タイプのトークンを生成し設定する |

### `RELEASE_PAT` が必要な理由

GitHub Actions のデフォルトトークン (`GITHUB_TOKEN`) で作成したコミットや PR は、セキュリティ上の制約により **他のワークフローをトリガーしない** 仕様になっています。

リリースフロー (`release.yml`) では [changesets/action](https://github.com/changesets/action) が "Version Packages" PR を自動作成しますが、この PR 上で `release-dry-run.yml` が走るためには PAT 経由のチェックアウトが必要です。

### `RELEASE_PAT` の設定手順

1. GitHub の **Settings → Developer settings → Personal access tokens → Fine-grained tokens** でトークンを生成する
2. 対象リポジトリを選択し、以下の権限を付与する
   - **Contents**: Read and write
   - **Pull requests**: Read and write
3. 生成したトークンを リポジトリの **Settings → Secrets and variables → Actions** に `RELEASE_PAT` という名前で登録する

---

## Updating to a newer MuseScore release

Edit `packages/types-generator/config.json`, bump `ref` to the desired tag (e.g. `v4.7.0`), then:

```sh
pnpm generate:types
pnpm typecheck
```

Commit the regenerated `packages/types/src/generated/` files alongside the config bump.
