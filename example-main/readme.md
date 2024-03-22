# Stateportal-Example

Siia asukohta käivad teenused, mida arendate!

NB! Antud näite rakenduse puhul ei tööta sisse logimine, kuid see töötab, kui paigaldatakse rakendus arenduskeskkonda.

## Sõltuvuste installimine

Kõik antud näidisrakenduses olevad sõltuvused on saadaval RIA Nexus'est kui neid veel juba ei ole kohalikult `npm install`.

## SSL

SSL kasutamine on kohustuslik, täpsema informatsiooni jaoks palun vaata: [SSL-seadistamine](local-ssl/README.md)

Pärast sõltuvuste installimist ning SSL seadistamist peaks olema antud rakendust käivitada `npm run start:ssl:local`

## Kuidas arendustega alustada

### NPM pakid

Peamine rakenduse loogika on eraldiseisvates NPM pakkidest, millest antud näidisrakenduses on peamiselt välja toodud päis, sidenav ja jalus. 

Antud pakkide konkreetsemat kasutust on võimalik näha app.component osas.

### Uute NPM pakkide loomine

Vastav täpsustav juhend on leitav näiteks `@ria/stateportal-sidenav` paki README failis.

### NPM pakkide uuendamine

Kui mingil põhjusel on vaja sisse viia NPM pakki omapoolne uuendus, siis tuleb vastavas NPM paki repositooriumis teha uuendus, 
seejärel üles laadida RIA NPM pakkide repositooriumisse https://nexus.riaint.ee/ ning uuendada vastavalt rakenduses kasutatav versioon ära.

NB: Tähtis on jälgida semantilist versioneerimist (https://semver.org/). Näiteks "@ria/stateportal-sidenav": "5.0.0-335" puhul on tegemist on major versiooni 5, minor versiooni 0 
ja patch versiooni 0'ga, kus 335 viitab CI/CD poolt pakki ehitamise töö protsessile (vältimaks ka olukordi, kus CI/CD ehitab uue pakendatud versiooni aga semantiline versioon jäi
muutumatuks mingil põhjusel). Vana versiooni üle kirjutada ei tohi.


### Kehtivad arenduspraktikad

Peamine arendus toimub GitFlow põhimõtetel, kus tehakse main harust (mis on hetkel viimane kehtiv toodangu versioon) oma haru. Vastav haru mestitakse esimeses lähenduses üldjuhul
develop harusse, mille raames toimub ka esimene koodi ülevaatus. Antud koodi ülevaatus on peamiselt arenduspartnerite poolne ning ei vaja RIA poolset kinnitamist. Pärast testminisi
arenduskeskkondades võib antud haru mestida main harusse. Viimasesse main harusse mestimisel on vajalik RIA poolne ülevaatus ning kinnitus.

Üldjuhul NPM pakkide puhul eksisteerib ainult kaks haru (main/develop ja vastava featuuri arendusharu). Tähtis erisus ühelt või teiselt harult NPM paki ehitamisel on see, et 
kõrvalharude versioonis on leitav ka üldjuhul git panustamise räsi. Näiteks "5.0.0-3aed382-336". Peamises harus olev NPM paki kood saab agu eelpool juba välja toodud versiooni
kuju ning on üldjuhul ainus lubatud versioon toodangus. 

Arendustel, kus on main - develop - feature kasutusel, siis seal on feature haru versioneerimine analoogne eelpool näitega ainult, et lõpus on "dev.123", mis viitab et tegemist on 
nii arendusega kui ka mitmenda CI/CD konveieri jooksutamisega tehtud. Develop harus on näidisena toodud "dev-123" asemel hoopis "rc-124", kus rc tähendab _release candidate_.

Main harus olles pandakse versiooniks taas analoogselt eelpool toodud sidenav teegile ilus versiooni number.
