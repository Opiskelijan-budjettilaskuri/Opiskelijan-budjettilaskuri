package fi.opiskelijan.budjettilaskuri;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
public class KategoriaTest {
@Test
void testGetId() {
var ruoka = new Kategoria(1L, "Ruoka");
assertEquals(1, ruoka.getId());
}
@Test
void testGetNimi() {
var vaatteet = new Kategoria(2L, "Vaatteet");
assertEquals("Vaatteet", vaatteet.getNimi());
}
}