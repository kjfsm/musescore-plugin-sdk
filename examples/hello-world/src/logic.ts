import type { Score } from "@musescore-sdk/types";

export function run(score: Score | null): void {
  console.log("hello from typescript");
  if (!score) {
    console.log("no score is open");
    return;
  }
  console.log(`score has ${score.nstaves} staves`);
}
