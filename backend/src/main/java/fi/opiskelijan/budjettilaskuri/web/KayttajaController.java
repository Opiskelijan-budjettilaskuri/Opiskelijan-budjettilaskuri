package fi.opiskelijan.budjettilaskuri.web;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import fi.opiskelijan.budjettilaskuri.domain.Kayttaja;
import java.util.HashMap;
import java.util.Map;
@Controller
public class KayttajaController {
@GetMapping("/vastaanotatiedot")
public String getKayttaja(Model model) {
model.addAttribute("kayttaja", new Kayttaja());
return "rekisteroidy";
}
@PostMapping("/tarkistatiedot")
public String setKayttaja(@ModelAttribute Kayttaja kayttaja, Model model) {
model.addAttribute("kayttaja", kayttaja);
return "hyvaksytaihylkaa";
}
@GetMapping("/vastaanotahyvaksytyttiedot")
public String getHyvaksytytTiedot(Model model) {
model.addAttribute("hyvaksytty", new Kayttaja());
return "hyvaksytaihylkaa";
}
@PostMapping("/vahvistuskoodi")
public String setHyvaksytytTiedot(@ModelAttribute Kayttaja hyvaksytty, Model model) {
model.addAttribute("hyvaksytty", hyvaksytty);
return "vahvistuskoodi";
}
@GetMapping("/vastaanotahylatyttiedot")
public String getHylatytTiedot(Model model) {
model.addAttribute("hylatty", new Kayttaja());
return "hyvaksytaihylkaa";
}
@PostMapping("/tiedoteikelpaa")
public String setHylatytTiedot(@ModelAttribute Kayttaja hylatty, Model model) {
model.addAttribute("hylatty", hylatty);
return "rekisteroidyvirhe";
}
@GetMapping("/vastaanotakirjautumistiedot")
public String getKirjautumisTiedot(Model model) {
model.addAttribute("kirjautunut", new Kayttaja());
return "kirjaudusisaan";
}
@PostMapping("/tarkistakirjautumistiedot")
public String setKirjautumistiedot(@ModelAttribute Kayttaja kirjautunut, Model model) {
model.addAttribute("kirjautunut", kirjautunut);
if (kayttajat.get(sahkoposti).equals(kayttajat.get(salasana))) {
return "kirjaudusisaanvirhe";
} else {
return "index";
}
}
}