package fi.opiskelijan.budjettilaskuri;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
public class KayttajaTest {
@Test
void testGetSahkoposti() {
var mattimattila = new Kayttaja("matti.mattila@gmail.com", "mattimattila", "abc010203", "+358401741870", "Vihdintie 1 A 1", "2330 4421 5167 0985", "322", "01/27");
assertEquals("matti.mattila@gmail.com", mattimattila.getSahkoposti());
}
@Test
void testGetKayttajatunnus() {
var mikkomikkola = new Kayttaja("mikko.mikkola@gmail.com", "mikkomikkola", "def040506", "+358406358646", "Mannerheimintie 2 B 2", "6298 1534 2104 7356", "364", "01/28");
assertEquals("mikkomikkola", mikkomikkola.getKayttajatunnus());
}
@Test
void testGetSalasana() {
var pekkapekkala = new Kayttaja("pekka.pekkala@gmail.com", "pekkapekkala", "ghi070809", "+358402245345", "Luutnantintie 3 C 3", "3291 5362 1078 4405", "805", "01/29");
assertEquals("ghi070809", pekkapekkala.getSalasana());
}
@Test
void testGetPuhelin() {
var heikkiheikkila = new Kayttaja("heikki.heikkila@gmail.com", "heikkiheikkila", "jkl101112", "+358408419946", "Kartanonmetsäntie 4 D 4", "1540 4630 8722 3915", "685", "01/27");
assertEquals("+358408419946", heikkiheikkila.getPuhelin());
}
@Test
void testGetOsoite() {
var jaakkojaakkola = new Kayttaja("jaakko.jaakkola@gmail.com", "jaakkojaakkola", "mno131415", "+358409800907", "Pihkatie 5 A 5", "3184 1347 9526 0205", "943", "01/28");
assertEquals("Pihkatie 5 A 5", jaakkojaakkola.getOsoite());
}
@Test
void testGetKortinnumero() {
var joukojoukola = new Kayttaja("jouko.joukola@gmail.com", "joukojoukola", "pqr161718", "+358401628146", "Kaarnatie 6 B 6", "2649 5310 3078 4125", "518", "01/29");
assertEquals("2649 5310 3078 4125", joukojoukola.getKortinnumero());
}
@Test
void testGetTurvakoodi() {
var toivotoivola = new Kayttaja("toivo.toivola@gmail.com", "toivotoivola", "stu192021", "+358404811583", "Neulastie 7 C 7", "4023 3118 2459 7605", "213", "01/27");
assertEquals("213", toivotoivola.getTurvakoodi());
}
@Test
void testGetVoimassaoloaika() {
var hannuhannula = new Kayttaja("hannu.hannula@gmail.com", "hannuhannula", "vwx222324", "+358403908061", "Tammitite 8 D 8", "8123 4943 2607 0155", "640", "01/28");
assertEquals("01/28", hannuhannula.getVoimassaoloaika());
}
}