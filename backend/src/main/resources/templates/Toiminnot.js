function hyvaksy() {
var sahkoposti = document.getElementById("sahkoposti").value;
var kayttajatunnus = document.getElementById("kayttajatunnus").value;
var salasana = document.getElementById("salasana").value;
var puhelin = document.getElementById("puhelin").value;
var osoite = document.getElementById("osoite").value;
var kortinnumero = document.getElementById("kortinnumero").value;
var turvakoodi = document.getElementById("turvakoodi").value;
var voimassaoloaika = document.getElementById("voimassaoloaika").value;
document.getElementById("hyvaksytaanko").innerHTML = "Hyväksytäänkö seuraavat tiedot?";
document.getElementById("hyvaksySahkoposti").innerHTML = sahkoposti;
document.getElementById("hyvaksyKayttajatunnus").innerHTML = kayttajatunnus;
document.getElementById("hyvaksySalasana").innerHTML = salasana;
document.getElementById("hyvaksyPuhelin").innerHTML = puhelin;
document.getElementById("hyvaksyOsoite").innerHTML = osoite;
document.getElementById("hyvaksyKortinnumero").innerHTML = kortinnumero;
document.getElementById("hyvaksyTurvakoodi").innerHTML = turvakoodi;
document.getElementById("hyvaksyVoimassaoloaika").innerHTML = voimassaoloaika;
}

function hylkaa() {
var sahkoposti = document.getElementById("sahkoposti").value;
var kayttajatunnus = document.getElementById("kayttajatunnus").value;
var salasana = document.getElementById("salasana").value;
var puhelin = document.getElementById("puhelin").value;
var osoite = document.getElementById("osoite").value;
var kortinnumero = document.getElementById("kortinnumero").value;
var turvakoodi = document.getElementById("turvakoodi").value;
var voimassaoloaika = document.getElementById("voimassaoloaika").value;
document.getElementById("hylataanko").innerHTML = "Hylätäänkö seuraavat tiedot?";
document.getElementById("hylkaaSahkoposti").innerHTML = sahkoposti;
document.getElementById("hylkaaKayttajatunnus").innerHTML = kayttajatunnus;
document.getElementById("hylkaaSalasana").innerHTML = salasana;
document.getElementById("hylkaaPuhelin").innerHTML = puhelin;
document.getElementById("hylkaaOsoite").innerHTML = osoite;
document.getElementById("hylkaaKortinnumero").innerHTML = kortinnumero;
document.getElementById("hylkaaTurvakoodi").innerHTML = turvakoodi;
document.getElementById("hylkaaVoimassaoloaika").innerHTML = voimassaoloaika;
}

function eiHyvaksyta() {

}

function eiHylata() {

}