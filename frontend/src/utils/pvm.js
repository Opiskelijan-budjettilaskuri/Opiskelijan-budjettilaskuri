export function tanaan() {
  return new Date().toISOString().slice(0, 10);
}

export function nykyinenKuukausi() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}

export function kuunEnsimmainen(vuosi, kuukausi) {
  return `${vuosi}-${String(kuukausi).padStart(2, "0")}-01`;
}

export function kuunViimeinen(vuosi, kuukausi) {
  return new Date(vuosi, kuukausi, 0).toISOString().slice(0, 10);
}

export function tanaVuonnaAlku() {
  return `${new Date().getFullYear()}-01-01`;
}
