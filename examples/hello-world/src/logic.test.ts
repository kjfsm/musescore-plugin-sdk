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
});
