package fi.opiskelijan.budjettilaskuri.web.dto;

import java.util.List;

// palautetaan budjetin yhteenveto frontendille.
public class YhteenvetoDto {

    private String aikavali;
    private double tulot;
    private double menot;
    private double saldo;

    // Menot ja Tulot kategorioittain
    private List<KategoriaSummaDto> menotKategorioittain;
    private List<KategoriaSummaDto> tulotKategorioittain;

    public YhteenvetoDto(String aikavali, double tulot, double menot) {
        this.aikavali = aikavali;
        this.tulot = tulot;
        this.menot = menot;
        this.saldo = tulot - menot;
    }

    public YhteenvetoDto(String aikavali, double tulot, double menot, List<KategoriaSummaDto> menotKategorioittain) {
        this.aikavali = aikavali;
        this.tulot = tulot;
        this.menot = menot;
        this.saldo = tulot - menot;
        this.menotKategorioittain = menotKategorioittain;
    }

    public YhteenvetoDto(String aikavali, double tulot, double menot,
                         List<KategoriaSummaDto> menotKategorioittain,
                         List<KategoriaSummaDto> tulotKategorioittain) {
        this.aikavali = aikavali;
        this.tulot = tulot;
        this.menot = menot;
        this.saldo = tulot - menot;
        this.menotKategorioittain = menotKategorioittain;
        this.tulotKategorioittain = tulotKategorioittain;
    }

    public String getAikavali() { return aikavali; }
    public double getTulot() { return tulot; }
    public double getMenot() { return menot; }
    public double getSaldo() { return saldo; }

    public List<KategoriaSummaDto> getMenotKategorioittain() { return menotKategorioittain; }
    public List<KategoriaSummaDto> getTulotKategorioittain() { return tulotKategorioittain; }
    }