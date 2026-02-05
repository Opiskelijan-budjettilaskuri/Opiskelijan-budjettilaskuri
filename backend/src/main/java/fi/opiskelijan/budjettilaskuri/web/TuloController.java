package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;

@RestController
@RequestMapping("/api/tulot")
public class TuloController {
    
    private final TuloRepository repository;

    public TuloController(TuloRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Tulo> getAllTulot() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Tulo getTuloById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public Tulo addTulo(@RequestBody Tulo tulo) {
        return repository.save(tulo);
    }

    @PutMapping("/{id}")
    public Tulo editTulo(@PathVariable Long id,
                            @RequestBody Tulo tulo) {
        tulo.setId(id);
        return repository.save(tulo);
    }

    @DeleteMapping("/{id}")
    public void deleteTulo(@PathVariable Long id) {
        repository.deleteById(id);
    }

    
}
