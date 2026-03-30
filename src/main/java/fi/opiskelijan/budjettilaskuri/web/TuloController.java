package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import fi.opiskelijan.budjettilaskuri.domain.Tulo;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;

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
    /* Kommentoitu pois — React-frontend käyttää TuloRestController-luokan endpointia
    @PostMapping("/api/tulot")
    public String lisaaTulo(@ModelAttribute Tulo tulo) {
        tuloRepository.save(tulo);
        return "redirect:/tulot";
    }
    */

    @PostMapping("/tulot/{id}/poista")
    public String poistaTulo(@PathVariable Long id) {
        tuloRepository.deleteById(id);
        return "redirect:/tulot";
    }
}
