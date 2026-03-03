package fi.opiskelijan.budjettilaskuri.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.web.dto.KategoriaSummaDto;

// Tulojen tietokantakäsittely
public interface TuloRepository extends JpaRepository<Tulo, Long> {

    // Tulojen summa annetulta aikaväliltä
    @Query("select coalesce(sum(t.maara), 0) from Tulo t where t.pvm between :alku and :loppu")
    Double sumTulotValilta(@Param("alku") LocalDate alku,
            @Param("loppu") LocalDate loppu);

    @Query("""
            select new fi.opiskelijan.budjettilaskuri.web.dto.KategoriaSummaDto(
                case when t.kategoria is null then 'Ei kategoriaa' else t.kategoria.nimi end,
                coalesce(sum(t.maara), 0)
            )
            from Tulo t
            where t.pvm between :alku and :loppu
            group by case when t.kategoria is null then 'Ei kategoriaa' else t.kategoria.nimi end
            order by coalesce(sum(t.maara), 0) desc
            """)
    List<KategoriaSummaDto> sumTulotKategorioittain(@Param("alku") LocalDate alku,
            @Param("loppu") LocalDate loppu);
}
