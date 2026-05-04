import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area,
} from "recharts";
import { haeYhteenveto } from "../api/yhteenvetoApi";
import { kuunEnsimmainen, kuunViimeinen, tanaVuonnaAlku, tanaan } from "../utils/pvm";

const PIIRAKKAVARET = [
  "#f44336", "#e91e63", "#9c27b0", "#3f51b5",
  "#2196f3", "#009688", "#ff9800", "#795548",
];

function defaultAlku() {
  const d = new Date();
  return kuunEnsimmainen(d.getFullYear(), d.getMonth() + 1);
}

function defaultLoppu() {
  const d = new Date();
  return kuunViimeinen(d.getFullYear(), d.getMonth() + 1);
}

function kuukausiNimi(vuosi, kuukausi) {
  return new Date(vuosi, kuukausi - 1, 1).toLocaleDateString("fi-FI", {
    month: "short",
    year: "2-digit",
  });
}

function PiirakkaTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  const total = payload[0].payload.total;
  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
  return (
    <div style={{ background: "#fff", border: "1px solid #ccc", padding: "6px 10px", borderRadius: 4 }}>
      <strong>{name}</strong>: {value.toFixed(2)} € ({pct} %)
    </div>
  );
}

export default function Yhteenveto() {
  const [alkupvm, setAlkupvm] = useState(defaultAlku);
  const [loppupvm, setLoppupvm] = useState(defaultLoppu);
  const [data, setData] = useState(null);
  const [virhe, setVirhe] = useState("");
  const [lataa, setLataa] = useState(false);
  const [trendiData, setTrendiData] = useState([]);

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

  useEffect(() => {
    let cancelled = false;
    async function laataaTrendi() {
      const d = new Date();
      const kuukaudet = Array.from({ length: 12 }, (_, i) => {
        const kohde = new Date(d.getFullYear(), d.getMonth() - (11 - i), 1);
        return { vuosi: kohde.getFullYear(), kuukausi: kohde.getMonth() + 1 };
      });

      try {
        const tulokset = await Promise.all(
          kuukaudet.map(({ vuosi, kuukausi }) =>
            haeYhteenveto(
              kuunEnsimmainen(vuosi, kuukausi),
              kuunViimeinen(vuosi, kuukausi)
            ).catch(() => ({ tulot: 0, menot: 0 }))
          )
        );
        if (!cancelled) {
          setTrendiData(
            kuukaudet.map(({ vuosi, kuukausi }, i) => ({
              kuukausi: kuukausiNimi(vuosi, kuukausi),
              Tulot: tulokset[i].tulot ?? 0,
              Menot: tulokset[i].menot ?? 0,
            }))
          );
        }
      } catch {
        // Trendi ei kriittinen – jätetään tyhjäksi
      }
    }
    laataaTrendi();
    return () => { cancelled = true; };
  }, []);

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

  const menotYhteensa = menotKatData.reduce((s, k) => s + k.summa, 0);
  const piirakkadata = menotKatData.map((k) => ({
    name: k.kategoria,
    value: k.summa,
    total: menotYhteensa,
  }));

  const btnStyle = {
    fontSize: "0.85em", padding: "4px 10px", cursor: "pointer",
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div className="page-hero">
        <h1>Yhteenveto</h1>
        <p className="page-subtitle">Tarkastele tulojasi ja menojasi valitulla aikavälillä</p>
      </div>

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

          {/* Palkkikaaviot kategorioittain */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
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

          {/* Piirakkakaavio – menojen jakauma */}
          {piirakkadata.length > 0 && (
            <div className="card" style={{ marginBottom: 16 }}>
              <h2 style={{ marginTop: 0, marginBottom: 8 }}>Menojen jakauma kategorioittain</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={piirakkadata}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                  >
                    {piirakkadata.map((_, index) => (
                      <Cell key={index} fill={PIIRAKKAVARET[index % PIIRAKKAVARET.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<PiirakkaTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      {/* Kuukausittainen trendikaavio – viimeiset 12 kk */}
      {trendiData.length > 0 && (
        <div className="card">
          <h2 style={{ marginTop: 0, marginBottom: 8 }}>Tulot ja menot – viimeiset 12 kuukautta</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendiData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tulotGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="menotGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f44336" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="kuukausi" />
              <YAxis unit=" €" />
              <Tooltip formatter={(v) => `${v.toFixed(2)} €`} />
              <Legend />
              <Area
                type="monotone"
                dataKey="Tulot"
                stroke="#4caf50"
                fill="url(#tulotGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Menot"
                stroke="#f44336"
                fill="url(#menotGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
