---
description: generated/ 手書き禁止・5 ステップパイプライン・ドリフトチェックの仕組み
paths:
  - "packages/types-generator/**"
  - "packages/types/src/**"
---

# 型ジェネレータの規約

## 絶対ルール

**`packages/types/src/generated/` 配下のファイルは手で編集しない。**

CI の `generated-types-drift` ジョブが `pnpm generate:types` を実行し、`git diff --exit-code -- packages/types/src/generated` で差分を検査する。手書き変更があると CI が落ちる。

修正が必要な場合は:
- 型マッピングの問題 → `packages/types-generator/src/map-types.ts` を修正して再生成
- パースの問題 → `packages/types-generator/src/parse.ts` を修正して再生成
- 手書きで補いたい型 → `packages/types/src/index.ts` / `src/globals.ts` / `src/manifest.ts` に追記

## 5 ステップパイプライン

`packages/types-generator/src/` にある以下のファイルが順に実行される。

1. **`fetch.ts`** — `resolveCommitSha` が GitHub API を介して `ref`（例: `v4.6.0`）を 40 文字の SHA に固定。`fetchHeaders` が `config.json` に列挙された各ヘッダをダウンロード。`.cache/<ref>/` にキャッシュされるため再実行はオフラインでも可能。
2. **`parse.ts`** — 正規表現ベースのパーサ（tree-sitter 依存なし）。`class Foo : public Bar { ... }` ブロックを見つけ、`Q_PROPERTY`・`Q_INVOKABLE` メソッド・enum を抽出。
3. **`map-types.ts`** — C++ 型 → TypeScript マッピング（`qreal/int` → `number`、`QString` → `string`、`QList<T>` → `T[]` 等）。名前空間（`mu::engraving::apiv1::` 等）は剥がす。
4. **`emit.ts`** — `plugin-api.ts` と `enums.ts` を生成。同じクラスが複数ヘッダにある場合はマージし、継承は `extends`、名前衝突は `Omit<...>` で解消。enum は `as const` + ユニオン型。
5. **`index.ts`** — パイプライン統括。`{repository, tag, commitSha}` を含む `_meta.ts` を書き出す（タイムスタンプは記録しない — 出力は純粋関数でなければならない）。

## MuseScore バージョンを上げる手順

1. `packages/types-generator/config.json` の `ref` を新バージョンタグに変更
2. `pnpm generate:types` を実行（`GITHUB_TOKEN` か `GH_TOKEN` を設定しておくと API レート制限を回避できる）
3. `pnpm typecheck` で型エラーがないことを確認
4. `config.json` と `packages/types/src/generated/` の変更を一緒にコミット

詳細手順は `/type-generator-update` skill を参照。

## キャッシュの仕組み

`packages/types-generator/.cache/<ref>/` にヘッダが保存される。同じ `ref` での再実行はオフラインでも可能。`ref` を変えたときのみ fetch が走る。
