import { BarLineType } from "@kjfsm/musescore-plugin-sdk-types";
import { describe, expect, it } from "vitest";
import { classifyBarlineKind } from "../src/barline.js";

describe("classifyBarlineKind", () => {
  it("classifies final barlines", () => {
    expect(classifyBarlineKind(BarLineType.END)).toBe("final");
    expect(classifyBarlineKind(BarLineType.REVERSE_END)).toBe("final");
  });

  it("classifies double barline", () => {
    expect(classifyBarlineKind(BarLineType.DOUBLE)).toBe("double");
  });

  it("classifies repeat barlines", () => {
    expect(classifyBarlineKind(BarLineType.START_REPEAT)).toBe("repeat");
    expect(classifyBarlineKind(BarLineType.END_REPEAT)).toBe("repeat");
    expect(classifyBarlineKind(BarLineType.END_START_REPEAT)).toBe("repeat");
  });

  it("classifies other barlines", () => {
    expect(classifyBarlineKind(BarLineType.NORMAL)).toBe("other");
    expect(classifyBarlineKind(BarLineType.BROKEN)).toBe("other");
    expect(classifyBarlineKind(BarLineType.DOTTED)).toBe("other");
    expect(classifyBarlineKind(BarLineType.HEAVY)).toBe("other");
    expect(classifyBarlineKind(BarLineType.DOUBLE_HEAVY)).toBe("other");
  });
});
