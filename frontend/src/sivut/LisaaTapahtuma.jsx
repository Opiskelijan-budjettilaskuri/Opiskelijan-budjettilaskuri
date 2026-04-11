import { useState, useEffect } from "react";
import { haeKategoriat, lisaaTulo } from "../api/tuloApi";
import { lisaaMeno } from "../api/menoApi";
import { tanaan } from "../utils/pvm";

const TULO = "tulo";
const MENO = "meno";

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
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setVirhe("");
    setOnnistui(false);

    const maaraNum = parseFloat(maara);
    if (!kuvaus.trim()) { setVirhe("Kuvaus on pakollinen."); return; }
    if (isNaN(maaraNum) || maaraNum <= 0) { setVirhe("Määrän on oltava positiivinen luku."); return; }

    const kategoria = kategoriaId ? { id: Number(kategoriaId) } : null;

    setLahettaa(true);
    try {
      if (aktiivinen === TULO) {
        await lisaaTulo({ kuvaus: kuvaus.trim(), maara: maaraNum, pvm, kategoria });
      } else {
        await lisaaMeno({ kuvaus: kuvaus.trim(), maara: maaraNum, pvm, kategoria });
      }
      setOnnistui(true);
      setKuvaus("");
      setMaara("");
      setPvm(tanaan());
      setKategoriaId("");
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
            <label style={{ display: "block", marginBottom: 4 }}>Päivämäärä</label>
            <input
              type="date"
              value={pvm}
              onChange={(e) => setPvm(e.target.value)}
            />
          </div>

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
          </div>

          {virhe && <p style={{ color: "red" }}>{virhe}</p>}
          {onnistui && <p style={{ color: "green" }}>{aktiivinen === TULO ? "Tulo" : "Meno"} lisätty!</p>}

          <button type="submit" disabled={lahettaa}>
            {lahettaa ? "Tallennetaan..." : aktiivinen === TULO ? "Lisää tulo" : "Lisää meno"}
          </button>
        </form>
      </div>
    </div>
  );
}
