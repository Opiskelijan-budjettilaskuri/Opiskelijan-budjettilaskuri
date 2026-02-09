package fi.opiskelijan.budjettilaskuri.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KategoriaController {

    // GET /api/kategoriat
    @GetMapping("/api/kategoriat")
    public List<String> haeKategoriat() {
        return List.of("Ruoka", "Vuokra", "Vapaa-aika", "Vaatteet");
    }
}