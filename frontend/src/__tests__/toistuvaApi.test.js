import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  haeToistuvat,
  lisaaToistuva,
  poistaToistuva,
  vaihdaAktiivinen,
} from "../api/toistuvaApi";

const BASE = "http://localhost:8080";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("haeToistuvat", () => {
  it("palauttaa toistuvien tapahtumat", async () => {
    const data = [{ id: 1, kuvaus: "Vuokra", summa: 600, aktiivinen: true }];
    fetch.mockResolvedValue({ ok: true, json: async () => data });

    const result = await haeToistuvat();

    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith(`${BASE}/api/toistuvat`, {
      credentials: "include",
    });
  });

  it("heittää virheen epäonnistuessa", async () => {
    fetch.mockResolvedValue({ ok: false, status: 401 });

    await expect(haeToistuvat()).rejects.toThrow();
  });
});

describe("lisaaToistuva", () => {
  it("lähettää POST-pyynnön oikeilla parametreilla", async () => {
    const data = { kuvaus: "Vuokra", summa: 600, toistuvuus: "kuukausittain" };
    fetch.mockResolvedValue({ ok: true, json: async () => ({ id: 1, ...data }) });

    await lisaaToistuva(data);

    expect(fetch).toHaveBeenCalledWith(`${BASE}/api/toistuvat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
  });

  it("palauttaa luodun toistuvan tapahtuman", async () => {
    const data = { kuvaus: "Vuokra", summa: 600 };
    const vastaus = { id: 2, ...data };
    fetch.mockResolvedValue({ ok: true, json: async () => vastaus });

    const result = await lisaaToistuva(data);

    expect(result).toEqual(vastaus);
  });

  it("heittää virheen epäonnistuessa", async () => {
    fetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(lisaaToistuva({})).rejects.toThrow();
  });
});

describe("poistaToistuva", () => {
  it("lähettää DELETE-pyynnön oikeaan URL:iin", async () => {
    fetch.mockResolvedValue({ ok: true });

    await poistaToistuva(3);

    expect(fetch).toHaveBeenCalledWith(`${BASE}/api/toistuvat/3`, {
      method: "DELETE",
      credentials: "include",
    });
  });

  it("heittää virheen epäonnistuessa", async () => {
    fetch.mockResolvedValue({ ok: false, status: 404 });

    await expect(poistaToistuva(99)).rejects.toThrow();
  });
});

describe("vaihdaAktiivinen", () => {
  it("lähettää PATCH-pyynnön oikeaan URL:iin", async () => {
    const paivitetty = { id: 1, aktiivinen: false };
    fetch.mockResolvedValue({ ok: true, json: async () => paivitetty });

    const result = await vaihdaAktiivinen(1);

    expect(result).toEqual(paivitetty);
    expect(fetch).toHaveBeenCalledWith(`${BASE}/api/toistuvat/1/aktiivinen`, {
      method: "PATCH",
      credentials: "include",
    });
  });

  it("heittää virheen epäonnistuessa", async () => {
    fetch.mockResolvedValue({ ok: false, status: 404 });

    await expect(vaihdaAktiivinen(99)).rejects.toThrow();
  });
});
