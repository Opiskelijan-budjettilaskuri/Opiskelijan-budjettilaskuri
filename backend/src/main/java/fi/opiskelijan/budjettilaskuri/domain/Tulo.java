package fi.opiskelijan.budjettilaskuri.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Tulo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kuvaus;
    private Double maara;

    public Tulo() {}
    public Long getId() { return id; }
    public String getKuvaus() { return kuvaus; }
    public Double getMaara() { return maara; }

    public void setId(Long id) {
        this.id = id; 
    }
    public void setKuvaus(String kuvaus) { 
        this.kuvaus = kuvaus; 
    }
    public void setMaara(Double maara) { 
        this.maara = maara; 
    }
}
