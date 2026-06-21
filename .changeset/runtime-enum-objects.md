---
"@kjfsm/musescore-plugin-sdk-types": minor
"@kjfsm/musescore-plugin-sdk-helpers": major
---

実行時の MuseScore enum オブジェクトを型安全に扱えるようにした。MuseScore のバージョン差で
enum 値が並び替わっても壊れないよう、ビルド時に値を焼き込まず、QML から渡される実行時 enum
（`Element` / `NoteType` / `BarLineType`）を使う方針へ移行。

**types（minor・後方互換）**

- `RuntimeEnum<T>` と `ElementEnum` / `NoteTypeEnum` / `BarLineTypeEnum`、および
  `ElementTypeName` / `NoteTypeName` / `BarLineTypeName`（メンバ名ユニオン）を追加。
  キーは生成 enum から型付けされ（タイポ・リネームをコンパイル時に検出）、値は実行時に解決される。

**helpers（major・破壊的変更）**

- `getNoteTypeName` / `isGraceNote` / `isGraceNoteBefore` / `isGraceNoteAfter` の各関数に、
  実行時の `NoteType` enum オブジェクト引数を追加。`getNoteTypeName(value, noteType)` のように
  呼び出し側で QML の `NoteType` を渡す必要がある。
- `element-types.ts` は内部的に焼き込んでいた `ElementType` 値への依存を排除（実行時判定は
  `el.name` 文字列）。述語（`isDynamic` 等）の公開シグネチャは不変。
