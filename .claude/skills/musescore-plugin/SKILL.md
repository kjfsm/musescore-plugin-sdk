---
name: musescore-plugin
description: TypeScript で MuseScore 4 プラグインを新規作成・改修するためのガイド。`examples/hello-world` のレイアウトを踏襲した新しいプラグインのスキャフォールディング、QML と TypeScript の橋渡し（esbuild の IIFE + 再エクスポートフッタ）、`@kjfsm/musescore-plugin-sdk-types` の使い方、ビルド・インストール手順を扱う。`MuseScore { }` ブロック、`onRun`、`curScore`、`PluginManifest`、`plugin.qml`、`logic.ts`、`build.ts` といった語が出てきたら起動する。
---

# MuseScore プラグイン作成スキル

このリポジトリ（`@kjfsm/musescore-plugin-sdk`）で TypeScript ベースの MuseScore 4 プラグインを作成・改修するときに参照する。

## 前提となる仕組み

MuseScore 4 のプラグインは `.qml` ファイル（QML + 埋め込み JavaScript）。本 SDK では:

- ロジックは TypeScript で書き、esbuild で **IIFE** にバンドルして `dist/logic.js` に出力する。
- `globalName: "__musescorePlugin"` にエクスポートをまとめたうえで、フッタで各エクスポートをトップレベル変数に再バインドする。これが QML 側の `import "logic.js" as Logic` から `Logic.run` のように見えるための **唯一のブリッジ**。
- `plugin.qml` は手書きで、`MuseScore { ... }` ブロックを宣言する。これが MuseScore に対する真のエントリポイント。
- 型は `@kjfsm/musescore-plugin-sdk-types` から取得する。`Score` などの API 型に加え、`curScore` / `Qt.quit()` のグローバルが `@kjfsm/musescore-plugin-sdk-types/globals` で宣言されている。

## 新しいプラグインを作るときの手順

1. `examples/hello-world/` を `examples/<plugin-name>/` にコピーする（このリポジトリ外で配布パッケージとして作る場合も、レイアウトはそのまま流用する）。
2. `package.json` の `name` を `@kjfsm/musescore-plugin-sdk-<plugin-name>` などに変える。サンプル類は `"private": true` のままでよい。
3. `plugin.qml` の `menuPath`、`title`、`version`、`description`、`pluginType`、`requiresScore` を編集する。
4. `musescore.config.ts` の `PluginManifest` を **`plugin.qml` と一致するように手で同期** する（実行時は QML 側が正となるが、ツーリングが参照するのは TS 側）。
5. `src/logic.ts` にロジックを書く。`import type { Score } from "@kjfsm/musescore-plugin-sdk-types"` のように **`import type`** を使う（実行時には型は存在しない）。
6. **QML から呼ぶ全エクスポートを `build.ts` の `exportNames` 配列に追加する**。これを忘れると QML 側から関数が見えない。
7. `pnpm install`（必要なら）→ `pnpm --filter <pkg> build`。
8. インストール: `dist/` を `~/Documents/MuseScore4/Plugins/<plugin-name>/` にコピー → MuseScore 4 のプラグインマネージャで有効化。

## 各ファイルのテンプレート

### `plugin.qml`

```qml
import QtQuick 2.15
import MuseScore 3.0

import "logic.js" as Logic

MuseScore {
  menuPath: "Plugins.<Plugin Name>"
  title: "<Plugin Name>"
  version: "0.1.0"
  description: "<説明>"
  pluginType: "dock"      // "dock" または "dialog"
  requiresScore: false    // 開いている譜面が必要なら true

  onRun: {
    Logic.run(curScore)
  }
}
```

### `musescore.config.ts`

```ts
import type { PluginManifest } from "@kjfsm/musescore-plugin-sdk-types";

const manifest: PluginManifest = {
  menuPath: "Plugins.<Plugin Name>",
  title: "<Plugin Name>",
  version: "0.1.0",
  description: "<説明>",
  pluginType: "dock",
  requiresScore: false,
};

export default manifest;
```

### `src/logic.ts`

```ts
import type { Score } from "@kjfsm/musescore-plugin-sdk-types";

export function run(score: Score | null): void {
  if (!score) {
    console.log("no score is open");
    return;
  }
  // ロジックをここに書く
  console.log(`score has ${score.nstaves} staves`);
}
```

### `build.ts`

```ts
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "dist");

await mkdir(distDir, { recursive: true });

// QML から呼び出したいエクスポート名をすべて列挙する。
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
```

### `package.json`（サンプル/内部用）

