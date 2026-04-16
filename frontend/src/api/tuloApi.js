const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function haeTulot() {
  const res = await fetch(`${API_BASE}/api/tulot`);
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function haeKategoriat() {
  const res = await fetch(`${API_BASE}/api/kategoriat`);
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function lisaaTulo(data) {
  const res = await fetch(`${API_BASE}/api/tulot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function poistaTulo(id) {
  const res = await fetch(`${API_BASE}/api/tulot/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
}