function naytaTaulukko() {
var v = document.getElementById("y").value;
var vuosi = document.getElementById("year").value;
var kuukausi = document.getElementById("kuukausi").value;
var ruoka = document.getElementById("ruoka").value;
var vuokra = document.getElementById("vuokra").value;
var vapaaaika = document.getElementById("vapaaaika").value;
var vaatteet = document.getElementById("vaatteet").value;
var kokonaismenot = ruoka + vuokra + vapaaaika + vaatteet;
document.getElementById("vuosiluku").innerHTML = vuosi;
if (vuosi == v) {
if (kuukausi == "Tammikuu") {
document.getElementById("tamruoka").innerHTML = ruoka;
document.getElementById("tamvuokra").innerHTML = vuokra;
document.getElementById("tamvapaaaika").innerHTML = vapaaaika;
document.getElementById("tamvaatteet").innerHTML = vaatteet;
document.getElementById("tammikuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Helmikuu") {
document.getElementById("helruoka").innerHTML = ruoka;
document.getElementById("helvuokra").innerHTML = vuokra;
document.getElementById("helvapaaaika").innerHTML = vapaaaika;
document.getElementById("helvaatteet").innerHTML = vaatteet;
document.getElementById("helmikuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Maaliskuu") {
document.getElementById("maaruoka").innerHTML = ruoka;
document.getElementById("maavuokra").innerHTML = vuokra;
document.getElementById("maavapaaaika").innerHTML = vapaaaika;
document.getElementById("maavaatteet").innerHTML = vaatteet;
document.getElementById("maaliskuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Huhtikuu") {
document.getElementById("huhruoka").innerHTML = ruoka;
document.getElementById("huhvuokra").innerHTML = vuokra;
document.getElementById("huhvapaaaika").innerHTML = vapaaaika;
document.getElementById("huhvaatteet").innerHTML = vaatteet;
document.getElementById("huhtikuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Toukokuu") {
document.getElementById("touruoka").innerHTML = ruoka;
document.getElementById("touvuokra").innerHTML = vuokra;
document.getElementById("touvapaaaika").innerHTML = vapaaaika;
document.getElementById("touvaatteet").innerHTML = vaatteet;
document.getElementById("toukokuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Kesäkuu") {
document.getElementById("kesruoka").innerHTML = ruoka;
document.getElementById("kesvuokra").innerHTML = vuokra;
document.getElementById("kesvapaaaika").innerHTML = vapaaaika;
document.getElementById("kesvaatteet").innerHTML = vaatteet;
document.getElementById("kesakuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Heinäkuu") {
document.getElementById("heiruoka").innerHTML = ruoka;
document.getElementById("heivuokra").innerHTML = vuokra;
document.getElementById("heivapaaaika").innerHTML = vapaaaika;
document.getElementById("heivaatteet").innerHTML = vaatteet;
document.getElementById("heinakuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Elokuu") {
document.getElementById("eloruoka").innerHTML = ruoka;
document.getElementById("elovuokra").innerHTML = vuokra;
document.getElementById("elovapaaaika").innerHTML = vapaaaika;
document.getElementById("elovaatteet").innerHTML = vaatteet;
document.getElementById("elokuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Syyskuu") {
document.getElementById("syyruoka").innerHTML = ruoka;
document.getElementById("syyvuokra").innerHTML = vuokra;
document.getElementById("syyvapaaaika").innerHTML = vapaaaika;
document.getElementById("syyvaatteet").innerHTML = vaatteet;
document.getElementById("syyskuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Lokakuu") {
document.getElementById("lokruoka").innerHTML = ruoka;
document.getElementById("lokvuokra").innerHTML = vuokra;
document.getElementById("lokvapaaaika").innerHTML = vapaaaika;
document.getElementById("lokvaatteet").innerHTML = vaatteet;
document.getElementById("lokakuu").innerHTML = kokonaismenot;
} else if (kuukausi == "Marraskuu") {
document.getElementById("marruoka").innerHTML = ruoka;
document.getElementById("marvuokra").innerHTML = vuokra;
document.getElementById("marvapaaaika").innerHTML = vapaaaika;
document.getElementById("marvaatteet").innerHTML = vaatteet;
document.getElementById("marraskuu").innerHTML = kokonaismenot;
} else {
document.getElementById("jouruoka").innerHTML = ruoka;
document.getElementById("jouvuokra").innerHTML = vuokra;
document.getElementById("jouvapaaaika").innerHTML = vapaaaika;
document.getElementById("jouvaatteet").innerHTML = vaatteet;
document.getElementById("joulukuu").innerHTML = kokonaismenot;
}
}
}
