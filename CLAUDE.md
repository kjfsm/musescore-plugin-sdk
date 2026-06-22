# CLAUDE.md

このファイルは、本リポジトリでコードを扱う際に Claude Code（claude.ai/code）が参照するためのガイドです。

## `.claude/` を編集する際の手順

`.claude/`（スキル、エージェント、設定など）に変更を加えるときは、必ず次の手順を踏むこと:

1. まず `.claude-next/` を作業用ディレクトリとして作成し、変更内容をすべてそちらに書く（既存の `.claude/` がある場合は、必要なファイルを `.claude-next/` にコピーしてから編集する）。
2. 動作確認・レビューが終わったら、最後にまとめて `.claude-next/` の中身を `.claude/` にコピー（または上書き）する。
3. コピー後、`.claude-next/` は削除する。

これは編集途中の不完全な状態が `.claude/` に直接反映されるのを防ぎ、変更をアトミックに適用するためのルール。

## リポジトリの目的

MuseScore 4 プラグインを TypeScript で書くための SDK。MuseScore プラグインは `.qml` ファイル（QML + 埋め込み JavaScript）であり、本リポジトリではその JS 部分を TypeScript で記述できるようにし、公式の MuseScore C++ ヘッダから直接生成された型定義を提供する。

## ワークスペース構成

pnpm モノレポ（`pnpm-workspace.yaml` には `packages/*` と `examples/*` を含む）で、turbo によりオーケストレートされる。

- `packages/types/` — `@kjfsm/musescore-plugin-sdk-types`（公開）。手書きのエントリポイント（`src/index.ts`、`src/manifest.ts`、`src/globals.ts`）と、ジェネレータが生成する `src/generated/` から構成される。
- `packages/helpers/` — `@kjfsm/musescore-plugin-sdk-helpers`（公開）。Score 走査・選択範囲の取得・ナビゲーション・`startCmd`/`endCmd` ラッパなど、プラグイン開発で頻出するランタイムヘルパを提供する。`@kjfsm/musescore-plugin-sdk-types` をピア依存として要求する。
- `packages/types-generator/` — 内部用、**未公開**。`config.json`（固定する MuseScore タグ + ヘッダ一覧）を読み込み、`raw.githubusercontent.com` からヘッダを取得、正規表現でパースして TS を `packages/types/src/generated/` に出力する。
- `examples/hello-world/` — プラグインの正規レイアウト。esbuild で IIFE としてバンドルし、QML の `import "logic.js" as Logic` から `Logic.run(...)` のような形でエクスポート関数を呼び出せるようにしている。

## よく使うコマンド

リポジトリのルートから実行する。

```sh
pnpm install
pnpm build          # turbo run build
pnpm test           # turbo run test（各パッケージで vitest を実行）
pnpm typecheck      # turbo run typecheck（tsc --noEmit）
pnpm lint           # biome check .
pnpm format         # biome format --write .
pnpm publint        # turbo run publint --filter="./packages/*"
pnpm attw           # turbo run attw   --filter="./packages/*"
pnpm generate:types # 上流の MuseScore から types/src/generated/ を再生成
```

単一パッケージに対する操作は `pnpm --filter` を用いる:

```sh
pnpm --filter @kjfsm/musescore-plugin-sdk-types build
pnpm --filter @kjfsm/musescore-plugin-sdk-hello-world build
pnpm --filter @kjfsm/musescore-plugin-sdk-types-generator test
```

ワークスペース内のパッケージで vitest の特定ファイルやテストを単独実行する例:

```sh
pnpm --filter @kjfsm/musescore-plugin-sdk-types-generator exec vitest run tests/parse.test.ts
pnpm --filter @kjfsm/musescore-plugin-sdk-types-generator exec vitest run -t "extracts classes"
```

## 型ジェネレータのアーキテクチャ

ジェネレータは MuseScore の C++ Plugin API ヘッダを TS インターフェイスに変換する。パイプラインは以下の通り（`packages/types-generator/src/` 参照）:

