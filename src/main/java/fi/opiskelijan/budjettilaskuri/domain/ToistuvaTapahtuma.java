package fi.opiskelijan.budjettilaskuri.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "toistuvat_tapahtumat")
public class ToistuvaTapahtuma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kuvaus;
    private Double summa;

    private String tyyppi; 
    // "meno" tai "tulo"

    private String toistuvuus; 
    // "päivittäin", "viikoittain", "kuukausittain" tai "vuosittain"

    private LocalDate aloitusPvm;
    private LocalDate lopetusPvm;

    private LocalDate viimeksiLuotuPvm;

    private boolean aktiivinen;

    @ManyToOne
    @JoinColumn(name = "kategoria_id")
    private Kategoria kategoria;

    public ToistuvaTapahtuma() {}

    public Long getId() { return id; }
    public String getKuvaus() { return kuvaus; }
    public Double getSumma() { return summa; }
    public String getTyyppi() { return tyyppi; }
    public String getToistuvuus() { return toistuvuus; }
    public LocalDate getAloitusPvm() { return aloitusPvm; }
    public LocalDate getLopetusPvm() { return lopetusPvm; }
    public LocalDate getViimeksiLuotuPvm() { return viimeksiLuotuPvm; }
    public boolean isAktiivinen() { return aktiivinen; }
    public Kategoria getKategoria() { return kategoria; }

    public void setId(Long id) { this.id = id; }
    public void setKuvaus(String kuvaus) { this.kuvaus = kuvaus; }
    public void setSumma(Double summa) { this.summa = summa; }
    public void setTyyppi(String tyyppi) { this.tyyppi = tyyppi; }
    public void setToistuvuus(String toistuvuus) { this.toistuvuus = toistuvuus; }
    public void setAloitusPvm(LocalDate aloitusPvm) { this.aloitusPvm = aloitusPvm; }
    public void setLopetusPvm(LocalDate lopetusPvm) { this.lopetusPvm = lopetusPvm; }
    public void setViimeksiLuotuPvm(LocalDate viimeksiLuotuPvm) { this.viimeksiLuotuPvm = viimeksiLuotuPvm; }
    public void setAktiivinen(boolean aktiivinen) { this.aktiivinen = aktiivinen; }
    public void setKategoria(Kategoria kategoria) { this.kategoria = kategoria; }
}