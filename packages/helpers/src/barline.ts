import { BarLineType } from "@kjfsm/musescore-plugin-sdk-types";

export type BarlineKind = "final" | "double" | "repeat" | "other";

function assertNever(x: never): never {
  throw new Error(`Unhandled BarLineType: ${x}`);
}

/**
 * Classifies a BarLineType value into a semantic category.
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
    case BarLineType.END_REPEAT:
    case BarLineType.END_START_REPEAT:
      return "repeat";
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
