---
"@kjfsm/musescore-plugin-sdk-helpers": minor
---

Add `iterateMeasureSegments`, `iterateStaves`, `trackToStaffIdx`, `staffVoiceToTrack`, `getAnnotationText`, and `getAnnotationStaffIdx` helpers.

- `iterateMeasureSegments(measure, segmentTypes?)` — iterate segments within a single measure, filling the gap where `iterateSegments(score)` is too coarse
- `iterateStaves(score)` — yield each `staffIdx` from `0` to `nstaves - 1`
- `trackToStaffIdx(track)` / `staffVoiceToTrack(staffIdx, voice)` — remove the `staffIdx * 4 + voice` / `Math.floor(track / 4)` magic numbers that appear throughout plugin code
- `getAnnotationText(ann)` — return annotation text with HTML stripped and whitespace trimmed, falling back from `plainText` to `text`
- `getAnnotationStaffIdx(ann)` — resolve `track → staffIdx`, returning `-1` for global (score-wide) annotations
