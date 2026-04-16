package fi.opiskelijan.budjettilaskuri.domain;

public class Kategoriavuosi {
private int vuosi;
private double ruokavuosi;
private double vuokravuosi;
private double vapaaaikavuosi;
private double vaatteetvuosi;
public Kategoriavuosi(int vuosi, double ruokavuosi, double vuokravuosi, double vapaaaikavuosi, double vaatteetvuosi) {
this.vuosi = vuosi;
this.ruokavuosi = ruokavuosi;
this.vuokravuosi = vuokravuosi;
this.vapaaaikavuosi = vapaaaikavuosi;
this.vaatteetvuosi = vaatteetvuosi;
}
public Kategoriavuosi() {
this.vuosi = 0;
this.ruokavuosi = 0;
this.vuokravuosi = 0;
this.vapaaaikavuosi = 0;
this.vaatteetvuosi = 0;
}
public int getVuosi() {
return vuosi;
}
public void setVuosi(int vuosi) {
this.vuosi = vuosi;
}
public double getRuokavuosi() {
return ruokavuosi;
}
public void setRuokavuosi(double ruokavuosi) {
this.ruokavuosi = ruokavuosi;
}
public double getVuokravuosi() {
return vuokravuosi;
}
public void setVuokravuosi(double vuokravuosi) {
this.vuokravuosi = vuokravuosi;
}
public double getVapaaaikavuosi() {
return vapaaaikavuosi;
}
public void setVapaaaikavuosi(double vapaaaikavuosi) {
this.vapaaaikavuosi = vapaaaikavuosi;
}
public double getVaatteetvuosi() {
return vaatteetvuosi;
}
public void setVaatteetvuosi(double vaatteetvuosi) {
this.vaatteetvuosi = vaatteetvuosi;
}
@Override
public String toString() {
return this.vuosi + " " + this.ruokavuosi + " " + this.vuokravuosi + " " + this.vapaaaikavuosi + " " + this.vaatteetvuosi;
}
}
