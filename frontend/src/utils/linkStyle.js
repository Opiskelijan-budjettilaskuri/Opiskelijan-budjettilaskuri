export const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
  padding: "8px 10px",
  borderRadius: 8,
  background: isActive ? "#eef2ff" : "transparent",
});
