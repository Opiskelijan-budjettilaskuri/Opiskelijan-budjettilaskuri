/**
 * Palauttaa nykyisen kuukauden muodossa "YYYY-MM" (esim. "2026-04").
 */
export function nykyinenKuukausi() {
  const nyt = new Date();
  const vuosi = nyt.getFullYear();
  const kuukausi = String(nyt.getMonth() + 1).padStart(2, "0");
  return `${vuosi}-${kuukausi}`;
}
