package fi.opiskelijan.budjettilaskuri;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import fi.opiskelijan.budjettilaskuri.domain.ToistuvaTapahtuma;
import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import java.time.LocalDate;
public class ToistuvaTapahtumaTest {
@Test
void testGetId() {
var pastaruoka = new ToistuvaTapahtuma(1, "Lasagnen aineksien ostaminen", 12.01, "Pastaruoka", "Päivittäinen", 2000, 1, 1, 2000, 11, 1, 2000, 6, 1, true, 1);
assertEquals(1, pastaruoka.getId());
}
@Test
void testGetKuvaus() {
var ulkovaatteet = new ToistuvaTapahtuma(2, "Talvitakin ostaminen", 13.01, "Ulkovaatteet", "Viikottainen", 2001, 1, 2, 2001, 11, 2, 2001, 6, 2, false, 2);
assertEquals("Talvitakin ostaminen", ulkovaatteet.getKuvaus());
}
@Test
void testGetSumma() {
var fyysinen = new ToistuvaTapahtuma(3, "Asunnon vuokraaminen", 14.01, "Fyysinen vuokraaminen", "Kuukausittainen", 2002, 1, 3, 2002, 11, 3, 2002, 6, 3, true, 3);
assertEquals(14.01, fyysinen.getSumma());
}
@Test
void testGetTyyppi() {
var liikunta = new ToistuvaTapahtuma(4, "Futistreenit", 15.01, "Liikunta", "Vuosittainen", 2003, 1, 4, 2003, 11, 4, 2003, 6, 4, false, 4);
assertEquals("Liikunta", liikunta.getTyyppi());
}
@Test
void testGetToistuvuus() {
var perunaruoka = new ToistuvaTapahtuma(5, "Kinkkukiusauksen aineksien ostaminen", 16.01, "Perunaruoka", "Päivittäinen", 2004, 1, 5, 2004, 11, 5, 2004, 6, 5, true, 1);
assertEquals("Päivittäinen", perunaruoka.getToistuvuus());
}
@Test
void testGetAloitusPvm() {
var urheiluvaatteet = new ToistuvaTapahtuma(6, "Verkkarien ostaminen", 17.01, "Urheiluvaatteet", "Viikottainen", 2005, 1, 6, 2005, 11, 6, 2005, 6, 6, false, 2);
assertEquals(LocalDate.of(2005, 1, 6), urheiluvaatteet.getAloitusPvm());
}
@Test
void testGetLopetusPvm() {
var some = new ToistuvaTapahtuma(7, "YouTube-elokuvan vuokraaminen", 18.01, "Sosiaalisessa mediassa tapahtuva vuokraaminen", "Kuukausittainen", 2006, 1, 7, 2006, 11, 7, 2006, 6, 7, true, 3);
assertEquals(LocalDate.of(2006, 11, 7), some.getLopetusPvm());
}
@Test
void testGetViimeksiLuotuPvm() {
var viihde = new ToistuvaTapahtuma(8, "Videopelin ostaminen", 19.01, "Viihde", "Vuosittainen", 2007, 1, 8, 2007, 11, 8, 2007, 6, 8, false, 4);
assertEquals(LocalDate.of(2007, 6, 8), viihde.getViimeksiLuotuPvm());
}
@Test
void testGetAktiivinen() {
var riisiruoka = new ToistuvaTapahtuma(9, "Chili con carnen aineksien ostaminen", 20.01, "Riisiruoka", "Päivittäinen", 2008, 1, 9, 2008, 11, 9, 2008, 6, 9, true, 1);
assertEquals(true, riisiruoka.getAktiivinen());
}
@Test
void testGetKategoria() {
var alusvaatteet = new ToistuvaTapahtuma(10, "Alushousujen ostaminen", 21.11, "Alusvaatteet", "Viikottainen", 2009, 1, 10, 2009, 11, 10, 2009, 6, 10, false, 2);
assertEquals(2, alusvaatteet.getKategoria().getId());
}
}