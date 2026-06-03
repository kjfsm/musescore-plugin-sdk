# @musescore-sdk/types

## 1.0.0

### Major Changes

- [#30](https://github.com/kjfsm/musescore-plugin-sdk/pull/30) [`6eaa696`](https://github.com/kjfsm/musescore-plugin-sdk/commit/6eaa696a06d26f7084db75bc865d22d9c38f97cf) Thanks [@kjfsm](https://github.com/kjfsm)! - MuseScore v4.7.2 に対応し、型パッケージを **1.0.0** に到達させます。あわせて「MuseScore 連動メジャー採番」を採用します（**major 1 ⇒ MuseScore 4.7**。以降は MuseScore の minor が上がるごとに型パッケージの major を上げる方針）。MuseScore 4.6 系の型は従来どおり `0.1.x` で利用できます。対応する MuseScore バージョンは `_meta.generatedFrom.tag` を参照してください。

  apiv1 のフラクション・ラッパクラスが `FractionWrapper` から `Fraction` に改名されたため、ジェネレータの既知型マッピングを更新しました。`timesigNominal` / `timesigActual` / `timesig` / `timesigStretch` / `lyricTicks` / `spannerTick` / `spannerTicks` の型が `Fraction | null` になります（メンバーは `numerator` / `denominator` / `ticks` / `str` / `real` 等）。`FractionWrapper` 型名は廃止されました。

  また 4.7 で導入された `API_PROPERTY_ENUM` マクロにジェネレータを対応させ、これまで取りこぼしていた enum プロパティ（`headGroup` / `headType` / `stemDirection` / `slurDirection` / `direction` / `horizontalDirection` / `keysig_mode` / `lineType` / `hideWhenEmpty`）を復活させました。

  その他、4.6 → 4.7 の API 差分（プロパティ・enum の増減、新クラス `Beam` / `Lyrics` など）を反映しています。

### Patch Changes

- [#26](https://github.com/kjfsm/musescore-plugin-sdk/pull/26) [`365117b`](https://github.com/kjfsm/musescore-plugin-sdk/commit/365117b731489ea0cd3fdc5e99c833eaf634fdee) Thanks [@kjfsm](https://github.com/kjfsm)! - 開発依存パッケージを最新バージョンに更新（Biome 2、TypeScript 6、Vitest 4）。

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
