package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class KategoriaController {

    private final KategoriaRepository kategoriaRepository;

    KategoriaController(KategoriaRepository kategoriaRepository) {
        this.kategoriaRepository = kategoriaRepository;
    }

    // GET kategoriat
    @GetMapping("/kategoriat")
    public String listaKategoriat(Model model) {
        List<Kategoria> kategoriat = kategoriaRepository.findAll();
        model.addAttribute("kategoriat", kategoriat);
        return "kategoriat";
    }

    @PostMapping("/api/kategoriat")
    public String lisaaKategoria(@RequestBody Kategoria kategoria) {
        kategoriaRepository.save(kategoria);
        return "redirect:/kategoriat";
        
    }
    
}