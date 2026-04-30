package fi.opiskelijan.budjettilaskuri.web;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
import fi.opiskelijan.budjettilaskuri.domain.ToistuvaTapahtuma;
import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;
import fi.opiskelijan.budjettilaskuri.repository.ToistuvaTapahtumaRepository;

@RestController
@RequestMapping("/api/toistuvat")
public class ToistuvaTapahtumaRestController {

    @Autowired
    private ToistuvaTapahtumaRepository toistuvaRepository;
     
    @Autowired
    private KayttajaRepository kayttajaRepository;

    @GetMapping
    public List<ToistuvaTapahtuma> getAll(Principal principal) {
        return toistuvaRepository.findByKayttajaUsername(principal.getName());
    }

    @PostMapping
    public ResponseEntity<ToistuvaTapahtuma> lisaaToistuva(@RequestBody ToistuvaTapahtuma toistuva, Principal principal) {
        Kayttaja kayttaja = kayttajaRepository.findByUsername(principal.getName());
        toistuva.setKayttaja(kayttaja);
        toistuva.setViimeksiLuotuPvm(LocalDate.now());
        toistuva.setAktiivinen(true);
        return ResponseEntity.status(201).body(toistuvaRepository.save(toistuva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> poistaToistuva(@PathVariable Long id, Principal principal) {
        ToistuvaTapahtuma toistuva = toistuvaRepository.findById(id).orElse(null);
        if (toistuva == null) {
            return ResponseEntity.notFound().build();
        }
        // Varmista että käyttäjä omistaa tämän tapahtuman
        if (!toistuva.getKayttaja().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(403).build();
        }
        toistuvaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    @PatchMapping("/{id}/aktiivinen")
    public ResponseEntity<ToistuvaTapahtuma> vaihdaAktiivinen(@PathVariable Long id, Principal principal) {
        return toistuvaRepository.findById(id)
            .filter(t -> t.getKayttaja().getUsername().equals(principal.getName()))
            .map(t -> {
                t.setAktiivinen(!t.isAktiivinen());
                return ResponseEntity.ok(toistuvaRepository.save(t));
            })
            .orElse(ResponseEntity.notFound().build());
}
}
