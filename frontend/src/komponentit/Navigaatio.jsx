import { NavLink } from "react-router-dom";

export const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
  padding: "8px 10px",
  borderRadius: 8,
  background: isActive ? "#eef2ff" : "transparent",// isActive -> Onko linkki aktiivinen
});

// Navigaatio-komponentti, navigoi sivujen välillä, näkyy kaikilla sivuilla
export function Navigaatio() {
  return (
    <header style={{ background: "white", borderBottom: "1px solid #e6e6e6" }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ fontWeight: 800 }}>Budjettilaskuri</div>

        <nav style={{ display: "flex", gap: 8 }}>
          <NavLink to="/" style={linkStyle}>
            Yhteenveto
          </NavLink>
          <NavLink to="/tapahtumat" style={linkStyle}>
            Tapahtumat
          </NavLink>
          <NavLink to="/lisaa-tapahtuma" style={linkStyle}>
            Lisää tapahtuma
          </NavLink>
        </nav>
      </div>
    </header>
  );
}