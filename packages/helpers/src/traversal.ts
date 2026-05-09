import type {
  Chord,
  EngravingItem,
  Measure,
  Note,
  Score,
  Segment,
  Selection,
} from "@kjfsm/musescore-plugin-sdk-types";
import { isChord, isNote } from "./predicates.js";

export interface IterateScopeOptions {
  /**
   * - `"auto"` (default): use the range selection if one exists, otherwise the
   *   whole score.
   * - `"selection"`: use the current selection. Yields nothing when no
   *   selection exists.
   * - `"all"`: always traverse the whole score, ignoring any selection.
   */
  scope?: "auto" | "selection" | "all";
}

type IterationMode = "all" | "range" | "elements" | "empty";

function resolveMode(scope: "auto" | "selection" | "all", sel: Selection | null): IterationMode {
  if (scope === "all") return "all";
  if (scope === "auto") return sel?.isRange ? "range" : "all";
  if (sel?.isRange) return "range";
  if (sel && sel.elements.length > 0) return "elements";
  return "empty";
}

export function* iterateMeasures(score: Score): Generator<Measure> {
  let m: Measure | null = score.firstMeasure;
  while (m) {
    yield m;
    m = m.nextMeasure;
  }
}

export function* iterateSegments(score: Score, segmentTypes?: number): Generator<Segment> {
  for (const measure of iterateMeasures(score)) {
    let seg: Segment | null = measure.firstSegment;
    while (seg) {
      if (segmentTypes === undefined || (seg.segmentType & segmentTypes) !== 0) {
        yield seg;
      }
      seg = seg.nextInMeasure;
    }
  }
}

export function* iterateAnnotations(score: Score): Generator<EngravingItem> {
  for (const seg of iterateSegments(score)) {
    for (const annotation of seg.annotations) {
      yield annotation;
    }
  }
}

function* iterateChordsAll(score: Score): Generator<Chord> {
  const ntracks = score.ntracks;
  for (const seg of iterateSegments(score)) {
    for (let track = 0; track < ntracks; track++) {
      const el = seg.elementAt(track);
      if (isChord(el)) yield el;
    }
  }
}

function* iterateChordsInRange(sel: Selection): Generator<Chord> {
  const startTick = sel.startSegment?.tick ?? 0;
  const endTick = sel.endSegment?.tick ?? Number.MAX_SAFE_INTEGER;
  const startTrack = sel.startStaff * 4;
  const endTrack = sel.endStaff * 4;
  let seg: Segment | null = sel.startSegment;
  while (seg && seg.tick < endTick && seg.tick >= startTick) {
    for (let track = startTrack; track < endTrack; track++) {
      const el = seg.elementAt(track);
      if (isChord(el)) yield el;
    }
    seg = seg.next;
  }
}

export function* iterateChords(score: Score, options?: IterateScopeOptions): Generator<Chord> {
  const sel = score.selection;
  const mode = resolveMode(options?.scope ?? "auto", sel);
  if (mode === "all") {
    yield* iterateChordsAll(score);
  } else if (mode === "range" && sel) {
    yield* iterateChordsInRange(sel);
  } else if (mode === "elements" && sel) {
    for (const el of sel.elements) {
      if (isChord(el)) yield el;
    }
  }
}

export function* iterateNotes(score: Score, options?: IterateScopeOptions): Generator<Note> {
  const sel = score.selection;
  const mode = resolveMode(options?.scope ?? "auto", sel);
  if (mode === "all") {
    for (const chord of iterateChordsAll(score)) {
      for (const note of chord.notes) yield note;
    }
  } else if (mode === "range" && sel) {
    for (const chord of iterateChordsInRange(sel)) {
      for (const note of chord.notes) yield note;
    }
  } else if (mode === "elements" && sel) {
    for (const el of sel.elements) {
      if (isNote(el)) yield el;
    }
  }
}
