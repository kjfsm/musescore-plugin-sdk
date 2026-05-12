import { NoteType } from "@kjfsm/musescore-plugin-sdk-types";
import type { Chord } from "@kjfsm/musescore-plugin-sdk-types";

// NoteType の数値 → 名前の逆引きテーブル（モジュール初期化時に一度だけ構築）
const NOTE_TYPE_REVERSE = Object.fromEntries(
  Object.entries(NoteType).map(([k, v]) => [v, k]),
) as Record<number, string>;

/** NoteType の数値を MuseScore 4 の enum 定数名に変換する。未知の値は数値文字列で返す。 */
export function getNoteTypeName(noteType: number): string {
  return NOTE_TYPE_REVERSE[noteType] ?? String(noteType);
}

/** 拍の前に付くグレースノート（アッチャカトゥーラ・アポジャトゥーラ・GRACE4/16/32）かどうか。 */
export function isGraceNoteBefore(chord: Chord): boolean {
  const mask =
    NoteType.ACCIACCATURA |
    NoteType.APPOGGIATURA |
    NoteType.GRACE4 |
    NoteType.GRACE16 |
    NoteType.GRACE32;
  return (chord.noteType & mask) !== 0;
}

/** 拍の後に付くグレースノート（GRACE8/16/32_AFTER）かどうか。 */
export function isGraceNoteAfter(chord: Chord): boolean {
  const mask = NoteType.GRACE8_AFTER | NoteType.GRACE16_AFTER | NoteType.GRACE32_AFTER;
  return (chord.noteType & mask) !== 0;
}

/** NORMAL 以外のノートタイプ（前後どちらかのグレースノート）かどうか。 */
export function isGraceNote(chord: Chord): boolean {
  return chord.noteType !== NoteType.NORMAL;
}
