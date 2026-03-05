package fi.opiskelijan.budjettilaskuri.web;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeParseException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;
import fi.opiskelijan.budjettilaskuri.web.dto.YhteenvetoDto;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/yhteenveto")
public class YhteenvetoController {

    private final TuloRepository tuloRepository;
    private final MenoRepository menoRepository;

    public YhteenvetoController(TuloRepository tuloRepository, MenoRepository menoRepository) {
        this.tuloRepository = tuloRepository;
        this.menoRepository = menoRepository;
    }

    /**
     * Palauttaa budjetin yhteenvedon kuukaudelta.
     * - Jos kuukausi-parametria ei anneta, käytetään oletuksena nykyistä kuukautta.
     * - Jos kuukausi on väärässä muodossa, palautetaan 400 ja selkeä virheviesti.
     */
    @GetMapping
    public ResponseEntity<?> haeKuukausiyhteenveto(@RequestParam(required = false) String kuukausi) {
        try {
            if (kuukausi == null || kuukausi.isBlank()) {
                kuukausi = YearMonth.now().toString(); // "YYYY-MM"
            }

            YearMonth ym = YearMonth.parse(kuukausi);
            LocalDate alku = ym.atDay(1);
            LocalDate loppu = ym.atEndOfMonth();

            double tulot = tuloRepository.sumTulotValilta(alku, loppu);
            double menot = menoRepository.sumMenotValilta(alku, loppu);

            var menotKategorioittain = menoRepository.sumMenotKategorioittain(alku, loppu);
            var tulotKategorioittain = tuloRepository.sumTulotKategorioittain(alku, loppu);

            return ResponseEntity
                    .ok(new YhteenvetoDto(kuukausi, tulot, menot, menotKategorioittain, tulotKategorioittain));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest()
                    .body("Parametri 'kuukausi' pitää olla muodossa YYYY-MM, esim. 2026-03");
        }
    }
}