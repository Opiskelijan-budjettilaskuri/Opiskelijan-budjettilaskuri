import { useState, useEffect, useMemo} from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from "ag-grid-community";
import { haeToistuvat, poistaToistuva, vaihdaAktiivinen } from "../api/toistuvaApi";

ModuleRegistry.registerModules([AllCommunityModule]);

const minunTeema = themeQuartz.withParams({
  spacing: 11,
  accentColor: '#7c3aed',
  headerBackgroundColor: '#ffffff',
  headerTextColor: '#4b5563',
  rowBorder: { style: 'solid', width: 1, color: '#f3f4f6' },
  wrapperBorder: false,
  headerRowBorder: false,
  headerColumnBorder: false,
  columnBorder: false,
  sidePanelBorder: false,
});

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

  const sarakeMaaritys = useMemo(() => [
    { field: "kuvaus", width: 110,headerName: "Kuvaus", headerTooltip: "Kuvaus" },
    { field: "tyyppi", width: 105, headerName: "Tyyppi", headerTooltip: "Tyyppi", cellRenderer: (params) => (
      <span className={`badge ${params.value === "Tulo" ? "badge-tulo" : "badge-meno"}`}>
        {params.value === "tulo" ? "Tulo" : "Meno"}
      </span>
      )
    },
    { field: "summa", width: 110, headerName: "Summa (€)", headerTooltip: "Summa (€)",
      valueGetter: (params) => params.data.tyyppi === "meno" ? -params.data.summa : params.data.summa,
      valueFormatter: (params) => {
        if (params.value == null) return "";
        const etumerkki = params.value > 0 ? "+" : "";
        return `${etumerkki}${params.value.toFixed(2)} €`;
      },
      cellStyle: (params) => ({
        fontWeight: 600,
        color: params.value > 0 ? "var(--success)" : "var(--danger)"
      })
    },
    { field: "toistuvuus", width: 110,headerName: "Toistuva", headerTooltip: "Toistuva" },
    { field: "aloitusPvm", width: 100,headerName: "Alku", headerTooltip: "Alku" },
    { field: "lopetusPvm", width: 100, headerName: "Loppu", headerTooltip: "Loppu" },
    { field: "kategoria.nimi", width: 120, headerName: "Kategoria", headerTooltip: "Kategoria" },
    { field: "aktiivinen", width: 100, headerName: "Tila", headerTooltip: "Tila", cellRenderer: (params) => (
      <span className={`badge ${params.value ? "badge-active" : "badge-inactive"}`}>
        {params.value ? "Aktiivinen" : "Ei aktiivinen"}
      </span>
      )
    },
    { headerName: "", filter: false, sortable: false, menuTabs: [],width: 220, suppressSizeToFit: true, cellRenderer: (params) => (
      <div style={{ gap: 8, alignItems: "center", height: "100%", padding: "0 8px", display: "flex" }}>
        <button
          className="btn-sm"
          onClick={() => handleVaihdaAktiivinen(params.data.id)}
        >
          {params.data.aktiivinen ? "Poista käytöstä" : "Ota käyttöön"}
        </button>
        <button
          className="btn-sm btn-danger"
          onClick={() => handlePoista(params.data.id)}
        >
          Poista
        </button>
      </div>
      )
    }
  ], []);

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

        {!lataa && !virhe && toistuvat.length === 0 ? (
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
        ) : (
          <div style={{ width: "100%" }}>
            <AgGridReact
              rowData={toistuvat}
              columnDefs={sarakeMaaritys}
              theme={minunTeema}
              domLayout="autoHeight"
              pagination={true}
              paginationPageSize={15}
              suppressPaginationPanel={toistuvat.length <= 15}
              rowClassRules={{
                "toistuva-epaaktiivinen": (params) => !params.data.aktiivinen
              }}
              defaultColDef={{
                resizable: false,
                sortable: true,
                filter: true,
                tooltipShowDelay: 100,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
