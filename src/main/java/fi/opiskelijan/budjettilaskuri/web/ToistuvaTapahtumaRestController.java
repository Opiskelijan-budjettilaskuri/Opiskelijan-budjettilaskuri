package fi.opiskelijan.budjettilaskuri.web;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import fi.opiskelijan.budjettilaskuri.domain.ToistuvaTapahtuma;
import fi.opiskelijan.budjettilaskuri.repository.ToistuvaTapahtumaRepository;

@RestController
@RequestMapping("/api/toistuvat")
public class ToistuvaTapahtumaRestController {

    @Autowired
    private ToistuvaTapahtumaRepository toistuvaRepository;

    @GetMapping
    public Iterable<ToistuvaTapahtuma> getAll() {
        return toistuvaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ToistuvaTapahtuma> lisaaToistuva(@RequestBody ToistuvaTapahtuma toistuva) {
        toistuva.setViimeksiLuotuPvm(LocalDate.now());
        toistuva.setAktiivinen(true);
        return ResponseEntity.status(201).body(toistuvaRepository.save(toistuva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> poistaToistuva(@PathVariable Long id) {
        if (!toistuvaRepository.existsById(id)) return ResponseEntity.notFound().build();
        toistuvaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    @PatchMapping("/{id}/aktiivinen")
    public ResponseEntity<ToistuvaTapahtuma> vaihdaAktiivinen(@PathVariable Long id) {
        return toistuvaRepository.findById(id)
            .map(t -> {
                t.setAktiivinen(!t.isAktiivinen());
                return ResponseEntity.ok(toistuvaRepository.save(t));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
