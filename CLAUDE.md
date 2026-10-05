# MOVNMOTION: afspraken voor Claude Code

Lees dit eerst. Het zijn de afspraken waaronder deze site is gebouwd.

## Wat dit project is

De website van MOVNMOTION, een community waarin sport, creativiteit en ondernemerschap samenkomen. Eén pagina, gewone HTML, CSS en JavaScript, gehost op Netlify, bron op GitHub. Alles wat online komt staat in `public/`.

Kernzin: **"Bewegen brengt mensen samen."** Tagline: **Move. Create. Lead.**

## Taal en toon

- Alle teksten zijn Nederlands, warm, direct, zonder bedrijfsjargon.
- Gebruik **geen lange gedachtestreep (em-dash)**. Gebruik komma's, punten of dubbele punten.
- Zeg **"pijlers"** (Move, Create, Lead). Nooit "werelden" of "culturen".
- MOVN SUNDAYS is iets dat we **samen opbouwen**, laagdrempelig beginnend. Noem er **geen frequentie** bij ("elke maand", "maandelijks"). Dat communiceren we niet naar buiten.
- Zeg niet "net begonnen" of "nieuwe generatie" en maak geen claims als "op maat" of "dé community". Geen verzonnen cijfers, logo's of ledenaantallen.
- De actieve groepen zijn voor iedereen, ongeacht leeftijd. De ontwikkelprogramma's richten zich vooral op 16 tot 35 jaar, als richtlijn.
- Zichtbare namen op de site: alleen mensen die dat zelf willen. Eén partner blijft bewust op de achtergrond.

## Merk

- **Kleuren** staan als variabelen bovenaan `public/assets/css/style.css`. Gebruik die, geen losse hex-codes. Lime `#C4E23A` (merkkleur en Move), Magenta `#D6357A` (Create), Amber `#E8A23D` (Lead), bijna-zwart `#15130F`, gebroken wit `#F2EFE9`. De site is bewust alleen donker.
- **Lettertypes:** Bricolage Grotesque (koppen) en Work Sans (tekst), zelf gehost in `assets/fonts/`. Geen externe lettertype-diensten.
- **Het logo is een vaste tekening.** Typ de naam "MOVNMOTION" nooit na in een lettertype om het logo te maken. Gebruik de symbolen in de sprite bovenaan `index.html` (`logo-lockup`, `logo-wordmark`, `logo-mark`). Het teken heeft drie balkjes in één kleur met 35%, 65% en 100% dekking. Lime op wit is te zwak: op lichte vlakken hoort het teken op een donkere tegel (zie het logo-pakket in `merkmateriaal/`). Verander de vorm of verhoudingen niet.

## Techniek

- Geen bouwtools, frameworks of pakketten toevoegen zonder overleg. Houd het bij HTML, CSS en JavaScript.
- Geen externe verzoeken (lettertypes, scripts, analytics, embeds). Alleen uitgaande links naar WhatsApp, Instagram en e-mail. Zo hoeft er geen cookiemelding bij.
- Geen inline `style=""` en geen losse kleuren in de HTML. Maak een klasse in `style.css`.
- Afbeeldingen: JPEG zonder metadata, met `width`, `height` en een zinvolle `alt`. Grote foto rond 1600 px breed, kleine rond 560 px.
- De data voor MOVN SUNDAYS staat alleen in `public/data/events.js`. De pagina leest die uit. Verwerk datums nooit hard in de HTML.
- Draai **altijd** `node scripts/check-site.mjs` voordat je klaar bent. Dezelfde controle draait bij Netlify en blokkeert een publicatie bij fouten.
- Bekijken: `python3 -m http.server --directory public` en open http://localhost:8000. Controleer ook een smal scherm (rond 400 px) en een breed scherm.
- Werk in kleine, duidelijke commits met een Nederlandse omschrijving.

## Wat je niet doet zonder het eerst te vragen

- Teksten over wat MOVNMOTION belooft, kost of aanbiedt veranderen.
- De WhatsApp-links wijzigen (die staan in `index.html`).
- Bedrijfs- of privacygegevens, formulieren, statistieken of cookies toevoegen.
- Namen of foto's van personen toevoegen.

Twijfel je? Vraag het.
