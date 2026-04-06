package fi.opiskelijan.budjettilaskuri.domain;
public class Kategoriakuukausi {
private int vuosi;
private String kuukausi;
private double ruokakuukausi;
private double vuokrakuukausi;
private double vapaaaikakuukausi;
private double vaatteetkuukausi;
public Kategoriakuukausi(int vuosi, String kuukausi, double ruokakuukausi, double vuokrakuukausi, double vapaaaikakuukausi, double vaatteetkuukausi) {
this.vuosi = vuosi;
this.kuukausi = kuukausi;
this.ruokakuukausi = ruokakuukausi;
this.vuokrakuukausi = vuokrakuukausi;
this.vapaaaikakuukausi = vapaaaikakuukausi;
this.vaatteetkuukausi = vaatteetkuukausi;
}
public Kategoriakuukausi() {
this.vuosi = 0;
this.kuukausi = null;
this.ruokakuukausi = 0;
this.vuokrakuukausi = 0;
this.vapaaaikakuukausi = 0;
this.vaatteetkuukausi = 0;
}
public int getVuosi() {
return vuosi;
}
public void setVuosi(int vuosi) {
this.vuosi = vuosi;
}
public String getKuukausi() {
return kuukausi;
}
public void setKuukausi(String kuukausi) {
this.kuukausi = kuukausi;
}
public String getRuokakuukausi() {
return ruokakuukausi;
}
public void setRuokakuukausi(double ruokakuukausi) {
this.ruokakuukausi = ruokakuukausi;
}
public String getVuokrakuukausi() {
return vuokrakuukausi;
}
public void setVuokrakuukausi (double vuokrakuukausi) {
this.vuokrakuukausi = vuokrakuukausi;
}
public String getVapaaaikakuukausi() {
return vapaaaikakuukausi;
}
public void setVapaaaikakuukausi(double vapaaaikakuukausi) {
this.vapaaaikakuukausi = vapaaaikakuukausi;
}
public String getVaatteetkuukausi() {
return vaatteetkuukausi;
}
public void setVaatteetkuukausi(double vaatteetkuukausi) {
this.vaatteetkuukausi = vaatteetkuukausi;
}
@Override
public String toString() {
return this.vuosi + this.kuukausi + this.ruokakuukausi + this.vuokrakuukausi + this.vapaaaikakuukausi + this.vaatteetkuukausi;
}
}
