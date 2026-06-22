# @kjfsm/musescore-plugin-sdk-types

MuseScore 4 Plugin API の TypeScript 型定義。

`src/generated/` 以下のファイルは `@kjfsm/musescore-plugin-sdk-types-generator` が公式の `musescore/MuseScore` C++ ヘッダから生成したもの。手で編集せず、リポジトリのルートで `pnpm generate:types` を実行すること。

## 使い方

```ts
import type { MuseScore, Score, Cursor, Note } from "@kjfsm/musescore-plugin-sdk-types";

// `MuseScore` は QML の `MuseScore { }` オブジェクト（ホスト）の型。
// curScore・全 enum・メソッド・mscoreMajorVersion 等を 1 つにまとめている。
export function run(host: MuseScore): void {
  const score = host.curScore;
  if (!score) return;
  if (/* el */ null === host.Element.NOTE) {
    // host.Element の値は実行時に解決される
  }
}
```

## 実行時 enum とホスト型

apiv1 の `element.type` は実行時に C++ enum の生の整数を返す。`enums.ts` の定数を**値として**焼き込んで比較すると、MuseScore のバージョン差で enum が並び替わったとき（例: 4.7.2→4.7.3 で `ElementType` が再採番）に静かに誤判定する。

そのため、enum 値は焼き込まず**実行時のホスト enum**（`host.Element` など）を使う。型側はキーだけを生成 enum から取り、値は `number` として実行時に解決する:

- `MuseScore` — ホスト型（`qmlpluginapi.h` から自動生成。enum プロパティは `RuntimeEnum<...>` 型）。
- `RuntimeEnum<T>` / `ElementEnum` / `NoteTypeEnum` / `BarLineTypeEnum` — 実行時 enum オブジェクトの型。
- `ElementTypeName` / `NoteTypeName` / `BarLineTypeName` — enum メンバ名のユニオン。
- `generatedFrom` — 型を生成した MuseScore バージョン（`{ repository, tag, commitSha }`）。バージョン照合に使える。

エントリ定義・バージョン照合のヘルパ（`definePlugin` / `assertHostVersion` 等）は `@kjfsm/musescore-plugin-sdk-helpers` にある。

## globals

`@kjfsm/musescore-plugin-sdk-types/globals` は `curScore` と `Qt` をアンビエントグローバルとして宣言する。ただし推奨はホスト経由（`host.curScore` / `host.quit()`）。
