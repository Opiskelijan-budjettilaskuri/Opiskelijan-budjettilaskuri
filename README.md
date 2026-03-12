# Opiskelijan-budjettilaskuri

[![Java CI with Maven](https://github.com/Opiskelijan-budjettilaskuri/Opiskelijan-budjettilaskuri/actions/workflows/ci.yml/badge.svg)](https://github.com/Opiskelijan-budjettilaskuri/Opiskelijan-budjettilaskuri/actions/workflows/ci.yml)

Tiimi: Pekka Levo, Erkka Pärssinen, Henna Salmi, Robbie Winter

#### Projektin backlog: https://github.com/orgs/Opiskelijan-budjettilaskuri/projects/1

#### Frontend URL: https://opiskelijan-budjettilaskuri.onrender.com

#### REST API -dokumentaatio (Swagger UI): http://localhost:8080/swagger-ui/index.html

---

## Projektin tarkoitus

Projektin tavoitteena on toteuttaa opiskelijalle suunnattu budjettilaskuri, jonka avulla käyttäjä voi seurata tulojaan ja menojaan helposti ja nopeasti.
Sovellus tukee opiskelijan arjen taloudenhallintaa tarjoamalla selkeän näkymän budjetin tilanteeseen eri aikaväleillä sekä auttamalla hahmottamaan, mihin raha kuluu.

---

## Tekninen käyttöohje

### Vaatimukset

- Java 17 tai uudempi
- Maven
- Node.js ja npm

### Backendin käynnistäminen

Kloonaa repositorio ja siirry projektin juurihakemistoon:

```bash
git clone https://github.com/Opiskelijan-budjettilaskuri/Opiskelijan-budjettilaskuri.git
cd Opiskelijan-budjettilaskuri/budjettilaskuri
```

Käynnistä Spring Boot -palvelin Maven Wrapperilla:

```bash
./mvnw spring-boot:run
```

Tai Windowsilla:

```bash
mvnw.cmd spring-boot:run
```

Backend käynnistyy osoitteeseen `http://localhost:8080`.

### Frontendin käynnistäminen

Siirry frontend-hakemistoon ja asenna riippuvuudet:

```bash
cd frontend
npm install
npm run dev
```

Frontend käynnistyy osoitteeseen `http://localhost:5173`.

### Testien suorittaminen

Backendin testit ajetaan projektin juurihakemistosta:

```bash
./mvnw test
```

Testiraportit löytyvät hakemistosta `target/surefire-reports/`.

---

## Teknologiat ja kirjastot

### Backend

| Teknologia | Versio | Käyttötarkoitus |
|---|---|---|
| Java | 17 | Ohjelmointikieli |
| Spring Boot | 4.0.1 | Palvelinpuolen sovelluskehys |
| Spring Data JPA | (Spring Boot) | Tietokantaoperaatiot |
| Spring Web MVC | (Spring Boot) | REST API ja web-kerros |
| Thymeleaf | (Spring Boot) | Palvelinpuolen HTML-sivupohjat |
| H2 | (Spring Boot) | Kevyt muistitietokanta kehitykseen |
| PostgreSQL | (runtime) | Tuotantotietokanta |
| Maven | - | Riippuvuuksien hallinta ja build |

### Frontend

| Teknologia | Versio | Käyttötarkoitus |
|---|---|---|
| JavaScript (ES Modules) | - | Ohjelmointikieli |
| React | 19.2 | Käyttöliittymäkirjasto |
| React Router DOM | 7.13 | Sivuston reititys |
| Vite | 7.2 | Kehityspalvelin ja bundlaus |
| ESLint | 9.39 | Koodin laadunvalvonta |

---

## Sovelluksen ominaisuudet

### Korkea prioriteetti (MVP)

- Käyttäjänä haluan pystyä lisäämään tuloja, jotta voin seurata käytettävissä olevaa rahamäärääni.
- Käyttäjänä haluan pystyä lisäämään menoja, jotta näen mihin rahani kuluvat.
- Käyttäjänä haluan kategorisoida menoni, jotta voin hahmottaa kulurakenteeni paremmin.
- Käyttäjänä haluan nähdä yhteenvedon budjetistani valitulla aikavälillä (esim. kuukausi), jotta ymmärrän taloudellisen tilanteeni.

### Keskitasoinen prioriteetti

- Käyttäjänä haluan nähdä budjettini muutokset eri aikaväleillä, jotta voin vertailla menoja ja tuloja ajallisesti.
- Käyttäjänä haluan kirjautua sovellukseen, jotta omat tietoni säilyvät erillään muista käyttäjistä.
- Käyttäjänä haluan rekisteröityä sovellukseen, jotta voin käyttää sitä useamman kerran ja säilyttää tietoni.

### Matala prioriteetti (jatkokehitys)

- Käyttäjänä haluan pystyä lisäämään toistuvia tuloja ja menoja (esim. kuukausittain), jotta minun ei tarvitse syöttää samoja tietoja uudelleen.
- Käyttäjänä haluan nähdä visuaalisen esityksen (esim. kaavioita) budjetistani, jotta taloustietojen tulkinta on helpompaa.

---

## Tiimin jäsenten linkit GitHub-profiileihin

- Pekka Levo: https://github.com/PekkaLevo
- Erkka Pärssinen: https://github.com/bhj665
- Henna Salmi: https://github.com/hennasalmi02
- Robbie Winter: https://github.com/robbiewinter
