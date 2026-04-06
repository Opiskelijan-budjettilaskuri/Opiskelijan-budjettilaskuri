import { useState, useEffect } from "react";
import { haeTulot } from "../api/tuloApi";
import { haeMenot } from "../api/menoApi";
import { nykyinenKuukausi } from "../utils/pvm";

export default function Tapahtumat() {
  const [kuukausi, setKuukausi] = useState(nykyinenKuukausi());
  const [tapahtumat, setTapahtumat] = useState([]);
  const [lataa, setLataa] = useState(false);
  const [virhe, setVirhe] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLataa(true);
    setVirhe("");
    Promise.all([haeTulot(), haeMenot()])
      .then(([tulot, menot]) => {
        if (cancelled) return;
        const yhdistetty = [
          ...tulot.map((t) => ({
            id: `t${t.id}`,
            tyyppi: "Tulo",
            kuvaus: t.kuvaus,
            maara: t.maara,
            pvm: t.pvm,
            kategoria: t.kategoria?.nimi ?? "–",
          })),
          ...menot.map((m) => ({
            id: `m${m.id}`,
            tyyppi: "Meno",
            kuvaus: m.kuvaus,
            maara: m.summa,
            pvm: m.pvm,
            kategoria: m.kategoria?.nimi ?? "–",
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
    return () => {
      cancelled = true;
    };
  }, []);

  const naytettavat = tapahtumat.filter(
    (t) => !kuukausi || t.pvm.startsWith(kuukausi)
  );

  return (
    <div style={{ textAlign: "left" }}>
      <h1>Tapahtumat</h1>

      <div className="card">
        <label style={{ display: "block", marginBottom: 12 }}>
          Valitse kuukausi:{" "}
          <input
            type="month"
            value={kuukausi}
            onChange={(e) => setKuukausi(e.target.value)}
          />
        </label>

        {lataa && <p>Ladataan...</p>}
        {virhe && <p style={{ color: "red" }}>{virhe}</p>}

        {!lataa && !virhe && naytettavat.length === 0 && (
          <p>Ei tapahtumia valitulle kuukaudelle.</p>
        )}

        {naytettavat.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Päivämäärä</th>
                <th style={thStyle}>Tyyppi</th>
                <th style={thStyle}>Kuvaus</th>
                <th style={thStyle}>Kategoria</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Summa (€)</th>
              </tr>
            </thead>
            <tbody>
              {naytettavat.map((t) => (
                <tr key={t.id}>
                  <td style={tdStyle}>{t.pvm}</td>
                  <td style={{ ...tdStyle, color: t.tyyppi === "Tulo" ? "green" : "red" }}>
                    {t.tyyppi}
                  </td>
                  <td style={tdStyle}>{t.kuvaus}</td>
                  <td style={tdStyle}>{t.kategoria}</td>
                  <td style={{ ...tdStyle, textAlign: "right", color: t.tyyppi === "Tulo" ? "green" : "red" }}>
                    {t.tyyppi === "Meno" ? "–" : "+"}{t.maara?.toFixed(2)}
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