1. `fetch.ts` — `resolveCommitSha` が GitHub API を介して `ref`（例: `v4.6.0`）を 40 文字の SHA に固定する。`fetchHeaders` は `config.json` に列挙された各ヘッダをダウンロードする。両者ともに `packages/types-generator/.cache/<ref>/...` 以下にキャッシュされるため、再実行はオフラインでも可能。GitHub API の未認証時のレート制限（60 リクエスト/時）を回避するため、`GITHUB_TOKEN`（または `GH_TOKEN`）を設定しておくこと。
2. `parse.ts` — 正規表現ベースのパーサ（パッケージ description には tree-sitter とあるが、依存はしていない）。コメントと文字列を取り除いたうえで、`class Foo : public Bar { ... }` ブロックを見つけ、`Q_PROPERTY(...)`、`Q_INVOKABLE` メソッド、インラインおよびトップレベルの enum を抽出する。
3. `map-types.ts` — C++ の型を TS にマッピング: `qreal/int/...` → `number`、`QString` → `string`、`bool` → `boolean`、`QList<T>` / `QVector<T>` → `T[]`、`QMap<K,V>` → `Record<K,V>`、ポインタ → `T | null`、`QVariant`/`QJSValue` → `unknown`。`mu::engraving::apiv1::` のような名前空間は剥がす。
4. `emit.ts` — `plugin-api.ts` と `enums.ts` を生成する。同じクラスが複数のヘッダに登場する場合はクラスを統合（プロパティ・メソッドをマージ）し、`extends BaseClass` で継承を表現、プロパティとメソッドの名前衝突は `Omit<...>` で解消する。マッピング不能な Qt 型（例: `QPointF`）はインラインでエイリアス化する。enum は `as const` オブジェクト + ユニオン型として出力する（apiv1 では int として現れるため）。`qmlpluginapi.h` の `PluginAPI` クラスはホスト型 `MuseScore` にリネームして出力し、`DECLARE_API_ENUM(QmlName, _, ::Enum)` は実行時 enum オブジェクトを表す `readonly QmlName: RuntimeEnum<typeof Enum>` として生成する（生成 enum が無いものはスキップ＋警告）。
5. `index.ts` の `generate(...)` がパイプライン全体を統括し、`{repository, tag, commitSha}` を含む `_meta.ts` を書き出す。**タイムスタンプは記録しない** — 出力は `(repository, ref, headers)` の純粋関数でなければならない。CI のドリフトチェックを安定させるための設計。

CI のジョブ `generated-types-drift` は `pnpm generate:types` を実行し、`git diff --exit-code -- packages/types/src/generated` で差分を検査する。`packages/types/src/generated/` 配下のファイルは手で編集しないこと — `config.json` を更新するか、ジェネレータのコードを変更してから再生成し、その結果をコミットする。

MuseScore のバージョンを上げる手順: `packages/types-generator/config.json` の `ref` を編集し、`pnpm generate:types && pnpm typecheck` を実行、`config.json` と `packages/types/src/generated/` の変更を一緒にコミットする。

## プラグインのサンプル構成

`examples/hello-world/` は、SDK の利用者が踏襲すべきリファレンスレイアウト:

