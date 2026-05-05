import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import { haeTulot, poistaTulo } from "../api/tuloApi";
import { haeMenot, poistaMeno } from "../api/menoApi";
import { haeToistuvat } from "../api/toistuvaApi";
import { nykyinenKuukausi } from "../utils/pvm";

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
    { field: "pvm", headerName: "Päivämäärä", flex: 1.2, headerTooltip: "Päivämäärä" },
    { field: "tyyppi", headerName: "Tyyppi", headerTooltip: "Tyyppi",
      cellRenderer: (params) => (
        <span className={`badge ${params.value === "Tulo" ? "badge-tulo" : "badge-meno"}`}>
          {params.value}
        </span>
      )
    },
    { field: "kuvaus", headerName: "Kuvaus", flex: 1, headerTooltip: "Kuvaus" },
    { field: "kategoria", headerName: "Kategoria", headerTooltip: "Kategoria" },
    { field: "maara", headerName: "Summa (€)", headerTooltip: "Summa (€)",
      valueGetter: (params) => {
        const arvo = params.data.maara;
        return params.data.tyyppi === "Meno" ? -arvo : arvo;
      },
      valueFormatter: (params) => {
        if (params.value == null) return "";
        const etumerkki = params.value > 0 ? "+" : "";
        return `${etumerkki}${params.value.toFixed(2)} €`;
      },
      cellStyle: (params) => ({
        fontWeight: 600,
        color: params.data.tyyppi === "Tulo" ? "var(--success)" : "var(--danger)"
      }),
      
    },
    { field: "toistuvuus", headerName: "Toistuva", headerTooltip: "Toistuva",
      cellRenderer: (params) => params.value ? <span className="badge badge-info">{params.value}</span> : null
    },
    { headerName: "", filter: false,
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

        {naytettavat.length === 0 && !lataa && !virhe ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-icon lucide-list"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>
            <p className="empty-state-title">Ei tapahtumia</p>
            <p className="empty-state-desc">Lisää tapahtumia Lisää tapahtuma -sivulta.</p>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <AgGridReact
              rowData={naytettavat}
              columnDefs={sarakeMaaritys}
              theme={minunTeema}
              domLayout="autoHeight"
              animateRows={true}
              pagination={true}
              paginationPageSize={15}
              suppressPaginationPanel={naytettavat.length <= 15}
              defaultColDef={{
                resizable: false,
                sortable: false,
                filter: true,
                tooltipShowDelay: 100,
                flex: 1,
                minWidth: 100
              }}
              />
          </div>
        )}
        </div>
      </div>
  );
}
