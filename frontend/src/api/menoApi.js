const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function lisaaMeno(data) {
    const response = await fetch(`${API_BASE}/menot`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error((await response.text()) || `Virhe: ${res.status}`);
        return res.json();
    }