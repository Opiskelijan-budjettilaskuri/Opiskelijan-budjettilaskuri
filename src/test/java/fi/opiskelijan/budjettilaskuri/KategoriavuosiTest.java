package fi.opiskelijan.budjettilaskuri;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import fi.opiskelijan.budjettilaskuri.domain.Kategoriavuosi;
public class KategoriavuosiTest {
@Test
void testGetVuosi() {
var eka = new Kategoriavuosi(2006, 7.01, 7.02, 7.03, 7.04);
assertEquals(2006, eka.getVuosi());
}
@Test
void testGetRuokavuosi() {
var toka = new Kategoriavuosi(2007, 8.01, 8.02, 8.03, 8.04);
assertEquals(8.01, toka.getRuokavuosi());
}
@Test
void testGetVuokravuosi() {
var kolmas = new Kategoriavuosi(2008, 9.01, 9.02, 9.03, 9.04);
assertEquals(9.02, kolmas.getVuokravuosi());
}
@Test
void testGetVapaaaikavuosi() {
var neljas = new Kategoriavuosi(2009, 10.01, 10.02, 10.03, 10.04);
assertEquals(10.03, neljas.getVapaaaikavuosi());
}
@Test
void testGetVaatteetvuosi() {
var viides = new Kategoriavuosi(2010, 11.01, 11.02, 11.03, 11.04);
assertEquals(11.04, viides.getVaatteetvuosi());
}
}