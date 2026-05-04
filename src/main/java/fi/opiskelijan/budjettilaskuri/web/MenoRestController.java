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
import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;

@RestController
@RequestMapping("/api/menot")
public class MenoRestController {

    @Autowired
    private MenoRepository menoRepository;

    @Autowired
    private KayttajaRepository kayttajaRepository;

    @GetMapping
    public List<Meno> getAll(Principal principal) {
        return menoRepository.findByKayttajaUsername(principal.getName());
    }

    @PostMapping(consumes = "application/json")
    public Meno createMeno(@RequestBody Meno meno, Principal principal) {
        Kayttaja kayttaja = kayttajaRepository.findByUsername(principal.getName());
        meno.setKayttaja(kayttaja);
        return menoRepository.save(meno);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> poistaMeno(@PathVariable Long id, Principal principal) {
        Meno meno = menoRepository.findById(id).orElse(null);
        if (meno == null) {
            return ResponseEntity.notFound().build();
        }
        // Varmista että käyttäjä omistaa tämän tapahtuman
        if (!meno.getKayttaja().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(403).build();
        }
        menoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}