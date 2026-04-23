package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import java.security.Principal;

import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.domain.Kategoriakuukausi;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;
import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;

@Controller
public class MenoController {

    @Autowired
    private MenoRepository menoRepository;

    @Autowired
    private KategoriaRepository kategoriaRepository;

    @Autowired
    private KayttajaRepository kayttajaRepository;

    @GetMapping("/menot")
    public String listaMenot(Model model, Principal principal) {
        String username = principal.getName();

        model.addAttribute("menot", menoRepository.findByKayttajaUsername(username));
        
        model.addAttribute("kategoriat", kategoriaRepository.findByKayttajaUsername(username));
        
        model.addAttribute("uusiMeno", new Meno());
        
        return "lisaa-meno";
    }

    @PostMapping("/menot")
    public String lisaaMeno(@ModelAttribute Meno meno, Principal principal) {
        Kayttaja kayttaja = kayttajaRepository.findByUsername(principal.getName());

        meno.setKayttaja(kayttaja);

        menoRepository.save(meno);
        return "redirect:/menot";
    }

    @PostMapping("/menot/{id}/poista")
    public String poistaMeno(@PathVariable Long id, Principal principal) {
        Meno meno = menoRepository.findById(id).orElse(null);
        if (meno != null && meno.getKayttaja().getUsername().equals(principal.getName())) {
                    menoRepository.deleteById(id);
                }
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
