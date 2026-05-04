package fi.opiskelijan.budjettilaskuri.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import fi.opiskelijan.budjettilaskuri.domain.ToistuvaTapahtuma;

public interface ToistuvaTapahtumaRepository extends JpaRepository<ToistuvaTapahtuma, Long> {

    List<ToistuvaTapahtuma> findByKayttajaUsername(String username);
}