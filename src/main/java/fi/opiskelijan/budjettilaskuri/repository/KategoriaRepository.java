package fi.opiskelijan.budjettilaskuri.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;


public interface KategoriaRepository extends JpaRepository<Kategoria, Long> {
    List<Kategoria> findByKayttajaUsername(String username);
}
