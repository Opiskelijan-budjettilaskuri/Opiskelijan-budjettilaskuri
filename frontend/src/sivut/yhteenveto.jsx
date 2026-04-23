import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import { haeYhteenveto } from "../api/yhteenvetoApi";
import { tanaan, kuunEnsimmainen, kuunViimeinen, tanaVuonnaAlku } from "../utils/pvm";

function defaultAlku() {
  const d = new Date();
  return kuunEnsimmainen(d.getFullYear(), d.getMonth() + 1);
}

function defaultLoppu() {
  const d = new Date();
  return kuunViimeinen(d.getFullYear(), d.getMonth() + 1);
}

export default function Yhteenveto() {
  const [alkupvm, setAlkupvm] = useState(defaultAlku);
  const [loppupvm, setLoppupvm] = useState(defaultLoppu);
  const [data, setData] = useState(null);
  const [virhe, setVirhe] = useState("");
  const [lataa, setLataa] = useState(false);

  useEffect(() => {
    if (!alkupvm || !loppupvm) return;
    let cancelled = false;

    async function lataaData() {
      setLataa(true);
      setVirhe("");
      try {
        const json = await haeYhteenveto(alkupvm, loppupvm);
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setVirhe(e.message || "Yhteenvetoa ei voitu hakea.");
      } finally {
        if (!cancelled) setLataa(false);
      }
    }

    lataaData();
    return () => { cancelled = true; };
  }, [alkupvm, loppupvm]);

  function asetaTamaKuukausi() {
    const d = new Date();
    setAlkupvm(kuunEnsimmainen(d.getFullYear(), d.getMonth() + 1));
    setLoppupvm(kuunViimeinen(d.getFullYear(), d.getMonth() + 1));
  }

  function asetaViimeiset3kk() {
    const d = new Date();
    const alku = new Date(d.getFullYear(), d.getMonth() - 2, 1);
    setAlkupvm(kuunEnsimmainen(alku.getFullYear(), alku.getMonth() + 1));
    setLoppupvm(tanaan());
  }

  function asetaTamaVuosi() {
    setAlkupvm(tanaVuonnaAlku());
    setLoppupvm(tanaan());
  }

  const vertailuData = data
    ? [{ nimi: "Aikaväli", Tulot: data.tulot, Menot: data.menot }]
    : [];

  const menotKatData = data?.menotKategorioittain ?? [];
  const tulotKatData = data?.tulotKategorioittain ?? [];

  const btnStyle = {
    fontSize: "0.85em", padding: "4px 10px", cursor: "pointer",
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h1>Yhteenveto</h1>

      {/* Aikavälin valinta */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <button type="button" style={btnStyle} onClick={asetaTamaKuukausi}>Tämä kuukausi</button>
          <button type="button" style={btnStyle} onClick={asetaViimeiset3kk}>Viimeiset 3 kk</button>
          <button type="button" style={btnStyle} onClick={asetaTamaVuosi}>Tämä vuosi</button>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <label>
            Alkaen{" "}
            <input
              type="date"
              value={alkupvm}
              onChange={(e) => setAlkupvm(e.target.value)}
            />
          </label>
          <label>
            Päättyen{" "}
            <input
              type="date"
              value={loppupvm}
              onChange={(e) => setLoppupvm(e.target.value)}
            />
          </label>
        </div>
      </div>

      {lataa && <p>Ladataan...</p>}
      {virhe && <p style={{ color: "red" }}>{virhe}</p>}

      {data && (
        <>
          {/* KPI + vertailukaavio samassa kortissa */}
          <div className="card" style={{ marginBottom: 16 }}>
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>{data.aikavali}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }}>
              <div className="kpi" style={{ flexDirection: "column", gap: 8 }}>
                <div className="kpiBox">
                  <div className="kpiLabel">Tulot</div>
                  <div className="kpiValue">{data.tulot.toFixed(2)} €</div>
                </div>
                <div className="kpiBox">
                  <div className="kpiLabel">Menot</div>
                  <div className="kpiValue">{data.menot.toFixed(2)} €</div>
                </div>
                <div className="kpiBox">
                  <div className="kpiLabel">Saldo</div>
                  <div className="kpiValue">{data.saldo.toFixed(2)} €</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={vertailuData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nimi" hide />
                  <YAxis unit=" €" />
                  <Tooltip formatter={(v) => `${v.toFixed(2)} €`} />
                  <Legend />
                  <Bar dataKey="Tulot" fill="#4caf50" />
                  <Bar dataKey="Menot" fill="#f44336" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Kategoriakaaaviot vierekkäin */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="card">
              <h2 style={{ marginTop: 0, marginBottom: 8 }}>Menot kategorioittain</h2>
              {menotKatData.length === 0 ? (
                <p style={{ color: "gray" }}>Ei menokirjauksia tällä ajanjaksolla.</p>
              ) : (
                <ResponsiveContainer width="100%" height={Math.max(160, menotKatData.length * 36)}>
                  <BarChart
                    data={menotKatData.map((k) => ({ nimi: k.kategoria, Summa: k.summa }))}
                    layout="vertical"
                    margin={{ top: 0, right: 12, left: 4, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit=" €" />
                    <YAxis type="category" dataKey="nimi" width={90} />
                    <Tooltip formatter={(v) => `${v.toFixed(2)} €`} />
                    <Bar dataKey="Summa" fill="#f44336" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0, marginBottom: 8 }}>Tulot kategorioittain</h2>
              {tulotKatData.length === 0 ? (
                <p style={{ color: "gray" }}>Ei tulokirjauksia tällä ajanjaksolla.</p>
              ) : (
                <ResponsiveContainer width="100%" height={Math.max(160, tulotKatData.length * 36)}>
                  <BarChart
                    data={tulotKatData.map((k) => ({ nimi: k.kategoria, Summa: k.summa }))}
                    layout="vertical"
                    margin={{ top: 0, right: 12, left: 4, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit=" €" />
                    <YAxis type="category" dataKey="nimi" width={90} />
                    <Tooltip formatter={(v) => `${v.toFixed(2)} €`} />
                    <Bar dataKey="Summa" fill="#4caf50" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