- `plugin.qml` は手書きで、MuseScore が読み込む真の入り口。`MuseScore { ... }` ブロック（menuPath、title、version、`onRun`）を宣言し、`import "logic.js" as Logic` を行う。
- `src/logic.ts` は `import type { Score } from "@kjfsm/musescore-plugin-sdk-types"` で型を取り込み、純粋な関数をエクスポートする。
- `musescore.config.ts` はツーリング向けに `PluginManifest` をエクスポートする。**ただし、実行時に MuseScore を駆動するのは QML 側の `MuseScore { }` ブロック** なので、両者は手作業で同期させる必要がある。
- `build.ts`（esbuild）は `src/logic.ts` を IIFE 形式でひとつのファイルにバンドルし、`globalName: "__musescorePlugin"` に代入する。続けて、各エクスポート名をトップレベルに再公開するフッタ（`var run = __musescorePlugin.run;`）を追加する。これが、QML の `import "logic.js" as Logic` から `Logic.run` を見えるようにするためのブリッジになっている。**QML から呼び出したい TS のエクスポートはすべて、`build.ts` の `exportNames` 配列に追加する必要がある** — esbuild の IIFE 形式だけでは QML から見えない。
- `target: "es2017"`、`platform: "neutral"`。QML の JS エンジンはおおよそこの水準なので、Node やブラウザの API を必要とする機能は避ける。
- `curScore` や `Qt.quit()` のようなグローバルは `@kjfsm/musescore-plugin-sdk-types/globals` で宣言されている（`packages/types/src/globals.ts` を参照）。
- **ホスト（`MuseScore { }` オブジェクト）を丸ごと渡し、`definePlugin` で受ける（推奨パターン）。** QML 側で `id: mscore` を付け、`onRun: { Logic.run(mscore) }` のようにホスト自身を渡す。TS は `export const run = definePlugin({ run(host) { ... } })`（helpers）で受け、`host.curScore` / `host.Element` / `host.cmd(...)` など API 全体に型付きでアクセスする。ホスト型 `MuseScore` は `qmlpluginapi.h` から自動生成される（curScore・全 enum・メソッド・`mscoreMajorVersion` 等）。
- **enum 値は焼き込まず、実行時のホスト enum を使う。** `Element` / `NoteType` / `BarLineType` などは `MuseScore { }` のプロパティ（実行中の版が値を解決する enum）。`enums.ts` の定数を値として import して `el.type === ElementType.NOTE` と書くと、MuseScore のバージョン差で enum が並び替わったとき（例: 4.7.2→4.7.3 で `ElementType` が再採番）に**静かに誤判定**する。代わりに `el.type === host.Element.NOTE` と書く（キーは生成 enum で型チェック、値は実行時に解決）。helpers に個別 enum（`host.NoteType` 等）を渡す関数もある（`RuntimeEnum<T>` / `ElementEnum` / `NoteTypeEnum` で受ける）。要素側に名前がある型（`ElementType`）は helpers の述語（`isNote` 等）のように `el.name` 文字列でも判定できる。
- **バージョン照合**: `definePlugin` は実行時に `generatedFrom`（型の生成元バージョン）と `host.mscoreMajor/MinorVersion` を突き合わせ、不一致なら既定で警告する（`onVersionMismatch: "throw"` で例外化）。`assertHostVersion` / `strictEnum` も helpers から使える。
- `curScore` や `Qt.quit()` のようなグローバルは `@kjfsm/musescore-plugin-sdk-types/globals` で宣言されている（`packages/types/src/globals.ts` を参照）。ホスト経由なら `host.curScore` / `host.quit()` を使える。

ビルド済みプラグインのインストール手順: `pnpm --filter ./examples/hello-world build` を実行 → `dist/` を `~/Documents/MuseScore4/Plugins/<name>/` にコピー → MuseScore 4 のプラグインマネージャで有効化。

## コーディング規約

- TypeScript は strict モードに加え `noUncheckedIndexedAccess` と `exactOptionalPropertyTypes` を有効化（`tsconfig.base.json`）。インデックスアクセスは `T | undefined` を返すので考慮する。
- 出力は ESM のみ（`"type": "module"`、`module: "ESNext"`、`moduleResolution: "Bundler"`）。`.ts` ソースからの import でも拡張子は `.js` を用いる。
- フォーマットは Biome（インデント 2 スペース、ダブルクォート、セミコロン、末尾カンマ、行幅 100）。`**/*.qml` と `packages/types/src/generated/**` はフォーマット・Lint の対象外。
- Turbo のタスクグラフ: `build`、`typecheck`、`test` はいずれも `dependsOn: ["^build"]`。そのため `packages/types` を変更すると、依存先は事前にリビルドされたうえで実行される。

## リリース

`changesets` ベースの publish を `.github/workflows/release.yml` で行う:

- **採番・ブランチ・back-port 運用は `.claude/rules/releasing.md` を参照**（型の major ⇔ MuseScore の minor。`1.x` = 4.7、`0.1.x` = 4.6。旧系列の公開は dist-tag で `latest` を巻き戻さない）。
- 公開対象パッケージ（`packages/types`）に変更を加えたら、`pnpm changeset` で changeset を追加する。サンプルワークスペースは `private: true` のため公開されない。
- `main` にマージされると、`changesets/action` が "Version Packages" PR を作成・更新し、provenance 付き（`NPM_CONFIG_PROVENANCE=true`、`permissions.id-token: write`）で npm に公開する。
- リリースワークフローではデフォルトの `GITHUB_TOKEN` ではなく `RELEASE_PAT` を使用する。これにより、ワークフローが作る PR が `release-dry-run.yml` をトリガーし、`changeset-release/*` ブランチで `pnpm publish --dry-run` を走らせて、本番 publish 前にバージョン衝突・npm 認証・provenance の問題を検出できる。
- 必須のリポジトリシークレット: `RELEASE_PAT`（fine-grained PAT、Contents: RW + Pull requests: RW）と `NPM_TOKEN`（npm Automation トークン）。
