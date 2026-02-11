package fi.opiskelijan.budjettilaskuri.web;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import java.ui.Model;
@Controller
public class KategoriaController {
@GetMapping
public String kuukausittaistenmenojenSaanti(Model model) {
Model.addAttribute("kategoriakuukausi", new Kategoriakuukausi());
return "Lisääkuukausittaisiamenoja";
}
@PostMapping
public String kuukausittaistenmenojenLähetys(@ModelAttribute Kategoriakuukausi kategoriakuukausi, Model model) {
Model.addAttribute("kategoriakuukausi", kategoriakuukausi);
return "Kategoriatkuukausi";
}
@GetMapping
public String vuosittaistenmenojenSaanti(Model model) {
Model.addAttribute("kategoriavuosi", new Kategoriavuosi());
return "Lisäävuosittaisiamenoja";
}
@PostMapping
public String vuosittaistenmenojenLähetys(@ModelAttribute Kategoriavuosi kategoriavuosi, Model model) {
Model.addAttribute("kategoriavuosi", kategoriavuosi);
return "Kategoriatvuosi";
}
}
