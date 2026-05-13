import { NoteType } from "@kjfsm/musescore-plugin-sdk-types";
import type { Chord } from "@kjfsm/musescore-plugin-sdk-types";

const GRACE_BEFORE_MASK =
  NoteType.ACCIACCATURA |
  NoteType.APPOGGIATURA |
  NoteType.GRACE4 |
  NoteType.GRACE16 |
  NoteType.GRACE32;

const GRACE_AFTER_MASK = NoteType.GRACE8_AFTER | NoteType.GRACE16_AFTER | NoteType.GRACE32_AFTER;

// NoteType の数値 → 名前の逆引きテーブル（Object.fromEntries は ES2019 のため for-of で構築）
const NOTE_TYPE_REVERSE: Partial<Record<NoteType, string>> = {};
for (const [k, v] of Object.entries(NoteType)) {
  NOTE_TYPE_REVERSE[v] = k;
}

/** NoteType の数値を MuseScore 4 の enum 定数名に変換する。未知の値は数値文字列で返す。 */
export function getNoteTypeName(noteType: NoteType): string {
  return NOTE_TYPE_REVERSE[noteType] ?? String(noteType);
}

/** 拍の前に付くグレースノート（アッチャカトゥーラ・アポジャトゥーラ・GRACE4/16/32）かどうか。 */
export function isGraceNoteBefore(chord: Chord): boolean {
  return (chord.noteType & GRACE_BEFORE_MASK) !== 0;
}

/** 拍の後に付くグレースノート（GRACE8/16/32_AFTER）かどうか。 */
export function isGraceNoteAfter(chord: Chord): boolean {
  return (chord.noteType & GRACE_AFTER_MASK) !== 0;
}

/** NORMAL 以外のノートタイプ（前後どちらかのグレースノート）かどうか。 */
export function isGraceNote(chord: Chord): boolean {
  return chord.noteType !== NoteType.NORMAL;
}
