import { describe, it, expect } from "vitest";
import { linkStyle } from "../komponentit/Navigaatio";

describe("linkStyle()", () => {
  it("palauttaa lihavoinnin ja taustavärin kun linkki on aktiivinen", () => {
    const tyyli = linkStyle({ isActive: true });
    expect(tyyli.fontWeight).toBe(700);
    expect(tyyli.background).toBe("#eef2ff");
  });

  it("palauttaa normaalin painon ja läpinäkyvän taustan kun linkki ei ole aktiivinen", () => {
    const tyyli = linkStyle({ isActive: false });
    expect(tyyli.fontWeight).toBe(500);
    expect(tyyli.background).toBe("transparent");
  });
});
