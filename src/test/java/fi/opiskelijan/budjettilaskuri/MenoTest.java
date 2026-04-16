package fi.opiskelijan.budjettilaskuri;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.domain.Meno;

public class MenoTest {

    @Test
    void testSetAndGetId() {
        Meno meno = new Meno();
        Long id = 1L;

        meno.setId(id);

        assertEquals(id, meno.getId());
    }

    @Test
    void testSetAndGetKuvaus() {
        Meno meno = new Meno();
        String kuvaus = "Vuokra";

        meno.setKuvaus(kuvaus);

        assertEquals(kuvaus, meno.getKuvaus());
    }

    @Test
    void testSetAndGetSumma() {
        Meno meno = new Meno();
        Double summa = 800.0;

        meno.setSumma(summa);

        assertEquals(summa, meno.getSumma());
    }

    @Test
    void testSetAndGetPvm() {
        Meno meno = new Meno();
        LocalDate pvm = LocalDate.of(2024, 3, 15);

        meno.setPvm(pvm);

        assertEquals(pvm, meno.getPvm());
    }

    @Test
    void testSetAndGetKategoria() {
        Meno meno = new Meno();
        Kategoria kategoria = new Kategoria();
        kategoria.setNimi("Asuminen");

        meno.setKategoria(kategoria);

        assertEquals(kategoria, meno.getKategoria());
    }

    @Test
    void testDefaultValuesAreNull() {
        Meno meno = new Meno();

        assertNull(meno.getId());
        assertNull(meno.getKuvaus());
        assertNull(meno.getSumma());
        assertNull(meno.getPvm());
        assertNull(meno.getKategoria());
    }
}