package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/kategoriat")
public class KategoriaRestController {

    @Autowired KategoriaRepository kategoriaRepository;

    @GetMapping
    public List<Kategoria> getAll() {
        return kategoriaRepository.findAll();
    }
    

}
