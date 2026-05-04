import { describe, it, expect } from "vitest";
import { linkStyle } from "../utils/linkStyle";

describe("linkStyle()", () => {
  it("palauttaa lihavoinnin ja taustavärin kun linkki on aktiivinen", () => {
    const tyyli = linkStyle({ isActive: true });
    expect(tyyli.fontWeight).toBe(600);
    expect(tyyli.background).toBe("#f3e8ff");
  });

  it("palauttaa normaalin painon ja läpinäkyvän taustan kun linkki ei ole aktiivinen", () => {
    const tyyli = linkStyle({ isActive: false });
    expect(tyyli.fontWeight).toBe(400);
    expect(tyyli.background).toBe("transparent");
  });
});
