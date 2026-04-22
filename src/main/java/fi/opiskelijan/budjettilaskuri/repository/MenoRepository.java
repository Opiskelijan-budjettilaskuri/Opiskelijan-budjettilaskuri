package fi.opiskelijan.budjettilaskuri.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.web.dto.KategoriaSummaDto;

// Menojen tietokantakäsittely -> Vastaa Menoihin liittyvistä kyselyistä tietokannassa
public interface MenoRepository extends JpaRepository<Meno, Long> {

    List<Meno> findByKayttajaUsername(String username);

    @Query("select coalesce(sum(m.summa), 0) from Meno m where m.kayttaja.username = :username and m.pvm between :alku and :loppu")
    Double sumMenotValilta(
        @Param("username") String username,
        @Param("alku") LocalDate alku,
        @Param("loppu") LocalDate loppu);

    @Query("""
            select new fi.opiskelijan.budjettilaskuri.web.dto.KategoriaSummaDto(
                case when m.kategoria is null then 'Ei kategoriaa' else m.kategoria.nimi end,
                coalesce(sum(m.summa), 0)
            )
            from Meno m
            where m.kayttaja.username = :username
            and m.pvm between :alku and :loppu
            group by case when m.kategoria is null then 'Ei kategoriaa' else m.kategoria.nimi end
            order by coalesce(sum(m.summa), 0) desc
            """)
        List<KategoriaSummaDto> sumMenotKategorioittain(
            @Param("username") String username,
            @Param("alku") LocalDate alku,
            @Param("loppu") LocalDate loppu
        );
}
