import { describe, it, expect, vi, afterEach } from "vitest";
import { haeKategoriat, lisaaTulo, lisaaKategoria } from "../api/tuloApi";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("haeKategoriat()", () => {
  it("palauttaa datan onnistuneesta vastauksesta", async () => {
    const mockData = [{ id: 1, nimi: "Ruoka" }, { id: 2, nimi: "Liikenne" }];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    }));

    const tulos = await haeKategoriat();
    expect(tulos).toEqual(mockData);
  });

  it("heittää virheen kun vastaus ei ole ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    }));

    await expect(haeKategoriat()).rejects.toThrow("Internal Server Error");
  });
});

describe("lisaaKategoria()", () => {
  it("lähettää POST-pyynnön oikealla nimellä ja palauttaa tallennetun kategorian", async () => {
    const mockVastaus = { id: 5, nimi: "Vaatteet" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockVastaus,
    });
    vi.stubGlobal("fetch", fetchMock);

    const tulos = await lisaaKategoria("Vaatteet");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain("/api/kategoriat");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({ nimi: "Vaatteet" });
    expect(tulos).toEqual(mockVastaus);
  });

  it("heittää virheen kun vastaus ei ole ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      text: async () => "Kategoria on jo olemassa",
    }));

    await expect(lisaaKategoria("Ruoka")).rejects.toThrow("Kategoria on jo olemassa");
  });
});

describe("lisaaTulo()", () => {
  it("lähettää POST-pyynnön oikealla datalla ja palauttaa vastauksen", async () => {
    const uusiTulo = { kuvaus: "Palkka", maara: 2000, pvm: "2026-04-01", kategoria: null };
    const mockVastaus = { id: 42, ...uusiTulo };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockVastaus,
    });
    vi.stubGlobal("fetch", fetchMock);

    const tulos = await lisaaTulo(uusiTulo);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toContain("/api/tulot");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual(uusiTulo);
    expect(tulos).toEqual(mockVastaus);
  });
});
