---
"@kjfsm/musescore-plugin-sdk-types": minor
---

MuseScore v4.7.2 に追従して型を再生成しました。

apiv1 のフラクション・ラッパクラスが `FractionWrapper` から `Fraction` に改名されたため、ジェネレータの既知型マッピングを更新しました。`timesigNominal` / `timesigActual` / `timesig` / `timesigStretch` / `lyricTicks` / `spannerTick` / `spannerTicks` の型が `Fraction | null` になります（メンバーは `numerator` / `denominator` / `ticks` / `str` / `real` 等）。`FractionWrapper` 型名は廃止されました。

その他、4.6 → 4.7 の API 差分（プロパティ・enum の増減）を反映しています。
