---
"@kjfsm/musescore-plugin-sdk-types": minor
---

Expanded generated types to cover ~170 previously missing properties declared via `API_PROPERTY` macros in MuseScore's `elements.h`.

The types-generator now parses `API_PROPERTY_T(type, name, KEY)`, `API_PROPERTY_READ_ONLY_T(type, name, KEY)`, `API_PROPERTY(name, KEY)`, and `API_PROPERTY_READ_ONLY(name, KEY)` in addition to standard `Q_PROPERTY` declarations.

Notable additions:

- `Note`: `pitch`, `tpc1`, `tpc2`, `userVelocity`, `tuning`, `line`, `fret`, `string`
- `Measure`: `timesigNominal`, `timesigActual`, `repeatCount`, `irregular`, `breakMmr`, `userStretch`
- `MeasureBase`: `repeatStart`, `repeatEnd`, `repeatJump`, `noOffset`, `irregular`
- `EngravingItem`: `tempo`, `barlineType`, `barlineSpan`, `dynamicType`, `concertClefType`, `transposingClefType`, `actualKey`, `concertKey`, `velocity`, `direction`, `stemDirection`, `placement`, `text`, `beginText`, `continueText`, `endText`, `lineStyle`, `lineColor`, `lineWidth`, `symbol`, `beamMode`, `dotPosition`, `veloType`, `align`, and 80+ more
- `Staff`: `staffBarlineSpan`, `staffBarlineSpanFrom`, `staffBarlineSpanTo`, `staffInvisible`, `bracketSpan`, `systemBracket`, `bracketColumn`
- `Tuplet`: `numberType`, `bracketType`, `actualNotes`, `normalNotes`
- `ChordRest`: `staffMove`

Properties with complex C++ struct types (e.g. `PairF`, `CurveFit`, `GroupNodes`, `QPainterPath`) remain typed as `unknown`.
