package fi.opiskelijan.budjettilaskuri.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(MenoRepository menoRepo, TuloRepository tuloRepo, KategoriaRepository kategoriaRepo) {
        return args -> {

            if (kategoriaRepo.count() > 0 || menoRepo.count() > 0 || tuloRepo.count() > 0) {
                System.out.println("Tietokanta ei ole tyhjä, testidataa ei lisätty.");
                return;
            }

            else {
                // Kategorioita
                Kategoria kategoria = new Kategoria();
                kategoria.setNimi("Viihde");
                kategoriaRepo.save(kategoria);

                Kategoria kategoria2 = new Kategoria();
                kategoria2.setNimi("Ruoka");
                kategoriaRepo.save(kategoria2);

                // Meno helmikuulle 2026
                Meno meno = new Meno();
                meno.setKuvaus("Netflix");
                meno.setSumma(9.95);
                meno.setPvm(LocalDate.of(2026, 2, 5));
                meno.setKategoria(kategoria);
                menoRepo.save(meno);

                // Tulo helmikuulle 2026
                Tulo tulo = new Tulo();
                tulo.setKuvaus("Opintotuki");
                tulo.setMaara(350.0);
                tulo.setPvm(LocalDate.of(2026, 2, 1));
                tuloRepo.save(tulo);

                System.out.println("Testidata lisätty tietokantaan!");
            }            
        };
    }
}
