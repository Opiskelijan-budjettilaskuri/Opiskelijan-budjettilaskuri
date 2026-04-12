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
      <h1>Toistuvat tapahtumat</h1>

      <div className="card">
        {lataa && <p>Ladataan...</p>}
        {virhe && <p style={{ color: "red" }}>{virhe}</p>}
        {toimintoVirhe && <p style={{ color: "red" }}>{toimintoVirhe}</p>}

        {!lataa && !virhe && toistuvat.length === 0 && (
          <p>Ei toistuvia tapahtumia. Voit lisätä niitä Lisää tapahtuma -sivulta.</p>
        )}

        {toistuvat.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Kuvaus</th>
                <th style={thStyle}>Tyyppi</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Summa (€)</th>
                <th style={thStyle}>Toistuvuus</th>
                <th style={thStyle}>Aloitus</th>
                <th style={thStyle}>Lopetus</th>
                <th style={thStyle}>Kategoria</th>
                <th style={thStyle}>Tila</th>
                <th style={thStyle}>Toiminnot</th>
              </tr>
            </thead>
            <tbody>
              {toistuvat.map((t) => (
                <tr key={t.id} style={{ opacity: t.aktiivinen ? 1 : 0.5 }}>
                  <td style={tdStyle}>{t.kuvaus}</td>
                  <td style={{ ...tdStyle, color: t.tyyppi === "tulo" ? "green" : "red" }}>
                    {t.tyyppi === "tulo" ? "Tulo" : "Meno"}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right", color: t.tyyppi === "tulo" ? "green" : "red" }}>
                    {t.tyyppi === "meno" ? "–" : "+"}{t.summa?.toFixed(2)}
                  </td>
                  <td style={tdStyle}>{t.toistuvuus}</td>
                  <td style={tdStyle}>{t.aloitusPvm ?? "–"}</td>
                  <td style={tdStyle}>{t.lopetusPvm ?? "–"}</td>
                  <td style={tdStyle}>{t.kategoria?.nimi ?? "–"}</td>
                  <td style={tdStyle}>
                    <span style={{ color: t.aktiivinen ? "green" : "gray" }}>
                      {t.aktiivinen ? "Aktiivinen" : "Ei aktiivinen"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      type="button"
                      onClick={() => handleVaihdaAktiivinen(t.id)}
                      style={{ marginRight: 6 }}
                    >
                      {t.aktiivinen ? "Poista käytöstä" : "Ota käyttöön"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePoista(t.id)}
                      style={{ color: "red" }}
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

const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "8px 12px",
  textAlign: "left",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px 12px",
};
