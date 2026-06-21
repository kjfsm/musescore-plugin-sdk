import {
  getMetaTag,
  getSelectionRange,
  iterateMeasures,
  iterateNotes,
} from "@kjfsm/musescore-plugin-sdk-helpers";
import type { ElementEnum, Score } from "@kjfsm/musescore-plugin-sdk-types";

// `Element` は QML の `MuseScore { }` ブロックから引数で渡される（グローバルではない）。
// 値はビルド時に焼き込まず、`Element.NOTE` は実行中の MuseScore の値に解決される。
export function run(score: Score | null, Element: ElementEnum): void {
  console.log("hello from typescript");
  if (!score) {
    console.log("no score is open");
    return;
  }
  const title = getMetaTag(score, "workTitle") ?? "(untitled)";
  console.log(`title: ${title}`);

  const range = getSelectionRange(score);
  console.log(range ? `selection: tick ${range.startTick}-${range.endTick}` : "no range selection");

  let measureCount = 0;
  for (const _ of iterateMeasures(score)) measureCount++;
  let noteCount = 0;
  for (const note of iterateNotes(score)) {
    // 焼き込んだ定数ではなく、渡された実行時 enum で型を判定する。
    if (note.type === Element.NOTE) noteCount++;
  }
  console.log(`measures: ${measureCount}, notes: ${noteCount}`);
}
