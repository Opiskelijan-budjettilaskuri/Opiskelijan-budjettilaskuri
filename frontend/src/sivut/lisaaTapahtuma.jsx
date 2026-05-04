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
      <div className="page-hero">
        <h1>Lisää tapahtuma</h1>
        <p className="page-subtitle">Kirjaa uusi tulo, meno tai toistuva tapahtuma</p>
      </div>

      <div className="tab-group">
        <button
          type="button"
          className={`tab-btn${aktiivinen === TULO ? " active" : ""}`}
          onClick={() => vaihdaValilehti(TULO)}
        >
          Lisää tulo
        </button>
        <button
          type="button"
          className={`tab-btn${aktiivinen === MENO ? " active" : ""}`}
          onClick={() => vaihdaValilehti(MENO)}
        >
          Lisää meno
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Kuvaus</label>
            <input
              type="text"
              className="full-width"
              value={kuvaus}
              onChange={(e) => setKuvaus(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Määrä (€)</label>
            <input
              type="number"
              className="full-width"
              min="0"
              step="0.01"
              value={maara}
              onChange={(e) => setMaara(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>
              <input
                type="checkbox"
                checked={toistuva}
                onChange={(e) => setToistuva(e.target.checked)}
              />
              Toistuva
            </label>
          </div>

          {!toistuva && (
            <div className="form-group">
              <label className="form-label">Päivämäärä</label>
              <input
                type="date"
                value={pvm}
                onChange={(e) => setPvm(e.target.value)}
              />
            </div>
          )}

          {toistuva && (
            <>
              <div className="form-group">
                <label className="form-label">Toistuvuus</label>
                <select
                  value={toistuvuus}
                  onChange={(e) => setToistuvuus(e.target.value)}
                >
                  {TOISTUVUUS_VAIHTOEHDOT.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Aloituspäivämäärä</label>
                <input
                  type="date"
                  value={aloitusPvm}
                  onChange={(e) => setAloitusPvm(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Lopetuspäivämäärä{" "}
                  <span style={{ color: "var(--muted)", fontWeight: 400 }}>(valinnainen)</span>
                </label>
                <input
                  type="date"
                  value={lopetusPvm}
                  onChange={(e) => setLopetusPvm(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Kategoria</label>
            <select
              className="full-width"
              value={kategoriaId}
              onChange={(e) => setKategoriaId(e.target.value)}
              disabled={lataaKategoriat}
            >
              <option value="">Ei kategoriaa</option>
              {kategoriat.map((k) => (
                <option key={k.id} value={k.id}>{k.nimi}</option>
              ))}
            </select>

            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setLisaaUusi((v) => !v)}
              >
                {lisaaUusi ? "Piilota lisäys" : "Lisää kategoria"}
              </button>
              {kategoriat.length > 0 && (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setHallinnoi((v) => !v)}
                >
                  {hallinnoi ? "Piilota hallinta" : "Hallinnoi kategorioita"}
                </button>
              )}
            </div>

            {hallinnoi && (
              <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0 }}>
                {kategoriat.map((k) => (
                  <li key={k.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ flex: 1, fontSize: "0.9rem" }}>{k.nimi}</span>
                    <button
                      type="button"
                      className="btn-sm btn-danger"
                      onClick={() => handlePoistaKategoria(k.id)}
                      disabled={poistettava === k.id}
                      aria-label={`Poista ${k.nimi}`}
                    >
                      {poistettava === k.id ? "..." : "Poista"}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {lisaaUusi && (
              <div style={{ marginTop: 10 }}>
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
                  <p style={{ color: "var(--danger)", marginTop: 4, fontSize: "0.875rem" }}>{kategoriaLisaysVirhe}</p>
                )}
              </div>
            )}
          </div>

          {virhe && <p style={{ color: "var(--danger)", marginBottom: 12, fontSize: "0.875rem" }}>{virhe}</p>}
          {onnistui && (
            <p style={{ color: "var(--success)", marginBottom: 12, fontSize: "0.875rem" }}>
              {toistuva
                ? `Toistuva ${aktiivinen === TULO ? "tulo" : "meno"} lisätty!`
                : aktiivinen === TULO
                ? "Tulo lisätty!"
                : "Meno lisätty!"}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={lahettaa}>
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
