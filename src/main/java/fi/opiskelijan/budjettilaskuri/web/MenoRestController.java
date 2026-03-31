package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;

@RestController
@RequestMapping("/api/menot")
public class MenoRestController {

    @Autowired
    private MenoRepository menoRepository;

    @GetMapping
    public List<Meno> getAll() {
        return menoRepository.findAll();
    }

    @PostMapping(consumes = "application/json")
    public Meno createMeno(@RequestBody Meno meno) {
        return menoRepository.save(meno);
    }
}