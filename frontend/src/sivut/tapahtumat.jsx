import { useState, useEffect } from "react";
import { haeTulot, poistaTulo } from "../api/tuloApi";
import { haeMenot, poistaMeno } from "../api/menoApi";
import { haeToistuvat } from "../api/toistuvaApi";
import { nykyinenKuukausi } from "../utils/pvm";

export default function Tapahtumat() {
  const [kuukausi, setKuukausi] = useState(nykyinenKuukausi());
  const [tapahtumat, setTapahtumat] = useState([]);
  const [lataa, setLataa] = useState(true);
  const [virhe, setVirhe] = useState("");
  const [poistoVirhe, setPoistoVirhe] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([haeTulot(), haeMenot(), haeToistuvat()])
      .then(([tulot, menot, toistuvat]) => {
        if (cancelled) return;
        const yhdistetty = [
          ...tulot.map((t) => ({
            id: `t${t.id}`,
            tyyppi: "Tulo",
            kuvaus: t.kuvaus,
            maara: t.maara,
            pvm: t.pvm,
            kategoria: t.kategoria?.nimi ?? "–",
            toistuvuus: null,
          })),
          ...menot.map((m) => ({
            id: `m${m.id}`,
            tyyppi: "Meno",
            kuvaus: m.kuvaus,
            maara: m.summa,
            pvm: m.pvm,
            kategoria: m.kategoria?.nimi ?? "–",
            toistuvuus: null,
          })),
          ...toistuvat.map((r) => ({
            id: `r${r.id}`,
            tyyppi: r.tyyppi === "tulo" ? "Tulo" : "Meno",
            kuvaus: r.kuvaus,
            maara: r.summa,
            pvm: r.aloitusPvm,
            kategoria: r.kategoria?.nimi ?? "–",
            toistuvuus: r.toistuvuus,
            aktiivinen: r.aktiivinen,
          })),
        ].sort((a, b) => b.pvm.localeCompare(a.pvm));
        setTapahtumat(yhdistetty);
      })
      .catch((e) => {
        if (!cancelled) setVirhe(e.message || "Tapahtumien haku epäonnistui.");
      })
      .finally(() => {
        if (!cancelled) setLataa(false);
      });
    return () => { cancelled = true; };
  }, []);

  async function handlePoista(tapahtuma) {
    setPoistoVirhe("");
    try {
      if (tapahtuma.id.startsWith("t")) {
        await poistaTulo(Number(tapahtuma.id.slice(1)));
      } else {
        await poistaMeno(Number(tapahtuma.id.slice(1)));
      }
      setTapahtumat((prev) => prev.filter((t) => t.id !== tapahtuma.id));
    } catch (e) {
      setPoistoVirhe(e.message || "Poisto epäonnistui.");
    }
  }

  const naytettavat = tapahtumat.filter(
    (t) => !kuukausi || t.toistuvuus !== null || t.pvm.startsWith(kuukausi)
  );

  return (
    <div style={{ textAlign: "left" }}>
      <div className="page-hero">
        <h1>Tapahtumat</h1>
        <p className="page-subtitle">Selaa ja hallinnoi kaikkia taloustapahtumiasi kuukausittain</p>
      </div>

      <div className="card">
        <div className="form-group">
          <label className="form-label">
            Valitse kuukausi
            <input
              type="month"
              value={kuukausi}
              onChange={(e) => setKuukausi(e.target.value)}
              style={{ marginLeft: 10 }}
            />
          </label>
        </div>

        {lataa && <p style={{ color: "var(--muted)" }}>Ladataan...</p>}
        {virhe && <p style={{ color: "var(--danger)" }}>{virhe}</p>}
        {poistoVirhe && <p style={{ color: "var(--danger)" }}>{poistoVirhe}</p>}

        {!lataa && !virhe && naytettavat.length === 0 && (
          <div className="empty-state">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <p className="empty-state-title">Ei tapahtumia</p>
            <p className="empty-state-desc">Valitulle kuukaudelle ei löydy tapahtumia.</p>
          </div>
        )}

        {naytettavat.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Päivämäärä</th>
                <th>Tyyppi</th>
                <th>Kuvaus</th>
                <th>Kategoria</th>
                <th className="text-right">Summa (€)</th>
                <th>Toistuva</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {naytettavat.map((t) => (
                <tr key={t.id} style={{ opacity: t.toistuvuus && t.aktiivinen === false ? 0.5 : 1 }}>
                  <td>{t.pvm}</td>
                  <td>
                    <span className={`badge ${t.tyyppi === "Tulo" ? "badge-tulo" : "badge-meno"}`}>
                      {t.tyyppi}
                    </span>
                  </td>
                  <td>{t.kuvaus}</td>
                  <td style={{ color: "var(--muted)" }}>{t.kategoria}</td>
                  <td className="text-right" style={{ fontWeight: 600, color: t.tyyppi === "Tulo" ? "var(--success)" : "var(--danger)" }}>
                    {t.tyyppi === "Meno" ? "–" : "+"}{t.maara?.toFixed(2)}
                  </td>
                  <td>
                    {t.toistuvuus && (
                      <span className="badge badge-info">{t.toistuvuus}</span>
                    )}
                  </td>
                  <td>
                    {!t.toistuvuus && (
                      <button
                        className="btn-sm btn-danger"
                        onClick={() => handlePoista(t)}
                      >
                        Poista
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
