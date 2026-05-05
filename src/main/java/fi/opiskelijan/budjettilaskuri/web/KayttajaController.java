package fi.opiskelijan.budjettilaskuri.web;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
import fi.opiskelijan.budjettilaskuri.repository.KayttajaRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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

    @PostMapping("/api/ulosKirjautuminen")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok().build();
    }
}