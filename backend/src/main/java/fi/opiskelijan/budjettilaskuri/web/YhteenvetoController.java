package fi.opiskelijan.budjettilaskuri.web;

import java.time.LocalDate;
import java.time.YearMonth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;
import fi.opiskelijan.budjettilaskuri.web.dto.YhteenvetoDto;


@RestController
@RequestMapping("/api/yhteenveto")
public class YhteenvetoController {
    
    private final TuloRepository tuloRepository;
    private final MenoRepository menoRepository;

    // Injektoidaan riippuvuudet

    public YhteenvetoController(TuloRepository tuloRepository,
                                MenoRepository menoRepository) {
            this.tuloRepository = tuloRepository;
            this.menoRepository = menoRepository;
    }
    
    //Palautetaan yhteenveto annetulta kuukaudelta
    @GetMapping
    public YhteenvetoDto haeKuukausiyhteenveto(@RequestParam String kuukausi) {

        YearMonth ym = YearMonth.parse(kuukausi); // Muunnetaan merkkijono
        // Määritellään kuukauden alku ja loppu
        LocalDate alku = ym.atDay(1);
        LocalDate loppu = ym.atEndOfMonth();

        //Haetaan summat
        Double tulot = tuloRepository.sumTulotValilta(alku, loppu);
        Double menot = menoRepository.sumMenotValilta(alku, loppu);

        return new YhteenvetoDto(kuukausi, tulot, menot);
    }
}
