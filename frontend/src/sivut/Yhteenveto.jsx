import { useEffect, useMemo, useState } from "react";
import { haeYhteenveto } from "../api/yhteenvetoApi";
import { nykyinenKuukausi } from "../utils/pvm";

export default function Yhteenveto() {
  const [kuukausi, setKuukausi] = useState(nykyinenKuukausi());
  const [data, setData] = useState(null);
  const [virhe, setVirhe] = useState("");
  const [lataa, setLataa] = useState(false);

  const kkLabel = useMemo(() => kuukausi, [kuukausi]);

  useEffect(() => {
    let cancelled = false;

    async function lataaData() {
      setLataa(true);
      setVirhe("");

      try {
        const json = await haeYhteenveto(kuukausi);
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setVirhe(e.message || "Yhteenvetoa ei voitu hakea.");
      } finally {
        if (!cancelled) setLataa(false);
      }
    }

    lataaData();
    return () => {
      cancelled = true;
    };
  }, [kuukausi]);

  return (
    <div style={{ textAlign: "left" }}>
      <h1>Yhteenveto</h1>

      <div className="card">
        <label style={{ display: "block", marginBottom: 12 }}>
          Valitse kuukausi:{" "}
          <input
            type="month"
            value={kuukausi}
            onChange={(e) => setKuukausi(e.target.value)}
          />
        </label>

        <h2>{kkLabel}</h2>

        {lataa && <p>Ladataan...</p>}
        {virhe && <p style={{ color: "red" }}>{virhe}</p>}
        {data && (
          <div className="kpi">
            <div className="kpiBox">
              <div className="kpiLabel">Tulot</div>
              <div className="kpiValue">{data.tulot}</div>
            </div>
            <div className="kpiBox">
              <div className="kpiLabel">Menot</div>
              <div className="kpiValue">{data.menot}</div>
            </div>
            <div className="kpiBox">
              <div className="kpiLabel">Saldo</div>
              <div className="kpiValue">{data.saldo}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
