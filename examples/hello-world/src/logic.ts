import { getSelectionRange, iterateNotes } from "@kjfsm/musescore-plugin-sdk-helpers";
import type { Score } from "@kjfsm/musescore-plugin-sdk-types";

export function run(score: Score | null): void {
  console.log("hello from typescript");
  if (!score) {
    console.log("no score is open");
    return;
  }
  const range = getSelectionRange(score);
  console.log(range ? `selection: tick ${range.startTick}-${range.endTick}` : "no range selection");
  let count = 0;
  for (const _ of iterateNotes(score)) count++;
  console.log(`note count: ${count}`);
}
