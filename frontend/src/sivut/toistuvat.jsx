import { useState, useEffect } from "react";
import { haeToistuvat, poistaToistuva, vaihdaAktiivinen } from "../api/toistuvaApi";

export default function Toistuvat() {
  const [toistuvat, setToistuvat] = useState([]);
  const [lataa, setLataa] = useState(true);
  const [virhe, setVirhe] = useState("");
  const [toimintoVirhe, setToimintoVirhe] = useState("");

  useEffect(() => {
    let cancelled = false;
    haeToistuvat()
      .then((data) => { if (!cancelled) setToistuvat(data); })
      .catch((e) => { if (!cancelled) setVirhe(e.message || "Toistuvien tapahtumien haku epäonnistui."); })
      .finally(() => { if (!cancelled) setLataa(false); });
    return () => { cancelled = true; };
  }, []);

  async function handlePoista(id) {
    setToimintoVirhe("");
    try {
      await poistaToistuva(id);
      setToistuvat((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setToimintoVirhe(e.message || "Poistaminen epäonnistui.");
    }
  }

  async function handleVaihdaAktiivinen(id) {
    setToimintoVirhe("");
    try {
      const paivitetty = await vaihdaAktiivinen(id);
      setToistuvat((prev) => prev.map((t) => (t.id === id ? paivitetty : t)));
    } catch (e) {
      setToimintoVirhe(e.message || "Tilan vaihto epäonnistui.");
    }
  }

  return (
    <div>
      <div className="page-hero">
        <h1>Toistuvat tapahtumat</h1>
        <p className="page-subtitle">Hallinnoi säännöllisesti toistuvat tulot ja menot</p>
      </div>

      <div className="card">
        {lataa && <p style={{ color: "var(--muted)" }}>Ladataan...</p>}
        {virhe && <p style={{ color: "var(--danger)" }}>{virhe}</p>}
        {toimintoVirhe && <p style={{ color: "var(--danger)" }}>{toimintoVirhe}</p>}

        {!lataa && !virhe && toistuvat.length === 0 && (
          <div className="empty-state">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            <p className="empty-state-title">Ei toistuvia tapahtumia</p>
            <p className="empty-state-desc">Lisää toistuvia tapahtumia Lisää tapahtuma -sivulta.</p>
          </div>
        )}

        {toistuvat.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Kuvaus</th>
                <th>Tyyppi</th>
                <th className="text-right">Summa (€)</th>
                <th>Toistuvuus</th>
                <th>Aloitus</th>
                <th>Lopetus</th>
                <th>Kategoria</th>
                <th>Tila</th>
                <th>Toiminnot</th>
              </tr>
            </thead>
            <tbody>
              {toistuvat.map((t) => (
                <tr key={t.id} style={{ opacity: t.aktiivinen ? 1 : 0.5 }}>
                  <td>{t.kuvaus}</td>
                  <td>
                    <span className={`badge ${t.tyyppi === "tulo" ? "badge-tulo" : "badge-meno"}`}>
                      {t.tyyppi === "tulo" ? "Tulo" : "Meno"}
                    </span>
                  </td>
                  <td className="text-right" style={{ fontWeight: 600, color: t.tyyppi === "tulo" ? "var(--success)" : "var(--danger)" }}>
                    {t.tyyppi === "meno" ? "–" : "+"}{t.summa?.toFixed(2)}
                  </td>
                  <td style={{ color: "var(--muted)" }}>{t.toistuvuus}</td>
                  <td style={{ color: "var(--muted)" }}>{t.aloitusPvm ?? "–"}</td>
                  <td style={{ color: "var(--muted)" }}>{t.lopetusPvm ?? "–"}</td>
                  <td style={{ color: "var(--muted)" }}>{t.kategoria?.nimi ?? "–"}</td>
                  <td>
                    <span className={`badge ${t.aktiivinen ? "badge-active" : "badge-inactive"}`}>
                      {t.aktiivinen ? "Aktiivinen" : "Ei aktiivinen"}
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
                    <button
                      type="button"
                      className="btn-sm"
                      onClick={() => handleVaihdaAktiivinen(t.id)}
                      style={{ minWidth: 110 }}
                    >
                      {t.aktiivinen ? "Poista käytöstä" : "Ota käyttöön"}
                    </button>
                    <button
                      type="button"
                      className="btn-sm btn-danger"
                      onClick={() => handlePoista(t.id)}
                    >
                      Poista
                    </button>
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
