package fi.opiskelijan.budjettilaskuri.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fi.opiskelijan.budjettilaskuri.domain.Tulo;

// Tulojen tietokantakäsittely
public interface TuloRepository extends JpaRepository<Tulo, Long> {

    // Tulojen summa annetulta aikaväliltä
    @Query("select coalesce(sum(t.maara), 0) from Tulo t where t.pvm between :alku and :loppu")
    Double sumTulotValilta(@Param("alku") LocalDate alku,
                            @Param("loppu") LocalDate loppu);
}
