package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import fi.opiskelijan.budjettilaskuri.domain.ToistuvaTapahtuma;
import fi.opiskelijan.budjettilaskuri.repository.ToistuvaTapahtumaRepository;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;

@Controller
public class ToistuvaTapahtumaController {

    @Autowired
    private ToistuvaTapahtumaRepository toistuvaRepository;

    @Autowired
    private KategoriaRepository kategoriaRepository;

    @GetMapping("/toistuvat")
    public String listaToistuvat(Model model) {
        model.addAttribute("toistuvat", toistuvaRepository.findAll());
        model.addAttribute("uusiToistuva", new ToistuvaTapahtuma());
        model.addAttribute("kategoriat", kategoriaRepository.findAll());
        return "lisaa-toistuva";
    }

    @PostMapping("/api/toistuvat")
    public String lisaaToistuva(@ModelAttribute ToistuvaTapahtuma toistuva) {
        toistuvaRepository.save(toistuva);
        return "redirect:/toistuvat";
    }

    @PostMapping("/toistuvat/{id}/poista")
    public String poistaToistuva(@PathVariable Long id) {
        toistuvaRepository.deleteById(id);
        return "redirect:/toistuvat";
    }
}