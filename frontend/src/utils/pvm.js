export function tanaan() {
  return new Date().toISOString().slice(0, 10);
}

export function nykyinenKuukausi() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}`;
}
