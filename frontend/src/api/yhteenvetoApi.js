const API_BASE = "http://localhost:8080";

export async function haeYhteenveto(kuukausi) {
  const url = kuukausi
    ? `${API_BASE}/api/yhteenveto?kuukausi=${encodeURIComponent(kuukausi)}`
    : `${API_BASE}/api/yhteenveto`;

  const res = await fetch(url);

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Virhe: ${res.status}`);
  }

  return res.json();
}