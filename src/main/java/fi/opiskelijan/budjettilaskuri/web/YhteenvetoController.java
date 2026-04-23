package fi.opiskelijan.budjettilaskuri.web;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fi.opiskelijan.budjettilaskuri.domain.ToistuvaTapahtuma;
import fi.opiskelijan.budjettilaskuri.repository.MenoRepository;
import fi.opiskelijan.budjettilaskuri.repository.ToistuvaTapahtumaRepository;
import fi.opiskelijan.budjettilaskuri.repository.TuloRepository;
import fi.opiskelijan.budjettilaskuri.web.dto.KategoriaSummaDto;
import fi.opiskelijan.budjettilaskuri.web.dto.YhteenvetoDto;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/yhteenveto")
public class YhteenvetoController {

    private final TuloRepository tuloRepository;
    private final MenoRepository menoRepository;
    private final ToistuvaTapahtumaRepository toistuvaTapahtumaRepository;

    public YhteenvetoController(TuloRepository tuloRepository,
                                 MenoRepository menoRepository,
                                 ToistuvaTapahtumaRepository toistuvaTapahtumaRepository) {
        this.tuloRepository = tuloRepository;
        this.menoRepository = menoRepository;
        this.toistuvaTapahtumaRepository = toistuvaTapahtumaRepository;
    }

    /**
     * Palauttaa budjetin yhteenvedon kuukaudelta.
     * - Jos kuukausi-parametria ei anneta, käytetään oletuksena nykyistä kuukautta.
     * - Jos kuukausi on väärässä muodossa, palautetaan 400 ja selkeä virheviesti.
     */
    @GetMapping
    public ResponseEntity<?> haeKuukausiyhteenveto(
            @RequestParam(required = false) String kuukausi,
            @RequestParam(required = false) String alkupvm,
            @RequestParam(required = false) String loppupvm) {
        try {
            LocalDate alku, loppu;
            String aikavali;

            if (alkupvm != null && loppupvm != null) {
                alku = LocalDate.parse(alkupvm);
                loppu = LocalDate.parse(loppupvm);
                aikavali = alkupvm + " – " + loppupvm;
            } else {
                if (kuukausi == null || kuukausi.isBlank()) {
                    kuukausi = YearMonth.now().toString();
                }
                YearMonth ym = YearMonth.parse(kuukausi);
                alku = ym.atDay(1);
                loppu = ym.atEndOfMonth();
                aikavali = kuukausi;
            }

            double tulot = tuloRepository.sumTulotValilta(alku, loppu);
            double menot = menoRepository.sumMenotValilta(alku, loppu);

            List<ToistuvaTapahtuma> toistuvat = toistuvaTapahtumaRepository.findAll();
            for (ToistuvaTapahtuma t : toistuvat) {
                if (!t.isAktiivinen() || t.getSumma() == null) continue;
                long kerrat = laskeToistot(t, alku, loppu);
                if (kerrat <= 0) continue;
                double osuus = t.getSumma() * kerrat;
                if ("tulo".equals(t.getTyyppi())) tulot += osuus;
                else menot += osuus;
            }

            var menotKategorioittain = new ArrayList<>(menoRepository.sumMenotKategorioittain(alku, loppu));
            var tulotKategorioittain = new ArrayList<>(tuloRepository.sumTulotKategorioittain(alku, loppu));
            yhdistaToistuvatKategorioihin(toistuvat, alku, loppu, menotKategorioittain, tulotKategorioittain);

            return ResponseEntity
                    .ok(new YhteenvetoDto(aikavali, tulot, menot, menotKategorioittain, tulotKategorioittain));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest()
                    .body("Parametrit pitää olla muodossa YYYY-MM-DD tai kuukausi muodossa YYYY-MM");
        }
    }

