package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;

@RestController
@RequestMapping("/api/menot")
public class MenoController {

    private final MenoRepository menoRepository;

    public MenoController(MenoRepository menoRepository) {
        this.menoRepository = menoRepository;
    }

    @GetMapping
    public List<Meno> getMenot() {
        return menoRepository.findAll();
    }

    @PostMapping
    public Meno lisaaMeno(@RequestBody Meno meno) {
        return menoRepository.save(meno);
    }
}