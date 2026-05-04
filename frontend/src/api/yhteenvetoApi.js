const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function haeYhteenveto(alkupvm, loppupvm) {
  const params = new URLSearchParams({ alkupvm, loppupvm });
  const res = await fetch(`${API_BASE}/api/yhteenveto?${params}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}
