package fi.opiskelijan.budjettilaskuri.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fi.opiskelijan.budjettilaskuri.domain.Meno;

// Menojen tietokantakäsittely -> Vastaa Menoihin liittyvistä kyselyistä tietokannassa
public interface MenoRepository extends JpaRepository<Meno, Long> {

    //Lasketaan menojen summa annetulta aikaväliltä
    @Query("select coalesce(sum(m.summa), 0) from Meno m where m.pvm between :alku and :loppu")
    Double sumMenotValilta(@Param("alku") LocalDate alku,
                           @Param("loppu") LocalDate loppu);
}