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
    return () => {
      cancelled = true;
    };
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
        {poistoVirhe && <p style={{ color: "red" }}>{poistoVirhe}</p>}

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
                <th style={thStyle}>Toistuva</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {naytettavat.map((t) => (
                <tr key={t.id} style={{ opacity: t.toistuvuus && t.aktiivinen === false ? 0.5 : 1 }}>
                  <td style={tdStyle}>{t.pvm}</td>
                  <td style={{ ...tdStyle, color: t.tyyppi === "Tulo" ? "green" : "red" }}>
                    {t.tyyppi}
                  </td>
                  <td style={tdStyle}>{t.kuvaus}</td>
                  <td style={tdStyle}>{t.kategoria}</td>
                  <td style={{ ...tdStyle, textAlign: "right", color: t.tyyppi === "Tulo" ? "green" : "red" }}>
                    {t.tyyppi === "Meno" ? "–" : "+"}{t.maara?.toFixed(2)}
                  </td>
                  <td style={tdStyle}>
                    {t.toistuvuus && (
                      <span style={{
                        background: "#e8f0fe",
                        color: "#1a56db",
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontSize: "0.85em",
                        whiteSpace: "nowrap",
                      }}>
                        {t.toistuvuus}
                      </span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {!t.toistuvuus && (
                      <button
                        onClick={() => handlePoista(t)}
                        style={{ color: "red", background: "none", border: "1px solid red", borderRadius: 4, cursor: "pointer", padding: "2px 8px" }}
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

const thStyle = {
  borderBottom: "2px solid #ccc",
  padding: "8px 12px",
  textAlign: "left",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "8px 12px",
};
