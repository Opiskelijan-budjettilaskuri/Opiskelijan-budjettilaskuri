package fi.opiskelijan.budjettilaskuri.domain;
public class Kategoriakuukausi {
private String kuukausi;
private String ruokakuukausi;
private String vuokrakuukausi;
private String vapaaaikakuukausi;
private String vaatteetkuukausi;
public Kategoriakuukausi(String kuukausi, String ruokakuukausi, String vuokrakuukausi, String vapaaaikakuukausi, String vaatteetkuukausi) {
this.kuukausi = kuukausi;
this.ruokakuukausi = ruokakuukausi;
this.vuokrakuukausi = vuokrakuukausi;
this.vapaaaikakuukausi = vapaaaikakuukausi;
this.vaatteetkuukausi = vaatteetkuukausi;
}
public Kategoriakuukausi() {
this.kuukausi = null;
this.ruokakuukausi = null;
this.vuokrakuukausi = null;
this.vapaaaikakuukausi = null;
this.vaatteetkuukausi = null;
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
public void setRuokakuukausi(String ruokakuukausi) {
this.ruokakuukausi = ruokakuukausi;
}
public String getVuokrakuukausi() {
return vuokrakuukausi;
}
public void setVuokrakuukausi(String vuokrakuukausi) {
this.vuokrakuukausi = vuokrakuukausi;
}
public String getVapaaaikakuukausi() {
return vapaaaikakuukausi;
}
public void setVapaaaikakuukausi(String vapaaaikakuukausi) {
this.vapaaaikakuukausi = vapaaaikakuukausi;
}
public String getVaatteetkuukausi() {
return vaatteetkuukausi;
}
public void setVaatteetkuukausi(String vaatteetkuukausi) {
this.vaatteetkuukausi = vaatteetkuukausi;
}
@Override
public String toString() {
return this.kuukausi + this.ruokakuukausi + this.vuokrakuukausi + this.vapaaaikakuukausi + this.vaatteetkuukausi;
}
}