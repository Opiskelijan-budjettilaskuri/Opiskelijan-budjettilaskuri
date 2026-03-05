package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import fi.opiskelijan.budjettilaskuri.domain.Meno;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}