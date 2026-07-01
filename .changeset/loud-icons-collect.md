---
"@kjfsm/musescore-plugin-sdk-types": major
"@kjfsm/musescore-plugin-sdk-helpers": major
---

生成 enum を「値を持たない型のみ」にし、enum の版差誤判定を型レベルで不可能にした。

**types（major・破壊的変更）**

- `enums.ts` は `export const <Enum> = { ... } as const` を出力しなくなった。各 enum は
  `export type <Enum>Name = "A" | "B" | ...`（メンバ名のユニオン）と、ブランド化された
  `export type <Enum> = EnumValue<"<Enum>">`（`number & { readonly __enum: Tag }`）のみになる。
  `<Enum>.MEMBER` のような値使用はコンパイルエラーになり、異なる enum 同士の値比較
  （例: `el.type === host.NoteType.NORMAL`）もブランド不一致で型エラーになる。
- `RuntimeEnum<T>` を `RuntimeEnum<Name extends string, Value>` に変更（`host.Element` 等の
  ホストプロパティの型）。`ElementEnum` / `NoteTypeEnum` / `BarLineTypeEnum` はこの新しい
  `RuntimeEnum` を使うよう更新（公開シグネチャ自体は不変）。

**helpers（major・破壊的変更）**

- `classifyBarlineKind` のシグネチャを `(type: BarLineType) => BarlineKind` から
  `(type: BarLineType, barLineType: BarLineTypeEnum) => BarlineKind` に変更。焼き込んだ
  `BarLineType.END` 等の比較が types 側の変更でコンパイル不能になったための対応。
  `barLineType` にはホストの実行時 enum（例: `host.BarLineType`）を渡す。

この変更は MuseScore のバージョン追従（`generatedFrom.tag` は据え置き）ではなく、型安全性強化に
伴う API 形状の破壊的変更のため、releasing.md の「MuseScore バージョンを跨がない破壊的変更」の
例外に該当する。major 番号は MuseScore の minor 対応表とはズレる。
