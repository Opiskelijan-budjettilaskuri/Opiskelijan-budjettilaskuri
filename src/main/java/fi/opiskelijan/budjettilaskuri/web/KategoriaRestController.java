package fi.opiskelijan.budjettilaskuri.web;

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

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;


@RestController
@RequestMapping("/api/kategoriat")
public class KategoriaRestController {

    @Autowired KategoriaRepository kategoriaRepository;

    @GetMapping
    public List<Kategoria> getAll() {
        return kategoriaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Kategoria> lisaaKategoria(@RequestBody Kategoria kategoria) {
        Kategoria tallennettu = kategoriaRepository.save(kategoria);
        return ResponseEntity.status(201).body(tallennettu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> poistaKategoria(@PathVariable Long id) {
        kategoriaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
