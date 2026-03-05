package fi.opiskelijan.budjettilaskuri.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;


public interface KategoriaRepository extends JpaRepository<Kategoria, Long> {
    
}
