package fi.opiskelijan.budjettilaskuri.domain;
public class Kayttaja {
private String sahkoposti;
private String kayttajatunnus;
private String salasana;
private String puhelin;
private String osoite;
private String kortinnumero;
private String turvakoodi;
private String voimassaoloaika;
public Kayttaja(String sahkoposti, String kayttajatunnus, String salasana, String puhelin, String osoite, String kortinnumero, String turvakoodi, String voimassaoloaika) {
this.sahkoposti = sahkoposti;
this.kayttajatunnus = kayttajatunnus;
this.salasana = salasana;
this.puhelin = puhelin;
this.osoite = osoite;
this.kortinnumero = kortinnumero;
this.turvakoodi = turvakoodi;
this.voimassaoloaika = voimassaoloaika;
}
public Kayttaja() {
this.sahkoposti = null;
this.kayttajatunnus = null;
this.salasana = null;
this.puhelin = null;
this.osoite = null;
this.kortinnumero = null;
this.turvakoodi = null;
this.voimassaoloaika = null;
}
public String getSahkoposti() {
return sahkoposti;
}
public void setSahkoposti(String sahkoposti) {
this.sahkoposti = sahkoposti;
}
public String getKayttajatunnus() {
return kayttajatunnus;
}
public void setKayttajatunnus(String kayttajatunnus) {
this.kayttajatunnus = kayttajatunnus;
}
public String getSalasana() {
return salasana;
}
public void setSalasana(String salasana) {
this.salasana = salasana;
}
public String getPuhelin() {
return puhelin;
}
public void setPuhelin(String puhelin) {
this.puhelin = puhelin;
}
public String getOsoite() {
return osoite;
}
public void setOsoite(String osoite) {
this.osoite = osoite;
}
public String getKortinnumero() {
return kortinnumero;
}
public void setKortinnumero(String kortinnumero) {
this.kortinnumero = kortinnumero;
}
public String getTurvakoodi() {
return turvakoodi;
}
public void setTurvakoodi(String turvakoodi) {
this.turvakoodi = turvakoodi;
}
public String getVoimassaoloaika() {
return voimassaoloaika;
}
public void setVoimassaoloaika(String voimassaoloaika) {
this.voimassaoloaika = voimassaoloaika;
}
@Override
public String toString() {
return this.sahkoposti + this.kayttajatunnus + this.salasana + this.puhelin + this.osoite + this.kortinnumero + this.turvakoodi + this.voimassaoloaika;
}
}