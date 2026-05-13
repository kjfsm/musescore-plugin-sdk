import type {
  BarLineType,
  ClefType,
  EngravingItem,
  Key,
  Measure,
  ScoreElement,
  Segment,
} from "@kjfsm/musescore-plugin-sdk-types";
import { ElementType as ET } from "@kjfsm/musescore-plugin-sdk-types";

/** Returns the written time signature for the measure, e.g. "4/4". Empty string if unavailable. */
export function getMeasureTimeSig(measure: Measure): string {
  const frac = measure.timesigNominal ?? measure.timesigActual;
  return frac?.str ?? "";
}

/** Iterates measure segments to find the last BarLine element's barlineType. Returns -1 if none found. */
export function getMeasureEndBarlineType(measure: Measure): BarLineType | -1 {
  let result: BarLineType | -1 = -1;
  for (const seg of measure.segments) {
    const el = seg.elementAt(0);
    if (el && el.name === "BarLine") {
      result = el.barlineType;
    }
  }
  return result;
}

export interface MeasureRepeatInfo {
  repeatStart: boolean;
  repeatEnd: boolean;
  repeatCount: number;
}

/** Returns repeat barline and volta count information for the measure. */
export function getMeasureRepeatInfo(measure: Measure): MeasureRepeatInfo {
  return {
    repeatStart: measure.repeatStart,
    repeatEnd: measure.repeatEnd,
    repeatCount: measure.repeatCount,
  };
}

/**
 * Reads the `actualKey` (concert key, in fifths) from a KeySig element at the given segment
 * for the given staff index. Returns null if no KeySig element is present at that track.
 */
export function getKeySigAt(segment: Segment, staffIdx: number): Key | null {
  for (let voice = 0; voice < 4; voice++) {
    const el = segment.elementAt(staffIdx * 4 + voice);
    if (el && el.name === "KeySig") {
      return el.actualKey;
    }
  }
  return null;
}

/**
 * Reads the `concertClefType` from a Clef element at the given segment for the given staff index.
 * Returns null if no Clef element is present at that track.
 */
export function getClefTypeAt(segment: Segment, staffIdx: number): ClefType | null {
  for (let voice = 0; voice < 4; voice++) {
    const el = segment.elementAt(staffIdx * 4 + voice);
    if (el && el.name === "Clef") {
      return el.concertClefType;
    }
  }
  return null;
}

// SMuFL symbol name → dynamic abbreviation
const SMUFL_DYNAMIC: Record<string, string> = {
  dynamicPPPPP: "ppppp",
  dynamicPPPP: "pppp",
  dynamicPPP: "ppp",
  dynamicPP: "pp",
  dynamicPiano: "p",
  dynamicMezzo: "m",
  dynamicForte: "f",
  dynamicFF: "ff",
  dynamicFFF: "fff",
  dynamicFFFF: "ffff",
  dynamicFFFFF: "fffff",
  dynamicSforzando: "sf",
  dynamicNiente: "n",
  dynamicRinforzando: "r",
  dynamicZ: "z",
  dynamicFP: "fp",
  dynamicSforzandoPiano: "sfp",
  dynamicSforzandoPianissimo: "sfpp",
  dynamicForteForte: "ff",
  dynamicPianoPiano: "pp",
};

/**
 * Converts Dynamic.plainText (SMuFL symbol names concatenated, e.g. "dynamicMezzodynamicPiano")
 * to a human-readable abbreviation ("mp").
 */
export function parseDynamicText(raw: string): string {
  const tokens = raw.split(/(?=dynamic[A-Z])/).filter(Boolean);
  return tokens.map((t) => SMUFL_DYNAMIC[t] ?? t).join("");
}

// --- Element-type predicates ---

// ElementType values that have named predicates.
// Adding a value here forces a corresponding entry in ELEMENT_TYPE_NAMES (Record enforces completeness).
type PredicateElementType =
  | typeof ET.DYNAMIC
  | typeof ET.EXPRESSION
  | typeof ET.TEMPO_TEXT
  | typeof ET.STAFF_TEXT
  | typeof ET.SYSTEM_TEXT
  | typeof ET.REHEARSAL_MARK
  | typeof ET.PLAYTECH_ANNOTATION
  | typeof ET.BAR_LINE
  | typeof ET.KEYSIG
  | typeof ET.TIMESIG
  | typeof ET.CLEF;

// Single source of truth: ElementType value → element name(s).
// satisfies Record<...> ensures every PredicateElementType has an entry.
const ELEMENT_TYPE_NAMES = {
  [ET.DYNAMIC]: "Dynamic",
  [ET.EXPRESSION]: "Expression",
  [ET.TEMPO_TEXT]: ["Tempo", "TempoText"] as const,
  [ET.STAFF_TEXT]: "StaffText",
  [ET.SYSTEM_TEXT]: "SystemText",
  [ET.REHEARSAL_MARK]: "RehearsalMark",
  [ET.PLAYTECH_ANNOTATION]: "PlayTechAnnotation",
  [ET.BAR_LINE]: "BarLine",
  [ET.KEYSIG]: "KeySig",
  [ET.TIMESIG]: "TimeSig",
  [ET.CLEF]: "Clef",
} satisfies Record<PredicateElementType, string | readonly string[]>;

// Generates a type-guard predicate from a name or name list.
function makeIs(names: string | readonly string[]) {
  return (el: ScoreElement | null | undefined): el is EngravingItem =>
    el != null &&
    (Array.isArray(names) ? (names as readonly string[]).includes(el.name) : el.name === names);
}

export const isDynamic = makeIs(ELEMENT_TYPE_NAMES[ET.DYNAMIC]);
export const isExpression = makeIs(ELEMENT_TYPE_NAMES[ET.EXPRESSION]);
export const isTempo = makeIs(ELEMENT_TYPE_NAMES[ET.TEMPO_TEXT]);
export const isStaffText = makeIs(ELEMENT_TYPE_NAMES[ET.STAFF_TEXT]);
export const isSystemText = makeIs(ELEMENT_TYPE_NAMES[ET.SYSTEM_TEXT]);
export const isRehearsalMark = makeIs(ELEMENT_TYPE_NAMES[ET.REHEARSAL_MARK]);
export const isPlayTechAnnotation = makeIs(ELEMENT_TYPE_NAMES[ET.PLAYTECH_ANNOTATION]);
export const isBarLine = makeIs(ELEMENT_TYPE_NAMES[ET.BAR_LINE]);
export const isKeySig = makeIs(ELEMENT_TYPE_NAMES[ET.KEYSIG]);
export const isTimeSig = makeIs(ELEMENT_TYPE_NAMES[ET.TIMESIG]);
export const isClef = makeIs(ELEMENT_TYPE_NAMES[ET.CLEF]);

/** Converts TempoText.tempo (beats per second) to BPM. */
export function getTempoBpm(el: EngravingItem): number {
  return Math.round(el.tempo * 60);
}
