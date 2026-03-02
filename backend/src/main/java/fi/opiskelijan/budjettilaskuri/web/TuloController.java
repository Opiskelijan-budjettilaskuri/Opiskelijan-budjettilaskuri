package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;

@Controller
public class TuloController {

    @Autowired
    private TuloRepository tuloRepository;

    @Autowired
    private KategoriaRepository kategoriaRepository;

    @GetMapping("/tulot")
    public String listaTulot(Model model) {
        model.addAttribute("tulot", tuloRepository.findAll());
        model.addAttribute("uusiTulo", new Tulo());
        model.addAttribute("kategoriat", kategoriaRepository.findAll());
        return "lisaa-tulo";
    }

    @PostMapping("/api/tulot")
    public String lisaaTulo(@ModelAttribute Tulo tulo) {
        tuloRepository.save(tulo);
        return "redirect:/tulot";
    }

    @PostMapping("/{id}/poista")
    public String poistaTulo(@PathVariable Long id) {
        tuloRepository.deleteById(id);
        return "redirect:/tulot";
    }
}
