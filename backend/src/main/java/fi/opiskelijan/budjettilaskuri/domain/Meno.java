package fi.opiskelijan.budjettilaskuri.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Meno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String kuvaus;
    private Double summa;

    public Meno() {}

    public Long getId() { return id; }
    public String getDescription() { return kuvaus; }
    public Double getAmount() { return summa; }

    public void setId(Long id) { this.id = id; }
    public void setDescription(String kuvaus) { this.kuvaus = kuvaus; }
    public void setAmount(Double summa) { this.summa = summa; }
}