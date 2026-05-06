const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export async function haeYhteenveto(alkupvm, loppupvm) {
  const params = new URLSearchParams({ alkupvm, loppupvm });
  const res = await fetch(`${API_BASE}/api/yhteenveto?${params}`, {
    credentials: "include",
  });
  
  const contentType = res.headers.get("content-type");
  if (!contentType || contentType.indexOf("application/json") === -1) {
    console.error("Virhe: Palvelin palautti HTML-koodia JSON-datan sijasta.")
  }
  return res.json();
}
