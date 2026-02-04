package fi.opiskelijan.budjettilaskuri.web;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
@Controller
public class KategoriaController {
@GetMapping
public String () {

return "Lisäämenoja";
}
@PostMapping
public String () {

return "Kategoriat";
}
}