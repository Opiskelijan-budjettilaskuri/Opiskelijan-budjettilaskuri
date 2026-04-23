package fi.opiskelijan.budjettilaskuri.repository;

import org.springframework.data.repository.CrudRepository;
import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;

public interface KayttajaRepository extends CrudRepository<Kayttaja, Long> {
    Kayttaja findByUsername(String username);
}
