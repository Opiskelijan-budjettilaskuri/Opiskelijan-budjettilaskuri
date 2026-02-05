package fi.opiskelijan.budjettilaskuri.web;

import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menot")
public class Controller {

    private final ExpenseRepository repositorio;

    public Controller(ExpenseRepository repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping
    public List<Meno> getMenot() {
        return repositorio.findAll();
    }

    @PostMapping
    public Meno lisaaMeno(@RequestBody Meno meno) {
        return repositorio.save(meno);
    }
}