# @kjfsm/musescore-plugin-sdk-helpers

## 0.1.0

### Minor Changes

- [#14](https://github.com/kjfsm/musescore-plugin-sdk/pull/14) [`362721b`](https://github.com/kjfsm/musescore-plugin-sdk/commit/362721b019c269fbde096dc9be1cbdb3852ded61) Thanks [@kjfsm](https://github.com/kjfsm)! - Add `iterateMeasureSegments`, `iterateStaves`, `trackToStaffIdx`, `staffVoiceToTrack`, `getAnnotationText`, and `getAnnotationStaffIdx` helpers.

  - `iterateMeasureSegments(measure, segmentTypes?)` — iterate segments within a single measure, filling the gap where `iterateSegments(score)` is too coarse
  - `iterateStaves(score)` — yield each `staffIdx` from `0` to `nstaves - 1`
  - `trackToStaffIdx(track)` / `staffVoiceToTrack(staffIdx, voice)` — remove the `staffIdx * 4 + voice` / `Math.floor(track / 4)` magic numbers that appear throughout plugin code
  - `getAnnotationText(ann)` — return annotation text with HTML stripped and whitespace trimmed, falling back from `plainText` to `text`
  - `getAnnotationStaffIdx(ann)` — resolve `track → staffIdx`, returning `-1` for global (score-wide) annotations

## 0.0.2

### Patch Changes

- [#9](https://github.com/kjfsm/musescore-plugin-sdk/pull/9) [`d371c6a`](https://github.com/kjfsm/musescore-plugin-sdk/commit/d371c6a88558f59c50a49d990deadb62bf4eb4ae) Thanks [@kjfsm](https://github.com/kjfsm)! - Add `@kjfsm/musescore-plugin-sdk-helpers`, a runtime helpers package for MuseScore 4 plugins. Provides traversal generators (`iterateNotes`, `iterateChords`, `iterateMeasures`, `iterateSegments`, `iterateAnnotations`), element predicates (`isChord` / `isNote` / `isRest`), selection helpers (`hasRangeSelection`, `getSelectedElements`, `getSelectionRange`), navigation (`findMeasureByIndex`, `findSegmentByTick`, `jumpToElement`, `jumpToMeasure`), an empty-string-safe `getMetaTag`, and a `withCmd` wrapper around `Score.startCmd` / `endCmd`.
