package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.domain.Kategoriakuukausi;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;

@Controller
public class MenoController {

    @Autowired
    private MenoRepository menoRepository;

    @Autowired
    private KategoriaRepository kategoriaRepository;

    @GetMapping("/menot")
    public String listaMenot(Model model) {
        model.addAttribute("menot", menoRepository.findAll());
        model.addAttribute("uusiMeno", new Meno());
        model.addAttribute("kategoriat", kategoriaRepository.findAll());
        return "lisaa-meno";
    }

    @PostMapping("/menot")
    public String lisaaMeno(@ModelAttribute Meno meno) {
        menoRepository.save(meno);
        return "redirect:/menot";
    }

    @PostMapping("/menot/{id}/poista")
    public String poistaMeno(@PathVariable Long id) {
        menoRepository.deleteById(id);
        return "redirect:/menot";
    }

    @GetMapping("/lisaakuukausittaisetmenot")
    public String getKuukausittaisetmenot(Model model) {
        model.addAttribute("kategoriakuukausi", new Kategoriakuukausi());
        return "Lisääkuukausittaisiamenoja";
    }

    @PostMapping("/tallennakuukausittaisetmenot")
    public String setKuukausittaisetmenot(@ModelAttribute Kategoriakuukausi kategoriakuukausi, Model model) {
        model.addAttribute("kategoriakuukausi", new Kategoriakuukausi());
        return "Kategoriakuukausi";
    }
}
