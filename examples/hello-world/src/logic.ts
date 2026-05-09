import {
  getMetaTag,
  getSelectionRange,
  iterateMeasures,
  iterateNotes,
} from "@kjfsm/musescore-plugin-sdk-helpers";
import type { Score } from "@kjfsm/musescore-plugin-sdk-types";

export function run(score: Score | null): void {
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
  for (const _ of iterateNotes(score)) noteCount++;
  console.log(`measures: ${measureCount}, notes: ${noteCount}`);
}
