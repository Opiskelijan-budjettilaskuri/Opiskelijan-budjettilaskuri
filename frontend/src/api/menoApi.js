const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function haeMenot() {
  const res = await fetch(`${API_BASE}/api/menot`);
  if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
  return res.json();
}

export async function lisaaMeno(data) {
    const response = await fetch(`${API_BASE}/api/menot`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error((await response.text()) || `Virhe: ${response.status}`);
    return response.json();
}

export async function poistaMeno(id) {
    const res = await fetch(`${API_BASE}/api/menot/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error((await res.text()) || `Virhe: ${res.status}`);
}