import type {
  EngravingItem,
  FractionWrapper,
  ScoreElement,
} from "@kjfsm/musescore-plugin-sdk-types";

// Runtime-only properties absent from generated types
export type TempoElement = EngravingItem & { readonly tempo: number };
export type TimeSigElement = EngravingItem & {
  readonly timesigNominal: FractionWrapper;
  readonly timesigActual: FractionWrapper;
};

export function isTempo(el: ScoreElement | null | undefined): el is TempoElement {
  return el?.name === "TempoText";
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
