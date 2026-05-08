# musescore-plugin-sdk

MuseScore 4 プラグインを TypeScript で書くための SDK です。

MuseScore のプラグインは `.qml` ファイル（QML + 埋め込み JavaScript）で構成されます。本 SDK は、その JavaScript 部分を TypeScript で記述できるようにし、公式の MuseScore C++ ヘッダから直接生成された型情報を提供します。

## パッケージ一覧

| パッケージ | 役割 | 公開 |
|---|---|---|
| `@kjfsm/musescore-plugin-sdk-types` | MuseScore 4 Plugin API の TypeScript 型定義 | ✅ |
| `@kjfsm/musescore-plugin-sdk-types-generator` | 内部用：`musescore/MuseScore` の C++ ヘッダから `@kjfsm/musescore-plugin-sdk-types` を再生成 | ❌ |

## リポジトリ構成

```
packages/
  types/                 # @kjfsm/musescore-plugin-sdk-types — 公開する型定義
  types-generator/       # 内部用ジェネレータスクリプト
examples/
  hello-world/           # TS プラグイン + 手書き QML を esbuild でビルド
```

## ワークフロー

インストール:

```sh
pnpm install
```

`packages/types-generator/config.json` で固定された MuseScore のバージョンに基づき、型定義を再生成:

```sh
pnpm generate:types
```

すべてビルド（types パッケージとサンプルプラグイン）:

```sh
pnpm build
```

その他のタスク:

```sh
pnpm test         # 全パッケージで vitest を実行
pnpm typecheck    # 全パッケージで tsc --noEmit を実行
pnpm lint         # biome check
pnpm format       # biome format --write
```

## プラグインの作成

リファレンスとなる構成は `examples/hello-world/` を参照してください。

```
my-plugin/
├── plugin.qml          # 手書き。MuseScore { ... onRun: { Logic.run(curScore) } } を宣言
├── src/logic.ts        # `import type { Score } from "@kjfsm/musescore-plugin-sdk-types"` を使う TypeScript
├── musescore.config.ts # PluginManifest（参考情報。実体は QML が真）
└── build.ts            # esbuild スクリプト：src/logic.ts → dist/logic.js をバンドルし、plugin.qml をコピー
```

QML 側はビルド済みの JS を `import "logic.js" as Logic` で読み込み、`onRun` から `Logic.run(curScore)` を呼び出します。

ビルド済みプラグインを MuseScore 4 にインストールする手順:

1. `pnpm --filter ./examples/hello-world build`
2. `examples/hello-world/dist/` を `~/Documents/MuseScore4/Plugins/hello-world/` にコピー
3. MuseScore 4 を起動 → プラグインマネージャ → "Hello World" を有効化
4. プラグインメニュー → Hello World を実行

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

## MuseScore の新しいリリースに追従する

`packages/types-generator/config.json` を編集し、`ref` を対象タグ（例: `v4.7.0`）に更新したうえで、以下を実行します。

```sh
pnpm generate:types
pnpm typecheck
```

再生成された `packages/types/src/generated/` の差分を、`config.json` の更新と一緒にコミットしてください。
