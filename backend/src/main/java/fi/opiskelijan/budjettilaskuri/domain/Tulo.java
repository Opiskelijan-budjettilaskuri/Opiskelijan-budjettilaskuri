package fi.opiskelijan.budjettilaskuri.domain;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tulot")
public class Tulo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kuvaus;
    private Double maara;
    private LocalDate pvm;

    public Tulo() {}
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
