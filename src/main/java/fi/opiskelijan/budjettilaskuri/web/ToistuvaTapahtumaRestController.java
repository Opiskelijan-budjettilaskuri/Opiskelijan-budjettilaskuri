package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.beans.factory.annotation.Autowired;
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
}
