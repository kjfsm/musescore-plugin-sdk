import type {
  BarLineType,
  ClefType,
  EngravingItem,
  Key,
  Measure,
  ScoreElement,
  Segment,
} from "@kjfsm/musescore-plugin-sdk-types";

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

export function isTempo(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "Tempo" || el?.name === "TempoText";
}

export function isDynamic(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "Dynamic";
}

export function isTimeSig(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "TimeSig";
}

export function isBarLine(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "BarLine";
}

export function isKeySig(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "KeySig";
}

export function isClef(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "Clef";
}

export function isStaffText(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "StaffText";
}

export function isPlayTechAnnotation(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "PlayTechAnnotation";
}

export function isSystemText(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "SystemText";
}

export function isRehearsalMark(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "RehearsalMark";
}

/** Converts TempoText.tempo (beats per second) to BPM. */
export function getTempoBpm(el: EngravingItem): number {
  return Math.round(el.tempo * 60);
}
