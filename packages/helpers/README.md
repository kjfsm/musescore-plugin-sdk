# @kjfsm/musescore-plugin-sdk-helpers

MuseScore 4 プラグインで頻出する操作をまとめたランタイムヘルパ集。`@kjfsm/musescore-plugin-sdk-types` の型定義を前提に、Score 走査・選択範囲の取得・要素ジャンプ・`startCmd`/`endCmd` ラッパなどを提供する。

## 使い方

```ts
import type { Score } from "@kjfsm/musescore-plugin-sdk-types";
import {
  iterateNotes,
  getSelectionRange,
  withCmd,
  jumpToMeasure,
} from "@kjfsm/musescore-plugin-sdk-helpers";

export function run(score: Score | null): void {
  if (!score) return;

  const range = getSelectionRange(score);
  console.log(range ? `selection: ${range.startTick}-${range.endTick}` : "no range");

  withCmd(score, "color first note red", () => {
    for (const note of iterateNotes(score)) {
      // 例: 最初の音符だけ着色
      // note.color = "#ff0000";
      break;
    }
  });

  jumpToMeasure(score, 0);
}
```

## 提供する関数

| モジュール | 関数 |
| --- | --- |
| traversal | `iterateNotes`, `iterateChords`, `iterateMeasures`, `iterateSegments`, `iterateAnnotations` |
| predicates | `isChord`, `isNote`, `isRest` |
| selection | `hasRangeSelection`, `getSelectedElements`, `getSelectionRange` |
| metaTag | `getMetaTag` |
| cmd | `withCmd` |
| navigation | `findMeasureByIndex`, `findSegmentByTick`, `jumpToElement`, `jumpToMeasure` |
