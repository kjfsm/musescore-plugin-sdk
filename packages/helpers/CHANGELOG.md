# @kjfsm/musescore-plugin-sdk-helpers

## 1.0.0

### Major Changes

- [#17](https://github.com/kjfsm/musescore-plugin-sdk/pull/17) [`10a0e78`](https://github.com/kjfsm/musescore-plugin-sdk/commit/10a0e78d2f2654445df9796c956e6c44bef29b4d) Thanks [@kjfsm](https://github.com/kjfsm)! - **Breaking changes**

  - Removed exported types `TempoElement` and `TimeSigElement` (workarounds that are no longer needed now that the generated types cover `EngravingItem.tempo` and `Measure.timesigNominal/timesigActual`)
  - `getTempoBpm` parameter changed from `TempoElement` to `EngravingItem` — callers that stored a `TempoElement`-typed variable should change the annotation to `EngravingItem`
  - `isTempo` return type changed from `el is TempoElement` to `el is EngravingItem` for the same reason
  - `isTimeSig` return type changed from `el is TimeSigElement` to `el is EngravingItem`
  - `getMeasureTimeSig` internal cast removed; function signature and behaviour are unchanged
  - `jumpToElement` parameter type widened from `EngravingItem | null` to `ScoreElement | null` (needed because `Measure.visible` is now a method, making `Measure` structurally incompatible with `EngravingItem`)

  **New exports**

  - `getMeasureEndBarlineType(measure)` — reads `barlineType` from the last BarLine element in a measure
  - `getMeasureRepeatInfo(measure)` — returns `{ repeatStart, repeatEnd, repeatCount }`
  - `getKeySigAt(segment, staffIdx)` — reads `actualKey` from a KeySig element at that segment
  - `getClefTypeAt(segment, staffIdx)` — reads `concertClefType` from a Clef element at that segment
  - `isBarLine(el)`, `isKeySig(el)`, `isClef(el)` — element-name predicates
  - `MeasureRepeatInfo` interface

### Patch Changes

- Updated dependencies [[`10a0e78`](https://github.com/kjfsm/musescore-plugin-sdk/commit/10a0e78d2f2654445df9796c956e6c44bef29b4d)]:
  - @kjfsm/musescore-plugin-sdk-types@0.1.0

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
