import { iterateNotes, withCmd } from "@kjfsm/musescore-plugin-sdk-helpers";
import type { Note, Score } from "@kjfsm/musescore-plugin-sdk-types";

// `color` is exposed on engraving items at runtime by MuseScore's Plugin API
// but isn't part of the generated TS surface. Narrow it locally instead of
// casting at every assignment site.
type Colorable = { color: string };

const RED = "#ff0000";

export function paintNotes(score: Score, color: string): number {
  let count = 0;
  for (const note of iterateNotes(score)) {
    (note as Note & Colorable).color = color;
    count++;
  }
  return count;
}

export function run(score: Score | null): void {
  if (!score) {
    console.log("no score is open");
    return;
  }
  const count = withCmd(score, "Color selected notes red", () => paintNotes(score, RED));
  console.log(`colored ${count} note(s) red`);
}
