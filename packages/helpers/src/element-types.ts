import type {
  EngravingItem,
  FractionWrapper,
  Measure,
  ScoreElement,
} from "@kjfsm/musescore-plugin-sdk-types";

// Runtime-only properties absent from generated types
export type TempoElement = EngravingItem & { readonly tempo: number };
export type TimeSigElement = EngravingItem & {
  readonly timesigNominal: FractionWrapper;
  readonly timesigActual: FractionWrapper;
};

// Measure.timesigNominal / timesigActual are API_PROPERTY macros not captured by types-generator
type MeasureRuntime = Measure & {
  readonly timesigNominal: { str: string } | null;
  readonly timesigActual: { str: string } | null;
};

/** Returns the written time signature for the measure, e.g. "4/4". Empty string if unavailable. */
export function getMeasureTimeSig(measure: Measure): string {
  const m = measure as unknown as MeasureRuntime;
  const frac = m.timesigNominal ?? m.timesigActual;
  return typeof frac?.str === "string" ? frac.str : "";
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

export function isTempo(el: ScoreElement | null | undefined): el is TempoElement {
  // MuseScore 4 plugin API exposes TempoText elements as name "Tempo"
  return el?.name === "Tempo" || el?.name === "TempoText";
}

export function isDynamic(el: ScoreElement | null | undefined): el is EngravingItem {
  return el?.name === "Dynamic";
}

export function isTimeSig(el: ScoreElement | null | undefined): el is TimeSigElement {
  return el?.name === "TimeSig";
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
export function getTempoBpm(el: TempoElement): number {
  return Math.round(el.tempo * 60);
}
