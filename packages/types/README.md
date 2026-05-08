# @kjfsm/musescore-plugin-sdk-types

MuseScore 4 Plugin API の TypeScript 型定義。

`src/generated/` 以下のファイルは `@kjfsm/musescore-plugin-sdk-types-generator` が公式の `musescore/MuseScore` C++ ヘッダから生成したもの。手で編集せず、リポジトリのルートで `pnpm generate:types` を実行すること。

## 使い方

```ts
import type { Score, Cursor, Note } from "@kjfsm/musescore-plugin-sdk-types";
import "@kjfsm/musescore-plugin-sdk-types/globals"; // `curScore` と `Qt` をグローバルに追加

export function run(score: Score | null): void {
  if (!score) return;
  // ...
}
```