```json
{
  "name": "@kjfsm/musescore-plugin-sdk-<plugin-name>",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsx build.ts",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run",
    "clean": "rm -rf dist .turbo *.tsbuildinfo"
  },
  "dependencies": {
    "@kjfsm/musescore-plugin-sdk-types": "workspace:*"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "esbuild": "^0.24.0",
    "tsx": "^4.19.2",
    "typescript": "^5.7.0",
    "vitest": "^2.1.6"
  }
}
```

### `tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": ".",
    "noEmit": true,
    "lib": ["ES2017"],
    "types": []
  },
  "include": ["src/**/*.ts", "build.ts", "musescore.config.ts"]
}
```

## QML ↔ TypeScript の橋渡しで詰まりやすいところ

- **エクスポートが見えない**: `build.ts` の `exportNames` に追加し忘れていないか確認する。esbuild の IIFE 形式だけではトップレベルにバインドされず、`Logic.fooBar` が `undefined` になる。
- **トップレベル `await` / Node API / DOM API**: 使えない。`platform: "neutral"`、`target: "es2017"` の制約に従う。Promise 自体は使える。
- **`curScore` の null チェック**: 何も開いていない状態でメニューから起動されると `null`。常に early return すること（`requiresScore: true` を付けても、防御的に書くのが安全）。
- **`plugin.qml` と `musescore.config.ts` の不一致**: 実行時に効くのは QML 側のみ。`musescore.config.ts` はツーリング用。両者を必ず同期させる。
- **`.qml` のフォーマット**: Biome の対象外（`biome.json` で除外済み）。空白に頼らない。

## 型の探し方

`@kjfsm/musescore-plugin-sdk-types` から MuseScore 4 のプラグイン API 型がそのままインポートできる:

```ts
import type { Score, Cursor, Note, Element } from "@kjfsm/musescore-plugin-sdk-types";
```

実体は `packages/types/src/generated/plugin-api.ts` と `packages/types/src/generated/enums.ts` で、MuseScore 本体の C++ ヘッダから自動生成されている。**手で編集してはいけない**（CI のドリフトチェックで落ちる）。

新しい API クラス・enum が必要なときは:

1. `packages/types-generator/config.json` を確認し、対象ヘッダが含まれているか見る。
2. 含まれていなければ `headers` に追加して `pnpm generate:types` を実行。
3. `config.json` と `packages/types/src/generated/` の差分を一緒にコミット。

MuseScore 本体のバージョンを上げるときは `config.json` の `ref`（例: `v4.6.0`）を変えて再生成する。

enum は `as const` オブジェクト + ユニオン型として出力されており、apiv1 の API では実体は数値:

```ts
import { ElementType } from "@kjfsm/musescore-plugin-sdk-types";
// ElementType.NOTE === 20 のような数値が入る
```

## テスト

`vitest` で純粋関数として `src/logic.ts` をテストする。MuseScore のグローバル（`curScore` 等）はテストでは存在しないので、関数は `Score | null` を **引数で受け取る形** に保つこと（`hello-world` の `run(score)` がその例）。

```ts
import { describe, expect, it, vi } from "vitest";
import { run } from "./logic.js";  // ESM では .ts ソースでも .js で import

describe("plugin", () => {
  it("handles null score", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    run(null);
    expect(log).toHaveBeenCalledWith("no score is open");
    log.mockRestore();
  });
});
```

## ビルド & インストール

```sh
# モノレポ内のサンプルをビルド
pnpm --filter @kjfsm/musescore-plugin-sdk-<plugin-name> build

# 出力をプラグインディレクトリへコピー
cp -r examples/<plugin-name>/dist ~/Documents/MuseScore4/Plugins/<plugin-name>

# MuseScore 4 を起動 → 編集 → プラグイン → プラグインマネージャ → 有効化
```

リロード時は MuseScore 4 を再起動するのが確実。

## 規約のまとめ（このリポジトリ固有）

- TypeScript は strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`。配列インデックスアクセスは `T | undefined` を返す。
- ESM のみ（`"type": "module"`、`module: "ESNext"`、`moduleResolution: "Bundler"`）。`.ts` からの相対 import でも拡張子は `.js`。
- Biome（インデント 2 スペース、ダブルクォート、セミコロン、末尾カンマ、行幅 100）。`**/*.qml` と `packages/types/src/generated/**` は対象外。
- Turbo: `build`、`typecheck`、`test` はいずれも `dependsOn: ["^build"]`。`packages/types` を変更すると依存先は事前リビルドされる。
