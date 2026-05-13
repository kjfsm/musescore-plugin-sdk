# @musescore-sdk/types

## 0.1.0

### Minor Changes

- [#17](https://github.com/kjfsm/musescore-plugin-sdk/pull/17) [`10a0e78`](https://github.com/kjfsm/musescore-plugin-sdk/commit/10a0e78d2f2654445df9796c956e6c44bef29b4d) Thanks [@kjfsm](https://github.com/kjfsm)! - Expanded generated types to cover ~170 previously missing properties declared via `API_PROPERTY` macros in MuseScore's `elements.h`.

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

## 0.0.2

### Patch Changes

- [#1](https://github.com/kjfsm/musescore-plugin-sdk/pull/1) [`aa9f309`](https://github.com/kjfsm/musescore-plugin-sdk/commit/aa9f309e6c6614e12a63691c7dbc43a15a7bcb19) Thanks [@kjfsm](https://github.com/kjfsm)! - create sdk
