package fi.opiskelijan.budjettilaskuri.domain;
public class Kategoria {
private String kuukausi;
private String ruoka;
private String vuokra;
private String vapaaaika;
private String vaatteet;
public Kategoria(String kuukausi, String ruoka, String vuokra, String vapaaaika, String vaatteet) {
this.kuukausi = kuukausi;
this.ruoka = ruoka;
this.vuokra = vuokra;
this.vapaaaika = vapaaaika;
this.vaatteet = vaatteet;
}
public Kategoria() {
this.kuukausi = null;
this.ruoka = null;
this.vuokra = null;
this.vapaaaika = null;
this.vaatteet = null;
}
public String getKuukausi() {
return kuukausi;
}
public void setKuukausi(String kuukausi) {
this.kuukausi = kuukausi;
}
public String getRuoka() {
return ruoka;
}
public void setRuoka(String ruoka) {
this.ruoka = ruoka;
}
public String getVuokra() {
return vuokra;
}
public void setVuokra(String vuokra) {
this.vuokra = vuokra;
}
public String getVapaaaika() {
return vapaaaika;
}
public void setVapaaaika(String vapaaaika) {
this.vapaaaika = vapaaaika;
}
public String getVaatteet() {
return vaatteet;
}
public void setVaatteet(String vaatteet) {
this.vaatteet = vaatteet;
}
@Override
public String toString() {
return this.kuukausi + this.ruoka + this.vuokra + this.vapaaaika + this.vaatteet;
}
}