package fi.opiskelijan.budjettilaskuri.web;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;

@RestController
@RequestMapping("/api/tulot")
public class TuloRestController {

    @Autowired
    private TuloRepository tuloRepository;

    @Autowired
    private KayttajaRepository kayttajaRepository;

    @GetMapping
    public List<Tulo> getAll(Principal principal) {
        return tuloRepository.findByKayttajaUsername(principal.getName());
    }

    @PostMapping
    public ResponseEntity<Tulo> lisaaTulo(@RequestBody Tulo tulo, Principal principal) {
        Kayttaja kayttaja = kayttajaRepository.findByUsername(principal.getName());
        tulo.setKayttaja(kayttaja);
        Tulo tallennettu = tuloRepository.save(tulo);
        return ResponseEntity.status(201).body(tallennettu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> poistaTulo(@PathVariable Long id, Principal principal) {
        Tulo tulo = tuloRepository.findById(id).orElse(null);
        if (tulo == null) {
            return ResponseEntity.notFound().build();
        }
        // Verify user owns this record
        if (!tulo.getKayttaja().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(403).build();
        }
        tuloRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}