import type { Score } from "@kjfsm/musescore-plugin-sdk-types";
import { describe, expect, it, vi } from "vitest";
import { run } from "./logic.js";

describe("hello-world plugin", () => {
  it("logs 'no score is open' when score is null", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    run(null);
    expect(log).toHaveBeenCalledWith("hello from typescript");
    expect(log).toHaveBeenCalledWith("no score is open");
    log.mockRestore();
  });

  it("logs the note count and 'no range selection' for an empty score", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const score = {
      firstMeasure: null,
      ntracks: 0,
      selection: null,
    } as unknown as Score;
    run(score);
    expect(log).toHaveBeenCalledWith("hello from typescript");
    expect(log).toHaveBeenCalledWith("no range selection");
    expect(log).toHaveBeenCalledWith("note count: 0");
    log.mockRestore();
  });
});
