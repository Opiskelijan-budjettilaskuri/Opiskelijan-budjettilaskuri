import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { haeMenot, lisaaMeno, poistaMeno } from "../api/menoApi";

const BASE = "http://localhost:8080";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("haeMenot", () => {
  it("palauttaa menolistan", async () => {
    const menot = [{ id: 1, summa: 50, kuvaus: "Ruoka", pvm: "2026-05-01" }];
    fetch.mockResolvedValue({ ok: true, json: async () => menot });

    const result = await haeMenot();

    expect(result).toEqual(menot);
    expect(fetch).toHaveBeenCalledWith(`${BASE}/api/menot`, {
      credentials: "include",
    });
  });

  it("heittää virheen epäonnistuessa", async () => {
    fetch.mockResolvedValue({ ok: false, status: 401, text: async () => "Unauthorized" });

    await expect(haeMenot()).rejects.toThrow("Unauthorized");
  });
});

describe("lisaaMeno", () => {
  it("lähettää POST-pyynnön oikeilla parametreilla", async () => {
    const meno = { kuvaus: "Ruoka", summa: 25.5, pvm: "2026-05-01" };
    fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 1, ...meno }) });

    await lisaaMeno(meno);

    expect(fetch).toHaveBeenCalledWith(`${BASE}/api/menot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(meno),
    });
  });

  it("palauttaa luodun menon", async () => {
    const meno = { kuvaus: "Ruoka", summa: 25.5 };
    const vastaus = { id: 5, ...meno };
    fetch.mockResolvedValue({ ok: true, json: async () => vastaus });

    const result = await lisaaMeno(meno);

    expect(result).toEqual(vastaus);
  });

  it("heittää virheen epäonnistuessa", async () => {
    fetch.mockResolvedValue({ ok: false, status: 500, text: async () => "Server error" });

    await expect(lisaaMeno({})).rejects.toThrow("Server error");
  });
});

describe("poistaMeno", () => {
  it("lähettää DELETE-pyynnön oikeaan URL:iin", async () => {
    fetch.mockResolvedValue({ ok: true });

    await poistaMeno(5);

    expect(fetch).toHaveBeenCalledWith(`${BASE}/api/menot/5`, {
      method: "DELETE",
      credentials: "include",
    });
  });

  it("heittää virheen epäonnistuessa", async () => {
    fetch.mockResolvedValue({ ok: false, status: 404, text: async () => "Not found" });

    await expect(poistaMeno(99)).rejects.toThrow("Not found");
  });
});
