import { describe, expect, it } from "vitest";
import { mapType } from "../src/map-types.js";

describe("mapType", () => {
  const known = new Set(["Note", "Score"]);

  it("maps primitives", () => {
    expect(mapType("int", known).ts).toBe("number");
    expect(mapType("qreal", known).ts).toBe("number");
    expect(mapType("bool", known).ts).toBe("boolean");
    expect(mapType("QString", known).ts).toBe("string");
    expect(mapType("void", known).ts).toBe("void");
  });

  it("maps pointers to nullable", () => {
    expect(mapType("Note*", known).ts).toBe("Note | null");
    expect(mapType("const Note*", known).ts).toBe("Note | null");
  });

  it("maps QList to arrays", () => {
    expect(mapType("QList<Note*>", known).ts).toBe("(Note | null)[]");
    expect(mapType("QList<int>", known).ts).toBe("number[]");
  });

  it("strips namespaces", () => {
    expect(mapType("mu::engraving::apiv1::Score*", known).ts).toBe("Score | null");
  });

  it("falls back to unknown with a warning", () => {
    const r = mapType("FooBarBaz<int>", known);
    expect(r.ts).toBe("unknown");
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});
