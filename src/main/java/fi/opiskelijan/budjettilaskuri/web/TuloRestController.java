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

import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;

@RestController
@RequestMapping("/api/tulot")
public class TuloRestController {

    @Autowired
    private TuloRepository tuloRepository;

    @GetMapping
    public List<Tulo> getAll() {
        return tuloRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Tulo> lisaaTulo(@RequestBody Tulo tulo) {
        Tulo tallennettu = tuloRepository.save(tulo);
        return ResponseEntity.status(201).body(tallennettu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> poistaTulo(@PathVariable Long id) {
        if (!tuloRepository.existsById(id)) return ResponseEntity.notFound().build();
        tuloRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}