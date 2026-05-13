---
"@kjfsm/musescore-plugin-sdk-helpers": major
---

**Breaking changes**

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
