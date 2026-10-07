# MOVNMOTION: afspraken voor Claude Code

Lees dit eerst. Het zijn de afspraken waaronder deze site is gebouwd.

## Wat dit project is

De website van MOVNMOTION, een community waarin sport, creativiteit en ondernemerschap samenkomen. Eén pagina, gewone HTML, CSS en JavaScript, gehost op Netlify, bron op GitHub. Alles wat online komt staat in `public/`.

Kernzin: **"Bewegen brengt mensen samen."** Tagline: **Move. Create. Lead.**

## Taal en toon

- Alle teksten zijn Nederlands, warm, direct, zonder bedrijfsjargon.
- Gebruik **geen lange gedachtestreep (em-dash)**. Gebruik komma's, punten of dubbele punten.
- Zeg **"pijlers"** (Move, Create, Lead). Nooit "werelden" of "culturen".
- MOVN SUNDAYS is laagdrempelig en voor iedereen. Presenteer het als iets dat er is, niet als "in opbouw" of "we beginnen klein". Noem er **geen frequentie** bij ("elke maand", "maandelijks"). Dat communiceren we niet naar buiten.
- Zeg niet "net begonnen" of "nieuwe generatie" en maak geen claims als "op maat" of "dé community". Geen verzonnen cijfers, logo's of ledenaantallen.
- De actieve groepen zijn voor iedereen, ongeacht leeftijd. De ontwikkelprogramma's richten zich vooral op 16 tot 35 jaar, als richtlijn.
- Namen en foto's van personen staan alleen op de site als zij dat zelf willen.

## Merk

- **Kleuren** staan als variabelen bovenaan `public/assets/css/style.css`. Gebruik die, geen losse hex-codes. Lime `#C4E23A` (merkkleur en Move), Magenta `#D6357A` (Create), Amber `#E8A23D` (Lead), bijna-zwart `#15130F`, gebroken wit `#F2EFE9`. De site is bewust alleen donker.
- **Lettertypes:** Bricolage Grotesque (koppen) en Work Sans (tekst), zelf gehost in `assets/fonts/`. Geen externe lettertype-diensten.
- **Het logo is een vaste tekening.** Typ de naam "MOVNMOTION" nooit na in een lettertype om het logo te maken. Gebruik de symbolen in de sprite bovenaan `index.html` (`logo-lockup`, `logo-wordmark`, `logo-mark`). Het teken heeft drie balkjes in één kleur met 35%, 65% en 100% dekking. Lime op wit is te zwak: op lichte vlakken hoort het teken op een donkere tegel (zie het logo-pakket in `merkmateriaal/`). Verander de vorm of verhoudingen niet.

## Techniek

- Geen bouwtools, frameworks of pakketten toevoegen zonder overleg. Houd het bij HTML, CSS en JavaScript.
- Geen externe verzoeken (lettertypes, scripts, analytics, embeds). Alleen uitgaande links naar WhatsApp, Instagram en e-mail. Zo hoeft er geen cookiemelding bij.
- Geen inline `style=""` en geen losse kleuren in de HTML. Maak een klasse in `style.css`.
- Afbeeldingen: JPEG zonder metadata, met `width`, `height` en een zinvolle `alt`. Fotoband: 2400 px plus een `-1200`-versie via `srcset` (de band is even breed als de inhoud, maximaal 1072 px). Kleine foto's rond 560 px.
- `public/index.html` begint met een grote logo-sprite (ongeveer regel 47 tot 90). Die hoef je niet te lezen: gebruik grep of regelbereiken om tokens te besparen.
- De site toont geen datums. Aankondigingen van MOVN SUNDAYS lopen via beelden en de WhatsApp-groepen.
- Draai **altijd** `node scripts/check-site.mjs` voordat je klaar bent. Dezelfde controle draait bij Netlify en blokkeert een publicatie bij fouten.
- Bekijken: `node scripts/serve.mjs` en open http://localhost:8000 (in Claude Code: de preview `website` uit `.claude/launch.json`). Controleer ook een smal scherm (rond 400 px) en een breed scherm.
- Werk in kleine, duidelijke commits met een Nederlandse omschrijving.

## Wat je niet doet zonder het eerst te vragen

- Teksten over wat MOVNMOTION belooft, kost of aanbiedt veranderen.
- De WhatsApp-links wijzigen (die staan in `index.html`).
- Bedrijfs- of privacygegevens, formulieren, statistieken of cookies toevoegen.
- Namen of foto's van personen toevoegen.

Twijfel je? Vraag het.
