# @musescore-sdk/types

TypeScript type definitions for the MuseScore 4 Plugin API.

The `src/generated/` content is produced by `@musescore-sdk/types-generator` from the official `musescore/MuseScore` C++ headers. Do not edit by hand; run `pnpm generate:types` from the repo root instead.

## Usage

```ts
import type { Score, Cursor, Note } from "@musescore-sdk/types";
import "@musescore-sdk/types/globals"; // adds `curScore`, `Qt` to global

export function run(score: Score | null): void {
  if (!score) return;
  // ...
}
```
