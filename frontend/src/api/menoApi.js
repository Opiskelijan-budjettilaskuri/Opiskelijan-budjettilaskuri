const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export async function haeMenot() {
  const res = await fetch(`${API_BASE}/api/menot`, { credentials: "include" });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function lisaaMeno(data) {
  const res = await fetch(`${API_BASE}/api/menot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function poistaMeno(id) {
  const res = await fetch(`${API_BASE}/api/menot/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
}
