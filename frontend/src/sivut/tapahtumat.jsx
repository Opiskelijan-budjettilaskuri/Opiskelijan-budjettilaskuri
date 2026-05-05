import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { haeTulot, poistaTulo } from "../api/tuloApi";
import { haeMenot, poistaMeno } from "../api/menoApi";
import { haeToistuvat } from "../api/toistuvaApi";
import { nykyinenKuukausi } from "../utils/pvm";

const minunTeema = themeQuartz.withParams({
  spacing: 12,
  accentColor: '#7c3aed',
  headerBackgroundColor: '#f9fafb',
  headerTextColor: '#4b5563',
  rowBorder: { style: 'solid', width: 1, color: '#f3f4f6' },
  columnBorder: false,
  sidePanelBorder: false,
});

ModuleRegistry.registerModules([AllCommunityModule]);

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

  const sarakeMaaritys = useMemo(() => [
    { field: "pvm", headerName: "Päivämäärä", sortable: true, filter: true },
    { field: "tyyppi", headerName: "Tyyppi",
      cellRenderer: (params) => (
        <span className={`badge ${params.value === "Tulo" ? "badge-tulo" : "badge-meno"}`}>
          {params.value}
        </span>
      )
    },
    { field: "kuvaus", headerName: "Kuvaus", flex: 1 },
    { field: "kategoria", headerName: "Kategoria" },
    { field: "maara", headerName: "Summa (€)", type: "rightAligned",
      cellStyle: (params) => ({
        fontWeight: 600,
        color: params.data.tyyppi === "Tulo" ? "var(--success)" : "var(--danger)"
      }),
      valueFormatter: (params) => {
        const prefix = params.data.tyyppi === "Meno" ? "-" : "+";
        return `${prefix}${params.value.toFixed(2)}`;
      }
    },
    { field: "toistuvuus", headerName: "Toistuva",
      cellRenderer: (params) => params.value ? <span className="badge badge-info">{params.value}</span> : null
    },
    { headerName: "Toiminnot",
      cellRenderer: (params) => !params.data.toistuvuus ? (
        <button
          className="btn-sm btn-danger"
          onClick={() => handlePoista(params.data)}
        >
          Poista
        </button>
      ) : null
    }
  ], []);

  const naytettavat = useMemo(() =>
    tapahtumat.filter((tapahtuma) => !kuukausi || tapahtuma.toistuvuus !== null || tapahtuma.pvm.startsWith(kuukausi)),
    [tapahtumat, kuukausi]
  );

  return (
    <div style={{ textAlign: "left" }}>
      <div className="page-hero">
        <h1>Tapahtumat</h1>
        <p className="page-subtitle">Selaa ja hallinnoi kaikkia taloustapahtumiasi kuukausittain</p>
      </div>

      <div className="card">
        <div className="form-group" style={{ marginBottom: 20 }}>
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

          <div style={{ width: "100%" }}>
            <AgGridReact
              rowData={naytettavat}
              columnDefs={sarakeMaaritys}
              theme={minunTeema}
              domLayout="autoHeight"
              animateRows={true}
              pagination={true}
              paginationPageSize={15}
              paginationPageSizeSelector={[15, 30, 50, 100]}
              defaultColDef={{
                resizable: true,
                sortable: true,
                filter: true,
                flex: 1,
                minWidth: 100
              }}
              />
          </div>
        </div>
      </div>
  );
}
