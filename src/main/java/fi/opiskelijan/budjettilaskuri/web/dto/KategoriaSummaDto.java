package fi.opiskelijan.budjettilaskuri.web.dto;

// DTO yhdelle kategorian summalle.

public class KategoriaSummaDto {

    private String kategoria;
    private double summa;

    public KategoriaSummaDto(String kategoria, double summa) {
        this.kategoria = kategoria;
        this.summa = summa;
    }

    public String getKategoria() { return kategoria; }
    public double getSumma() { return summa; }
}