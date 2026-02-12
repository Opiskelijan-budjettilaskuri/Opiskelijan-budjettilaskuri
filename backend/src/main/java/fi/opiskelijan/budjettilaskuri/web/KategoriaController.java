package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class KategoriaController {
    

    // GET /api/kategoriat
    @GetMapping("/api/kategoriat")
    public List<String> haeKategoriat() {
        return List.of("Ruoka", "Vuokra", "Vapaa-aika", "Vaatteet");
    }
}