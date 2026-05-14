import type { HairpinType, ScoreElement, Spanner } from "@kjfsm/musescore-plugin-sdk-types";

/**
 * A MuseScore hairpin (crescendo/diminuendo). Extends Spanner so that spannerTick and
 * spannerTicks are accessible after narrowing with isHairpin.
 */
export interface Hairpin extends Spanner {
  hairpinType: HairpinType;
}

export function isHairpin(el: ScoreElement | null | undefined): el is Hairpin {
  return el?.name === "Hairpin";
}

export interface HairpinRange {
  startTick: number;
  endTick: number;
}

/** Returns the tick range [startTick, endTick) of a hairpin. */
export function getHairpinRange(el: Hairpin): HairpinRange {
  const start = el.spannerTick?.ticks ?? 0;
  const dur = el.spannerTicks?.ticks ?? 0;
  return { startTick: start, endTick: start + dur };
}