    private long laskeToistot(ToistuvaTapahtuma t, LocalDate alku, LocalDate loppu) {
        LocalDate jaksoAlku = t.getAloitusPvm() != null && t.getAloitusPvm().isAfter(alku)
                ? t.getAloitusPvm() : alku;
        LocalDate jaksoLoppu = t.getLopetusPvm() != null && t.getLopetusPvm().isBefore(loppu)
                ? t.getLopetusPvm() : loppu;
        if (jaksoAlku.isAfter(jaksoLoppu)) return 0;

        return switch (t.getToistuvuus()) {
            case "päivittäin"    -> ChronoUnit.DAYS.between(jaksoAlku, jaksoLoppu) + 1;
            case "viikoittain"   -> laskeJaksottaiset(t.getAloitusPvm(), jaksoAlku, jaksoLoppu, 7);
            case "kuukausittain" -> laskeKuukausittaiset(t.getAloitusPvm(), jaksoAlku, jaksoLoppu);
            case "vuosittain"    -> laskeVuosittaiset(t.getAloitusPvm(), jaksoAlku, jaksoLoppu);
            default -> 0;
        };
    }

    private long laskeJaksottaiset(LocalDate alkupera, LocalDate jaksoAlku, LocalDate jaksoLoppu, int vali) {
        long paiviaAlkuperasta = ChronoUnit.DAYS.between(alkupera, jaksoAlku);
        long ylijaama = ((paiviaAlkuperasta % vali) + vali) % vali;
        LocalDate ensimmainen = ylijaama == 0 ? jaksoAlku : jaksoAlku.plusDays(vali - ylijaama);
        if (ensimmainen.isAfter(jaksoLoppu)) return 0;
        return ChronoUnit.DAYS.between(ensimmainen, jaksoLoppu) / vali + 1;
    }

    private long laskeKuukausittaiset(LocalDate alkupera, LocalDate jaksoAlku, LocalDate jaksoLoppu) {
        int paiva = alkupera.getDayOfMonth();
        long count = 0;
        YearMonth kk = YearMonth.from(jaksoAlku);
        YearMonth viimeinenKk = YearMonth.from(jaksoLoppu);
        while (!kk.isAfter(viimeinenKk)) {
            LocalDate osuma = kk.atDay(Math.min(paiva, kk.lengthOfMonth()));
            if (!osuma.isBefore(jaksoAlku) && !osuma.isAfter(jaksoLoppu)) count++;
            kk = kk.plusMonths(1);
        }
        return count;
    }

    private long laskeVuosittaiset(LocalDate alkupera, LocalDate jaksoAlku, LocalDate jaksoLoppu) {
        int kuukausi = alkupera.getMonthValue();
        int paiva = alkupera.getDayOfMonth();
        long count = 0;
        for (int v = jaksoAlku.getYear(); v <= jaksoLoppu.getYear(); v++) {
            try {
                LocalDate osuma = LocalDate.of(v, kuukausi, paiva);
                if (!osuma.isBefore(jaksoAlku) && !osuma.isAfter(jaksoLoppu)) count++;
            } catch (DateTimeException ignored) {}
        }
        return count;
    }

    private void yhdistaToistuvatKategorioihin(List<ToistuvaTapahtuma> toistuvat,
            LocalDate alku, LocalDate loppu,
            List<KategoriaSummaDto> menotKat, List<KategoriaSummaDto> tulotKat) {

        Map<String, Double> menotMap = new LinkedHashMap<>();
        for (KategoriaSummaDto d : menotKat) menotMap.put(d.getKategoria(), d.getSumma());
        Map<String, Double> tulotMap = new LinkedHashMap<>();
        for (KategoriaSummaDto d : tulotKat) tulotMap.put(d.getKategoria(), d.getSumma());

        for (ToistuvaTapahtuma t : toistuvat) {
            if (!t.isAktiivinen() || t.getSumma() == null) continue;
            long kerrat = laskeToistot(t, alku, loppu);
            if (kerrat <= 0) continue;
            double osuus = t.getSumma() * kerrat;
            String kat = t.getKategoria() != null ? t.getKategoria().getNimi() : "Ei kategoriaa";
            if ("tulo".equals(t.getTyyppi()))
                tulotMap.merge(kat, osuus, Double::sum);
            else
                menotMap.merge(kat, osuus, Double::sum);
        }

        menotKat.clear();
        menotMap.forEach((k, v) -> menotKat.add(new KategoriaSummaDto(k, v)));
        tulotKat.clear();
        tulotMap.forEach((k, v) -> tulotKat.add(new KategoriaSummaDto(k, v)));
    }
}