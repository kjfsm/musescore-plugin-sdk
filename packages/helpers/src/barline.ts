import { BarLineType } from "@kjfsm/musescore-plugin-sdk-types";

export type BarlineKind =
  | "final"
  | "double"
  | "repeat_start"
  | "repeat_end"
  | "repeat_both"
  | "other";

function assertNever(x: never): never {
  throw new Error(`Unhandled BarLineType: ${x}`);
}

/**
 * Classifies a BarLineType value into a semantic category.
 * Repeat barlines are distinguished into start / end / both (END_START_REPEAT)
 * so callers can match opening and closing repeats.
 * The exhaustive switch ensures TypeScript errors if BarLineType gains new values.
 */
export function classifyBarlineKind(type: BarLineType): BarlineKind {
  switch (type) {
    case BarLineType.END:
    case BarLineType.REVERSE_END:
      return "final";
    case BarLineType.DOUBLE:
      return "double";
    case BarLineType.START_REPEAT:
      return "repeat_start";
    case BarLineType.END_REPEAT:
      return "repeat_end";
    case BarLineType.END_START_REPEAT:
      return "repeat_both";
    case BarLineType.NORMAL:
    case BarLineType.BROKEN:
    case BarLineType.DOTTED:
    case BarLineType.HEAVY:
    case BarLineType.DOUBLE_HEAVY:
      return "other";
    default:
      return assertNever(type);
  }
}
