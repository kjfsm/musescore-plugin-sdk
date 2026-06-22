// `typeof import(...)` で生成 enum の「型」だけを参照する。値 import をしないため
// JS 出力には何も漏れず、`verbatimModuleSyntax` の有無にも依存しない。
type GeneratedEnums = typeof import("./generated/enums.js");

/**
 * MuseScore (`MuseScore { }` ブロック) から実行時に渡される enum オブジェクトの型。
 *
 * QML の `Element` / `NoteType` などは「実行中の MuseScore が提供する」enum で、
 * `Element.NOTE` はその版の int 値に実行時解決される。値をビルド時に焼き込まないため、
 * MuseScore のバージョン差で enum 値が並び替わっても壊れない（公式プラグインと同じ流儀）。
 *
 * - キー（メンバ名）は生成済み enum から型付けされる → `Element.NOITE` のようなタイポや
 *   上流のリネームをコンパイル時に検出できる。
 * - 値は `number`（実行時に解決されるため、特定の int リテラルに固定しない）。
 *
 * @example
 * ```ts
 * // logic.ts — QML から `Logic.run(curScore, Element)` で渡す
 * export function run(score: Score | null, Element: ElementEnum): void {
 *   for (const el of iterate(score)) {
 *     if (el.type === Element.NOTE) { ... } // 実行中の版の値に解決される
 *   }
 * }
 * ```
 *
 * 補足: `ElementType` のように要素側に名前アクセサ（`el.name`）がある enum は、helpers の
 * 述語（`isNote` 等）のように `el.name` 文字列で判定でき、この enum オブジェクトを渡す必要はない。
 * `NoteType` / `BarLineType` のように int でしか取得できない enum で本型が必要になる。
 */
export type RuntimeEnum<T> = { readonly [K in keyof T]: number };

/** 実行時の `Element` enum オブジェクト（`ElementType` のメンバ名でキー付け）。 */
export type ElementEnum = RuntimeEnum<GeneratedEnums["ElementType"]>;

/** 実行時の `NoteType` enum オブジェクト。 */
export type NoteTypeEnum = RuntimeEnum<GeneratedEnums["NoteType"]>;

/** 実行時の `BarLineType` enum オブジェクト。 */
export type BarLineTypeEnum = RuntimeEnum<GeneratedEnums["BarLineType"]>;

/** `ElementType` のメンバ名のユニオン（"NOTE" | "CHORD" | ...）。`keyof ElementEnum` と等価。 */
export type ElementTypeName = keyof ElementEnum;

/** `NoteType` のメンバ名のユニオン（"NORMAL" | "ACCIACCATURA" | ...）。`keyof NoteTypeEnum` と等価。 */
export type NoteTypeName = keyof NoteTypeEnum;

/** `BarLineType` のメンバ名のユニオン（"NORMAL" | "DOUBLE" | ...）。`keyof BarLineTypeEnum` と等価。 */
export type BarLineTypeName = keyof BarLineTypeEnum;
