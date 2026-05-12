import type { Score } from "@kjfsm/musescore-plugin-sdk-types";
import { describe, expect, it } from "vitest";
import { buildStructure, midiToName, noteTypeName } from "./logic.js";

describe("noteTypeName", () => {
  it("maps known NoteType values to MuseScore 4 enum names", () => {
    expect(noteTypeName(0)).toBe("NORMAL");
    expect(noteTypeName(1)).toBe("ACCIACCATURA");
    expect(noteTypeName(2)).toBe("APPOGGIATURA");
    expect(noteTypeName(4)).toBe("GRACE4");
    expect(noteTypeName(8)).toBe("GRACE16");
    expect(noteTypeName(16)).toBe("GRACE32");
    expect(noteTypeName(32)).toBe("GRACE8_AFTER");
    expect(noteTypeName(64)).toBe("GRACE16_AFTER");
    expect(noteTypeName(128)).toBe("GRACE32_AFTER");
    expect(noteTypeName(255)).toBe("INVALID");
  });

  it("falls back to the numeric string for unknown values", () => {
    expect(noteTypeName(99)).toBe("99");
  });
});

describe("midiToName", () => {
  it("converts standard pitches", () => {
    expect(midiToName(60)).toBe("C4");
    expect(midiToName(69)).toBe("A4");
    expect(midiToName(61)).toBe("C#4");
    expect(midiToName(72)).toBe("C5");
    expect(midiToName(48)).toBe("C3");
    expect(midiToName(21)).toBe("A0");
  });
});

describe("buildStructure", () => {
  it("returns error JSON when score is null", () => {
    const result = buildStructure(null);
    const parsed = JSON.parse(result) as { error: string };
    expect(parsed.error).toBeDefined();
  });

  it("returns valid structure for empty score", () => {
    const score = {
      title: "Test Score",
      composer: "Test Composer",
      lyricist: "",
      nstaves: 1,
      nmeasures: 0,
      ntracks: 4,
      duration: 0,
      parts: [],
      firstMeasure: null,
      selection: null,
      metaTag: (_tag: string) => "",
    } as unknown as Score;

    const result = buildStructure(score);
    const parsed = JSON.parse(result) as {
      score: { title: string; nstaves: number };
      parts: unknown[];
      measures: unknown[];
    };

    expect(parsed.score.title).toBe("Test Score");
    expect(parsed.score.nstaves).toBe(1);
    expect(parsed.parts).toEqual([]);
    expect(parsed.measures).toEqual([]);
  });

  it("falls back to metaTag for title", () => {
    const score = {
      title: "",
      composer: "",
      lyricist: "",
      nstaves: 0,
      nmeasures: 0,
      ntracks: 0,
      duration: 0,
      parts: [],
      firstMeasure: null,
      selection: null,
      metaTag: (tag: string) => (tag === "workTitle" ? "Meta Title" : ""),
    } as unknown as Score;

    const result = buildStructure(score);
    const parsed = JSON.parse(result) as { score: { title: string } };
    expect(parsed.score.title).toBe("Meta Title");
  });

  it("includes part information", () => {
    const score = {
      title: "",
      composer: "",
      lyricist: "",
      nstaves: 1,
      nmeasures: 0,
      ntracks: 4,
      duration: 0,
      parts: [
        {
          partName: "Violin",
          longName: "Violin",
          shortName: "Vl.",
          instrumentId: "strings.violin",
          staves: [{}],
        },
      ],
      firstMeasure: null,
      selection: null,
      metaTag: (_tag: string) => "",
    } as unknown as Score;

    const result = buildStructure(score);
    const parsed = JSON.parse(result) as {
      parts: Array<{ name: string; shortName: string; instrumentId: string; nstaves: number }>;
    };

    expect(parsed.parts).toHaveLength(1);
    expect(parsed.parts[0]?.name).toBe("Violin");
    expect(parsed.parts[0]?.shortName).toBe("Vl.");
    expect(parsed.parts[0]?.instrumentId).toBe("strings.violin");
    expect(parsed.parts[0]?.nstaves).toBe(1);
  });
});
