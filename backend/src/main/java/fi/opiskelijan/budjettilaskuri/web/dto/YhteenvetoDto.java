package fi.opiskelijan.budjettilaskuri.web.dto;

//DTO:lla palautetaan yhteenveto frontendille
public class YhteenvetoDto {

    private String aikavali;
    private double tulot;
    private double menot;
    private double saldo;

    // Luodaan uusi yhteenveto-olio, saldo saadaan konstruktorissa
    public YhteenvetoDto(String aikavali, double tulot, double menot) {
        this.aikavali = aikavali;
        this.tulot = tulot;
        this.menot = menot;
        this.saldo = tulot - menot;
    }

    public String getAikavali() { return aikavali;}
    public double getTulot() {return tulot;}
    public double getMenot() {return menot;}
    public double getSaldo() {return saldo;}
}