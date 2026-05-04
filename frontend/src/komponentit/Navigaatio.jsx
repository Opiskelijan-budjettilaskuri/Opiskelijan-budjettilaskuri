import { NavLink } from "react-router-dom";
import { linkStyle } from "../utils/linkStyle";

const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconList = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const IconRepeat = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

export function Navigaatio() {
  return (
    <header style={{
      background: "#ffffff",
      borderBottom: "1px solid #e9d5ff",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 8px rgba(124, 58, 237, 0.07)",
    }}>
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "0 24px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}>
        <div style={{
          fontWeight: 800,
          fontSize: "1.1rem",
          color: "#7c3aed",
          letterSpacing: "-0.01em",
        }}>
          Budjettilaskuri
        </div>

        <nav style={{ display: "flex", gap: 2 }}>
          <NavLink to="/" end style={linkStyle}><IconHome /> Yhteenveto</NavLink>
          <NavLink to="/tapahtumat" style={linkStyle}><IconList /> Tapahtumat</NavLink>
          <NavLink to="/lisaa-tapahtuma" style={linkStyle}><IconPlus /> Lisää tapahtuma</NavLink>
          <NavLink to="/toistuvat" style={linkStyle}><IconRepeat /> Toistuvat</NavLink>
        </nav>
      </div>
    </header>
  );
}
