---
"@kjfsm/musescore-plugin-sdk-types": minor
"@kjfsm/musescore-plugin-sdk-helpers": major
---

MuseScore のホストオブジェクトを型付きの単一コンテキストとして扱えるようにした。enum 値は
ビルド時に焼き込まず、実行中の MuseScore から解決する方針へ全面的に移行。

**types（minor・後方互換）**

- `qmlpluginapi.h` を型生成に追加し、ホスト型 `MuseScore`（PluginAPI）を自動生成。`curScore`・
  `scores`・`mscoreMajorVersion` 等のバージョン情報・約 80 個の実行時 enum（`Element` /
  `NoteType` / `BarLineType` ...）・`cmd` / `newElement` / `writeScore` / `quit` 等の
  メソッドを含む。enum プロパティは `DECLARE_API_ENUM` から `RuntimeEnum<typeof Enum>` 型で
  生成され、値は実行時に解決・キーは生成 enum で型チェックされる。
- `generatedFrom`（生成元 MuseScore バージョン）を公開 export に追加。
- `RuntimeEnum<T>` / `ElementEnum` / `NoteTypeEnum` / `BarLineTypeEnum` と各 `*Name` 型を追加。

**helpers（major・破壊的変更）**

- `definePlugin({ run(host) {...} })` を追加。QML から `Logic.run(mscore)` のように
  `MuseScore { }` オブジェクト自身を渡し、`host.curScore` / `host.Element` 等へ型付きでアクセス
  できる。実行時にバージョン照合（既定は警告）を行う。
- `assertHostVersion(host, mode)` を追加。`generatedFrom` のターゲット版と実行版の major/minor を
  突き合わせ、不一致なら throw / warn。`strictEnum(name, obj)` で存在しない enum メンバアクセスを
  例外化できる（任意）。
- `getNoteTypeName` / `isGraceNote` / `isGraceNoteBefore` / `isGraceNoteAfter` に実行時 `NoteType`
  引数を追加（破壊的）。`element-types.ts` は焼き込んだ `ElementType` 値への依存を排除（実行時は
  `el.name` 文字列で判定）。述語（`isDynamic` 等）の公開シグネチャは不変。
