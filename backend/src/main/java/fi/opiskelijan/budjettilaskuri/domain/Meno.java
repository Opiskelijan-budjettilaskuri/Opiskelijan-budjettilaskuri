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
@Table(name = "menot")
public class Meno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kuvaus;
    private Double summa;
    private LocalDate pvm;

    public Meno() {}

    public Long getId() { return id; }
    public String getKuvaus() { return kuvaus; }
    public Double getSumma() { return summa; }
    public LocalDate getPvm() { return pvm; }

    public void setId(Long id) { this.id = id; }
    public void setKuvaus(String kuvaus) { this.kuvaus = kuvaus; }
    public void setSumma(Double summa) { this.summa = summa; }
    public void setPvm(LocalDate pvm) {this.pvm = pvm;}
}