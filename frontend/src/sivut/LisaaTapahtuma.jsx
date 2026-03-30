import { useState, useEffect } from "react";
import { haeKategoriat, lisaaTulo } from "../api/tuloApi";

function tanaan() {
  return new Date().toISOString().slice(0, 10);
}

export default function LisaaTapahtuma() {
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

  async function handleSubmit(e) {
    e.preventDefault();
    setVirhe("");
    setOnnistui(false);

    const maaraNum = parseFloat(maara);
    if (!kuvaus.trim()) { setVirhe("Kuvaus on pakollinen."); return; }
    if (isNaN(maaraNum) || maaraNum <= 0) { setVirhe("Määrän on oltava positiivinen luku."); return; }

    setLahettaa(true);
    try {
      await lisaaTulo({
        kuvaus: kuvaus.trim(),
        maara: maaraNum,
        pvm,
        kategoria: kategoriaId ? { id: Number(kategoriaId) } : null,
      });
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
      <h1>Lisää tulo</h1>
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
          {onnistui && <p style={{ color: "green" }}>Tulo lisätty!</p>}

          <button type="submit" disabled={lahettaa}>
            {lahettaa ? "Tallennetaan..." : "Lisää tulo"}
          </button>
        </form>
      </div>
    </div>
  );
}
