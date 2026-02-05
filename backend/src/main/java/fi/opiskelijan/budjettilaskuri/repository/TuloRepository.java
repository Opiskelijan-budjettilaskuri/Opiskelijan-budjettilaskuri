package fi.opiskelijan.budjettilaskuri.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fi.opiskelijan.budjettilaskuri.domain.Tulo;

public interface TuloRepository extends JpaRepository<Tulo, Long> {
}
