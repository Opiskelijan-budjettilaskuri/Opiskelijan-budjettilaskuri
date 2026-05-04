const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function haeToistuvat() {
  const res = await fetch(`${API_BASE}/api/toistuvat`, { credentials: "include" });
  if (!res.ok) throw new Error(`Virhe: ${res.status}`);
  return res.json();
}

export async function lisaaToistuva(data) {
  const res = await fetch(`${API_BASE}/api/toistuvat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Virhe: ${res.status}`);
  return res.json();
}

export async function poistaToistuva(id) {
  const res = await fetch(`${API_BASE}/api/toistuvat/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Virhe: ${res.status}`);
}

export async function vaihdaAktiivinen(id) {
  const res = await fetch(`${API_BASE}/api/toistuvat/${id}/aktiivinen`, {
    method: "PATCH",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Virhe: ${res.status}`);
  return res.json();
}
