---
"@kjfsm/musescore-plugin-sdk-helpers": minor
---

記譜解析向けのアクセサ helper を追加し、`classifyBarlineKind` のリピート分類を細分化しました。

- `getNotePitches(chord)` — 和音内の各音符の MIDI 音高（0-127）を配列で返す。
- `isTie(el)` / `getTiePitches(tie)` — タイの型ガードと、両端ノートの MIDI 音高取得（端点が欠落/無音程なら `null`）。正しいタイは `startPitch === endPitch`。
- **`classifyBarlineKind` の挙動変更**: これまで START/END/END_START の各リピートをすべて `"repeat"` に丸めていたが、`"repeat_start"` / `"repeat_end"` / `"repeat_both"` に区別するようにした。`BarlineKind` 型から `"repeat"` を削除。リピート開始/終了の対応チェックを可能にするための変更。
