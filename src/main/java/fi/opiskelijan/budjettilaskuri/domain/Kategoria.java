package fi.opiskelijan.budjettilaskuri.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "kategoriat")
public class Kategoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nimi;

    @ManyToOne
    @JoinColumn(name = "kayttaja_id")
    private Kayttaja kayttaja;

    public Kayttaja getKayttaja() { return kayttaja; }
    public void setKayttaja(Kayttaja kayttaja) { this.kayttaja = kayttaja; }

    public Kategoria() {}

    public Kategoria(Long id, String nimi) {
        this.id = id;
        this.nimi = nimi;
    }

    public Long getId() {
        return id;
    }

    public String getNimi() {
        return nimi;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNimi(String nimi) {
        this.nimi = nimi;
    }
}
