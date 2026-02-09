package fi.opiskelijan.budjettilaskuri.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fi.opiskelijan.budjettilaskuri.domain.Meno;

public interface MenoRepository extends JpaRepository<Meno, Long> {
}