import { useState, useEffect } from "react";
import { haeKategoriat, lisaaTulo, lisaaKategoria, poistaKategoria } from "../api/tuloApi";
import { lisaaMeno } from "../api/menoApi";
import { lisaaToistuva } from "../api/toistuvaApi";
import { tanaan } from "../utils/pvm";

const TULO = "tulo";
const MENO = "meno";

const TOISTUVUUS_VAIHTOEHDOT = [
  "päivittäin",
  "viikoittain",
  "kuukausittain",
  "vuosittain",
];

export default function LisaaTapahtuma() {
  const [aktiivinen, setAktiivinen] = useState(TULO);

  const [kuvaus, setKuvaus] = useState("");
  const [maara, setMaara] = useState("");
  const [pvm, setPvm] = useState(tanaan());
  const [kategoriaId, setKategoriaId] = useState("");
  const [kategoriat, setKategoriat] = useState([]);
  const [lataaKategoriat, setLataaKategoriat] = useState(false);
  const [lahettaa, setLahettaa] = useState(false);
  const [virhe, setVirhe] = useState("");
  const [onnistui, setOnnistui] = useState(false);

  const [uusiKategoriaNimi, setUusiKategoriaNimi] = useState("");
  const [lisaaKategoriaa, setLisaaKategoriaa] = useState(false);
  const [kategoriaLisaysVirhe, setKategoriaLisaysVirhe] = useState("");

  const [lisaaUusi, setLisaaUusi] = useState(false);
  const [hallinnoi, setHallinnoi] = useState(false);
  const [poistettava, setPoistettava] = useState(null);

  const [toistuva, setToistuva] = useState(false);
  const [toistuvuus, setToistuvuus] = useState("kuukausittain");
  const [aloitusPvm, setAloitusPvm] = useState(tanaan());
  const [lopetusPvm, setLopetusPvm] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLataaKategoriat(true);
    haeKategoriat()
      .then((data) => { if (!cancelled) setKategoriat(data); })
      .catch(() => { if (!cancelled) setVirhe("Kategorioiden haku epäonnistui."); })
      .finally(() => { if (!cancelled) setLataaKategoriat(false); });
    return () => { cancelled = true; };
  }, []);

  function vaihdaValilehti(lehti) {
    setAktiivinen(lehti);
    setVirhe("");
    setOnnistui(false);
    setKuvaus("");
    setMaara("");
    setPvm(tanaan());
    setKategoriaId("");
    setToistuva(false);
    setToistuvuus("kuukausittain");
    setAloitusPvm(tanaan());
    setLopetusPvm("");
    setUusiKategoriaNimi("");
    setLisaaKategoriaa(false);
    setKategoriaLisaysVirhe("");
    setLisaaUusi(false);
    setHallinnoi(false);
    setPoistettava(null);
  }

  async function handlePoistaKategoria(id) {
    setPoistettava(id);
    try {
      await poistaKategoria(id);
      setKategoriat((prev) => prev.filter((k) => k.id !== id));
      if (kategoriaId === String(id)) setKategoriaId("");
    } finally {
      setPoistettava(null);
    }
  }

  async function handleLisaaKategoria() {
    const nimi = uusiKategoriaNimi.trim();
    if (!nimi) return;
    setLisaaKategoriaa(true);
    setKategoriaLisaysVirhe("");
    try {
      const uusi = await lisaaKategoria(nimi);
      setKategoriat((prev) => [...prev, uusi]);
      setKategoriaId(String(uusi.id));
      setUusiKategoriaNimi("");
      setLisaaUusi(false);
    } catch (err) {
      setKategoriaLisaysVirhe(err.message || "Kategorian lisäys epäonnistui.");
    } finally {
      setLisaaKategoriaa(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setVirhe("");
    setOnnistui(false);

    const maaraNum = parseFloat(maara);
    if (!kuvaus.trim()) { setVirhe("Kuvaus on pakollinen."); return; }
    if (isNaN(maaraNum) || maaraNum <= 0) { setVirhe("Määrän on oltava positiivinen luku."); return; }
    if (toistuva && !aloitusPvm) { setVirhe("Aloituspäivämäärä on pakollinen."); return; }

    const kategoria = kategoriaId ? { id: Number(kategoriaId) } : null;

    setLahettaa(true);
    try {
      if (toistuva) {
        await lisaaToistuva({
          kuvaus: kuvaus.trim(),
          summa: maaraNum,
          tyyppi: aktiivinen,
          toistuvuus,
          aloitusPvm,
          ...(lopetusPvm ? { lopetusPvm } : {}),
          ...(kategoriaId ? { kategoria: { id: Number(kategoriaId) } } : {}),
        });
      } else if (aktiivinen === TULO) {
        await lisaaTulo({ kuvaus: kuvaus.trim(), maara: maaraNum, pvm, kategoria });
      } else {
        await lisaaMeno({ kuvaus: kuvaus.trim(), summa: maaraNum, pvm, kategoria });
      }
      setOnnistui(true);
      setKuvaus("");
      setMaara("");
      setPvm(tanaan());
      setKategoriaId("");
      setAloitusPvm(tanaan());
      setLopetusPvm("");
    } catch (err) {
      setVirhe(err.message || "Tallennus epäonnistui.");
    } finally {
      setLahettaa(false);
    }
  }

  return (
    <div>
      <h1>Lisää tapahtuma</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => vaihdaValilehti(TULO)}
          style={{ fontWeight: aktiivinen === TULO ? "bold" : "normal" }}
        >
          Lisää tulo
        </button>
        <button
          type="button"
          onClick={() => vaihdaValilehti(MENO)}
          style={{ fontWeight: aktiivinen === MENO ? "bold" : "normal" }}
        >
          Lisää meno
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Kuvaus</label>
            <input
              type="text"
              value={kuvaus}
              onChange={(e) => setKuvaus(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Määrä (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={maara}
              onChange={(e) => setMaara(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={toistuva}
                onChange={(e) => setToistuva(e.target.checked)}
              />
              Toistuva
            </label>
          </div>

          {!toistuva && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>Päivämäärä</label>
              <input
                type="date"
                value={pvm}
                onChange={(e) => setPvm(e.target.value)}
              />
            </div>
          )}

          {toistuva && (
            <>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>Toistuvuus</label>
                <select
                  value={toistuvuus}
                  onChange={(e) => setToistuvuus(e.target.value)}
                >
                  {TOISTUVUUS_VAIHTOEHDOT.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>Aloituspäivämäärä</label>
                <input
                  type="date"
                  value={aloitusPvm}
                  onChange={(e) => setAloitusPvm(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  Lopetuspäivämäärä <span style={{ color: "gray", fontSize: "0.9em" }}>(valinnainen)</span>
                </label>
                <input
                  type="date"
                  value={lopetusPvm}
                  onChange={(e) => setLopetusPvm(e.target.value)}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Kategoria</label>
            <select
              value={kategoriaId}
              onChange={(e) => setKategoriaId(e.target.value)}
              disabled={lataaKategoriat}
            >
              <option value="">Ei kategoriaa</option>
              {kategoriat.map((k) => (
                <option key={k.id} value={k.id}>{k.nimi}</option>
              ))}
            </select>

            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => setLisaaUusi((v) => !v)}
                style={{ fontSize: "0.85em", background: "none", border: "none", padding: 0, cursor: "pointer", color: "#666", textDecoration: "underline" }}
              >
                {lisaaUusi ? "Piilota lisäys" : "Lisää kategoria"}
              </button>
              {kategoriat.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHallinnoi((v) => !v)}
                  style={{ fontSize: "0.85em", background: "none", border: "none", padding: 0, cursor: "pointer", color: "#666", textDecoration: "underline" }}
                >
                  {hallinnoi ? "Piilota hallinta" : "Hallinnoi kategorioita"}
                </button>
              )}
            </div>

            {hallinnoi && (
              <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0 }}>
                {kategoriat.map((k) => (
                  <li key={k.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ flex: 1 }}>{k.nimi}</span>
                    <button
                      type="button"
                      onClick={() => handlePoistaKategoria(k.id)}
                      disabled={poistettava === k.id}
                      style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
                      aria-label={`Poista ${k.nimi}`}
                    >
                      {poistettava === k.id ? "..." : "✕"}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {lisaaUusi && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="Kategorian nimi..."
                    value={uusiKategoriaNimi}
                    onChange={(e) => setUusiKategoriaNimi(e.target.value)}
                    disabled={lisaaKategoriaa}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={handleLisaaKategoria}
                    disabled={lisaaKategoriaa || !uusiKategoriaNimi.trim()}
                  >
                    {lisaaKategoriaa ? "Lisätään..." : "Tallenna"}
                  </button>
                </div>
                {kategoriaLisaysVirhe && (
                  <p style={{ color: "red", marginTop: 4 }}>{kategoriaLisaysVirhe}</p>
                )}
              </div>
            )}
          </div>

          {virhe && <p style={{ color: "red" }}>{virhe}</p>}
          {onnistui && (
            <p style={{ color: "green" }}>
              {toistuva
                ? `Toistuva ${aktiivinen === TULO ? "tulo" : "meno"} lisätty!`
                : aktiivinen === TULO
                ? "Tulo lisätty!"
                : "Meno lisätty!"}
            </p>
          )}

          <button type="submit" disabled={lahettaa}>
            {lahettaa
              ? "Tallennetaan..."
              : toistuva
              ? `Lisää toistuva ${aktiivinen === TULO ? "tulo" : "meno"}`
              : aktiivinen === TULO
              ? "Lisää tulo"
              : "Lisää meno"}
          </button>
        </form>
      </div>
    </div>
  );
}
