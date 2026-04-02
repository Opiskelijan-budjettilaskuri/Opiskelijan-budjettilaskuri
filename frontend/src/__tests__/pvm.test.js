import { describe, it, expect } from "vitest";
import { tanaan } from "../sivut/LisaaTapahtuma";
import { nykyinenKuukausi } from "../sivut/Yhteenveto";

describe("tanaan()", () => {
  it("palauttaa merkkijonon muodossa YYYY-MM-DD", () => {
    const tulos = tanaan();
    expect(tulos).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("palauttaa tämän päivän päivämäärän", () => {
    const tulos = tanaan();
    const odotettu = new Date().toISOString().slice(0, 10);
    expect(tulos).toBe(odotettu);
  });
});

describe("nykyinenKuukausi()", () => {
  it("palauttaa merkkijonon muodossa YYYY-MM", () => {
    const tulos = nykyinenKuukausi();
    expect(tulos).toMatch(/^\d{4}-\d{2}$/);
  });

  it("palauttaa nykyisen kuukauden", () => {
    const tulos = nykyinenKuukausi();
    const d = new Date();
    const odotettu = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    expect(tulos).toBe(odotettu);
  });
});
