package fi.opiskelijan.budjettilaskuri.domain;
public class Kategoriavuosi {
private int vuosi;
private String ruokavuosi;
private String vuokravuosi;
private String vapaaaikavuosi;
private String vaatteetvuosi;
public Kategoriavuosi(int vuosi, String ruokavuosi, String vuokravuosi, String vapaaaikavuosi, String vaatteetvuosi) {
this.vuosi = vuosi;
this.ruokavuosi = ruokavuosi;
this.vuokravuosi = vuokravuosi;
this.vapaaaikavuosi = vapaaaikavuosi;
this.vaatteetvuosi = vaatteetvuosi;
}
public Kategoriavuosi() {
this.vuosi = 0;
this.ruokavuosi = null;
this.vuokravuosi = null;
this.vapaaaikavuosi = null;
this.vaatteetvuosi = null;
}
public int getVuosi() {
return vuosi;
}
public void setVuosi(int vuosi) {
this.vuosi = vuosi;
}
public String getRuokavuosi() {
return ruokavuosi;
}
public void setRuokavuosi(String ruokavuosi) {
this.ruokavuosi = ruokavuosi;
}
public String getVuokravuosi() {
return vuokravuosi;
}
public void setVuokravuosi(String vuokravuosi) {
this.vuokravuosi = vuokravuosi;
}
public String getVapaaaikavuosi() {
return vapaaaikavuosi;
}
public void setVapaaaikavuosi(String vapaaaikavuosi) {
this.vapaaaikavuosi = vapaaaikavuosi;
}
public String getVaatteetvuosi() {
return vaatteetvuosi;
}
public void setVaatteetvuosi(String vaatteetvuosi) {
this.vaatteetvuosi = vaatteetvuosi;
}
@Override
public String toString() {
return this.vuosi + this.ruokavuosi + this.vuokravuosi + this.vapaaaikavuosi + this.vaatteetvuosi;
}
}