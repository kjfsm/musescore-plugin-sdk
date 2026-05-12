import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { emit } from "../src/emit.js";
import { parseHeader } from "../src/parse.js";

const here = dirname(fileURLToPath(import.meta.url));

describe("parseHeader / emit", () => {
  it("parses top-level enums with multi-word base types (e.g. unsigned char)", async () => {
    const source = await readFile(join(here, "fixtures/enum-base.h"), "utf8");
    const result = parseHeader(source);

    const noteType = result.enums.find((e) => e.name === "NoteType");
    expect(noteType).toBeDefined();
    expect(noteType?.members.map((m) => m.name)).toContain("NORMAL");
    expect(noteType?.members.find((m) => m.name === "NORMAL")?.value).toBe("0");
    expect(noteType?.members.find((m) => m.name === "ACCIACCATURA")?.value).toBe("0x1");
    expect(noteType?.members.find((m) => m.name === "INVALID")?.value).toBe("0xFF");

    const playEventType = result.enums.find((e) => e.name === "PlayEventType");
    expect(playEventType).toBeDefined();
    expect(playEventType?.members.map((m) => m.name)).toEqual(["Auto", "User"]);

    const accidentalType = result.enums.find((e) => e.name === "AccidentalType");
    expect(accidentalType).toBeDefined();
    expect(accidentalType?.members.map((m) => m.name)).toEqual([
      "NONE",
      "FLAT",
      "NATURAL",
      "SHARP",
      "SHARP2",
      "FLAT2",
    ]);

    const out = emit({ perFile: [], enumOnlyFiles: [{ path: "enum-base.h", result }] });
    expect(out.enums).toContain("export const NoteType = {");
    expect(out.enums).toContain("  NORMAL: 0,");
    expect(out.enums).toContain("  ACCIACCATURA: 1,");
    expect(out.enums).toContain("  INVALID: 255,");
    expect(out.enums).toContain("export const PlayEventType = {");
    expect(out.enums).toContain("  Auto: 0,");
    expect(out.enums).toContain("  User: 1,");
  });

  it("extracts classes, properties and Q_INVOKABLE methods from a fixture header", async () => {
    const source = await readFile(join(here, "fixtures/note.h"), "utf8");
    const result = parseHeader(source);

    const note = result.classes.find((c) => c.name === "Note");
    expect(note).toBeDefined();
    expect(note?.baseClass).toBe("EngravingItem");
    expect(note?.properties.map((p) => p.name).sort()).toEqual(["pitch", "pitchName", "tpc1"]);
    const pitch = note?.properties.find((p) => p.name === "pitch");
    expect(pitch?.readOnly).toBe(false);
    const tpc1 = note?.properties.find((p) => p.name === "tpc1");
    expect(tpc1?.readOnly).toBe(true);

    const methodNames = note?.methods.map((m) => m.name).sort();
    expect(methodNames).toEqual(["mute", "name", "nextNote"]);

    const out = emit({ perFile: [{ path: "note.h", result }] });
    expect(out.pluginApi).toContain("export interface Note extends EngravingItem");
    expect(out.pluginApi).toContain("readonly tpc1: number;");
    expect(out.pluginApi).toContain("pitch: number;");
    expect(out.pluginApi).toContain("name(): string;");
    expect(out.pluginApi).toContain("mute(muted: boolean): void;");
    expect(out.pluginApi).toContain("nextNote(): Note | null;");
  });
});
