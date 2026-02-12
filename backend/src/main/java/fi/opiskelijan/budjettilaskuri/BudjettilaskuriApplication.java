package fi.opiskelijan.budjettilaskuri;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;

@SpringBootApplication
public class BudjettilaskuriApplication {

    public static void main(String[] args) {
        SpringApplication.run(BudjettilaskuriApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(MenoRepository menoRepo, TuloRepository tuloRepo, KategoriaRepository kategoriaRepo) {
        return args -> {
            // Meno helmikuulle 2026
            Meno meno = new Meno();
            meno.setKuvaus("Netflix");
            meno.setSumma(9.95);
            meno.setPvm(LocalDate.of(2026, 2, 5));
            menoRepo.save(meno);

            // Tulo helmikuulle 2026
            Tulo tulo = new Tulo();
            tulo.setKuvaus("Opintotuki");
            tulo.setMaara(350.0);
            tulo.setPvm(LocalDate.of(2026, 2, 1));
            tuloRepo.save(tulo);

            // Kategorioita
            Kategoria kategoria = new Kategoria();
            kategoria.setNimi("Viihde");
            kategoriaRepo.save(kategoria);

            Kategoria kategoria2 = new Kategoria();
            kategoria2.setNimi("Ruoka");
            kategoriaRepo.save(kategoria2);

            System.out.println("Testidata lisätty tietokantaan!");
        };
    }
}