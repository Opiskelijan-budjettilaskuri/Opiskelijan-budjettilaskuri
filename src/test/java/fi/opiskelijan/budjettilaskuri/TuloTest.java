package fi.opiskelijan.budjettilaskuri;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.domain.Tulo;

public class TuloTest {

    @Test
    void testSetAndGetId() {
        Tulo tulo = new Tulo();
        Long id = 1L;

        tulo.setId(id);

        assertEquals(id, tulo.getId());
    }

    @Test
    void testSetAndGetKuvaus() {
        Tulo tulo = new Tulo();
        String kuvaus = "Palkka";

        tulo.setKuvaus(kuvaus);

        assertEquals(kuvaus, tulo.getKuvaus());
    }

    @Test
    void testSetAndGetMaara() {
        Tulo tulo = new Tulo();
        Double maara = 2500.0;

        tulo.setMaara(maara);

        assertEquals(maara, tulo.getMaara());
    }

    @Test
    void testSetAndGetPvm() {
        Tulo tulo = new Tulo();
        LocalDate pvm = LocalDate.of(2024, 3, 15);

        tulo.setPvm(pvm);

        assertEquals(pvm, tulo.getPvm());
    }

    @Test
    void testSetAndGetKategoria() {
        Tulo tulo = new Tulo();
        Kategoria kategoria = new Kategoria();
        kategoria.setNimi("Tulot");

        tulo.setKategoria(kategoria);

        assertEquals(kategoria, tulo.getKategoria());
    }

    @Test
    void testDefaultValuesAreNull() {
        Tulo tulo = new Tulo();

        assertNull(tulo.getId());
        assertNull(tulo.getKuvaus());
        assertNull(tulo.getMaara());
        assertNull(tulo.getPvm());
        assertNull(tulo.getKategoria());
    }
}