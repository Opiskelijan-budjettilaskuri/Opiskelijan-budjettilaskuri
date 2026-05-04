const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function haeTulot() {
  const res = await fetch(`${API_BASE}/api/tulot`, { credentials: "include" });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function haeKategoriat() {
  const res = await fetch(`${API_BASE}/api/kategoriat`, { credentials: "include" });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function lisaaKategoria(nimi) {
  const res = await fetch(`${API_BASE}/api/kategoriat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ nimi }),
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function poistaKategoria(id) {
  const res = await fetch(`${API_BASE}/api/kategoriat/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
}

export async function lisaaTulo(data) {
  const res = await fetch(`${API_BASE}/api/tulot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function poistaTulo(id) {
  const res = await fetch(`${API_BASE}/api/tulot/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
}
