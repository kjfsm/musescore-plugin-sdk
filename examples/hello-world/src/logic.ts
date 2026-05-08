import type { Score } from "@kjfsm/musescore-plugin-sdk-types";

export function run(score: Score | null): void {
  console.log("hello from typescript");
  if (!score) {
    console.log("no score is open");
    return;
  }
  console.log(`score has ${score.nstaves} staves`);
}
