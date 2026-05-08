import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { emit } from "../src/emit.js";
import { parseHeader } from "../src/parse.js";

const here = dirname(fileURLToPath(import.meta.url));

describe("parseHeader / emit", () => {
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
