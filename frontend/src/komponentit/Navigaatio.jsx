import { NavLink } from "react-router-dom";

// Määritellään linkin tyyli
const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: isActive ? "700" : "400", // isActive -> Onko linkki aktiivinen
});

// Navigaatio-komponentti, joka näyttää sovelluksen päävalikon
export function Navigaatio() {
  return (
    <nav
      style={{
        display: "flex",
        gap: 16,
        padding: 16,
        borderBottom: "1px solid #ddd",
      }}
    >
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
  );
}
