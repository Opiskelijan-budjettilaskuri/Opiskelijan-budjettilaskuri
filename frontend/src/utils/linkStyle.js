export const linkStyle = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: isActive ? 600 : 400,
  fontSize: "0.875rem",
  padding: "7px 12px",
  borderRadius: 8,
  color: isActive ? "#7c3aed" : "#6b7280",
  background: isActive ? "#f3e8ff" : "transparent",
  display: "flex",
  alignItems: "center",
  gap: 6,
  transition: "background 0.15s, color 0.15s",
});
