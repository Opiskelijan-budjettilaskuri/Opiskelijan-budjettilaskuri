package fi.opiskelijan.budjettilaskuri;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import fi.opiskelijan.budjettilaskuri.domain.Kategoriakuukausi;
public class KategoriakuukausiTest {
@Test
void testGetVuosi() {
var eka = new Kategoriakuukausi(2000, "Tammikuu", 1.01, 1.02, 1.03, 1.04);
assertEquals(2000, eka.getVuosi());
}
@Test
void testGetKuukausi() {
var toka = new Kategoriakuukausi(2001, "Helmikuu", 2.01, 2.02, 2.03, 2.04);
assertEquals("Helmikuu", toka.getKuukausi());
}
@Test
void testGetRuokakuukausi() {
var kolmas = new Kategoriakuukausi(2002, "Maaliskuu", 3.01, 3.02, 3.03, 3.04);
assertEquals(3.01, kolmas.getRuokakuukausi());
}
@Test
void testGetVuokrakuukausi() {
var neljas = new Kategoriakuukausi(2003, "Huhtikuu", 4.01, 4.02, 4.03, 4.04);
assertEquals(4.02, neljas.getVuokrakuukausi());
}
@Test
void testGetVapaaaikakuukausi() {
var viides = new Kategoriakuukausi(2004, "Toukokuu", 5.01, 5.02, 5.03, 5.04);
assertEquals(5.03, viides.getVapaaaikakuukausi());
}
@Test
void testGetVaatteetkuukausi() {
var kuudes = new Kategoriakuukausi(2005, "Kesäkuu", 6.01, 6.02, 6.03, 6.04);
assertEquals(6.04, kuudes.getVaatteetkuukausi());
}
}