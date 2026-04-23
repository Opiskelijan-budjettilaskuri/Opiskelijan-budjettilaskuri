package fi.opiskelijan.budjettilaskuri.web;

import java.security.Principal;
import java.util.List;

import fi.opiskelijan.budjettilaskuri.domain.Kategoria;
import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
import fi.opiskelijan.budjettilaskuri.repository.KategoriaRepository;
import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class KategoriaController {

    private final KategoriaRepository kategoriaRepository;
    private final KayttajaRepository kayttajaRepository;

    KategoriaController(KategoriaRepository kategoriaRepository, KayttajaRepository kayttajaRepository) {
        this.kategoriaRepository = kategoriaRepository;
        this.kayttajaRepository = kayttajaRepository;
    }

    // GET kategoriat
    @GetMapping("/kategoriat")
    public String listaKategoriat(Model model, Principal principal) {
        List<Kategoria> kategoriat = kategoriaRepository.findByKayttajaUsername(principal.getName());
        model.addAttribute("kategoriat", kategoriat);
        model.addAttribute("uusiKategoria", new Kategoria());
        
        return "kategoriat";
    }

    @PostMapping("/kategoriat")
    public String lisaaKategoria(@ModelAttribute Kategoria kategoria, Principal principal) {
        Kayttaja user = kayttajaRepository.findByUsername(principal.getName());
        kategoria.setKayttaja(user);

        kategoriaRepository.save(kategoria);
        return "redirect:/kategoriat";
        
    }

    @PostMapping("/kategoriat/{id}/poista")
    public String poistaKategoria(@PathVariable Long id, Principal principal) {
        Kategoria kategoria = kategoriaRepository.findById(id).orElse(null);
        
        if (kategoria != null && kategoria.getKayttaja().getUsername().equals(principal.getName())) {
            kategoriaRepository.deleteById(id);
        }
        return "redirect:/kategoriat";
    }

}
