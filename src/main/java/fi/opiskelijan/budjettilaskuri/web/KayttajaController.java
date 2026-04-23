package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;

@Controller
public class KayttajaController {

    private final KayttajaRepository repository;
    private final PasswordEncoder passwordEncoder;

    public KayttajaController(KayttajaRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/kirjaudu")
    public String login() {
        return "kirjaudu";
    }

    @GetMapping("/rekisteroidy")
    public String registerForm(Model model) {
        model.addAttribute("kayttaja", new Kayttaja());
        return "rekisteroidy";
    }

    @PostMapping("/tallennakayttaja")
    public String save(Kayttaja kayttaja) {
        String encodedPassword = passwordEncoder.encode(kayttaja.getPassword());
        kayttaja.setPassword(encodedPassword);
        repository.save(kayttaja);

        return "redirect:/kirjaudu";
    }
}