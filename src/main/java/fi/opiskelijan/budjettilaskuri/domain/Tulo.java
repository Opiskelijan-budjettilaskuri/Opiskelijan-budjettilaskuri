package fi.opiskelijan.budjettilaskuri.domain;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tulot")
public class Tulo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kuvaus;
    private Double maara;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pvm;

    @ManyToOne
    @JoinColumn(name = "kategoria_id")
    private Kategoria kategoria;

    @ManyToOne
    @JoinColumn(name = "kayttaja_id")
    private Kayttaja kayttaja;

    public Kayttaja getKayttaja() { return kayttaja; }
    public void setKayttaja(Kayttaja kayttaja) { this.kayttaja = kayttaja; }

    public Tulo() {}

    public Kategoria getKategoria() { return kategoria; }
    public void setKategoria(Kategoria kategoria) { this.kategoria = kategoria; }
    
    public Long getId() { return id; }
    public String getKuvaus() { return kuvaus; }
    public Double getMaara() { return maara; }
    public LocalDate getPvm() {return pvm;}

    public void setId(Long id) {
        this.id = id; 
    }
    public void setKuvaus(String kuvaus) { 
        this.kuvaus = kuvaus; 
    }
    public void setMaara(Double maara) { 
        this.maara = maara; 
    }

    public void setPvm(LocalDate pvm) {
        this.pvm = pvm;
    }
}
