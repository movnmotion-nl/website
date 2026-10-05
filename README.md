# MOVNMOTION website

Dit is de complete website van MOVNMOTION. Het is gewone HTML, CSS en JavaScript. Er is geen ingewikkelde bouwstap en er draait geen server of database.

```
public/              alles wat online komt
  index.html         de pagina met alle teksten
  404.html           pagina voor een link die niet bestaat
  data/events.js     de datum van MOVN SUNDAYS (hier pas je datums aan)
  assets/css/        uiterlijk (kleuren staan bovenaan style.css)
  assets/js/         menu en het blokje "Volgende keer"
  assets/img/        foto's
  assets/fonts/      lettertypes (zelf gehost)
scripts/             controle die voor elke publicatie draait
netlify.toml         instellingen voor Netlify
CLAUDE.md            afspraken voor wie met Claude Code aan de site werkt
```

## 1. Eenmalig online zetten

Volg deze volgorde. Elke stap bouwt voort op de vorige.

1. **Gmail-account voor MOVNMOTION.** Zet 2-staps-verificatie aan en voeg een tweede herstelmogelijkheid toe (nummer of mail van een andere partner), zodat het account niet aan één persoon hangt.
2. **GitHub.** Maak een account met dat Gmail-adres. Maak daarna een gratis **organisatie** (bijvoorbeeld `movnmotion`) en daarin een **privé-repository** (bijvoorbeeld `website`). Voeg de andere partners toe als eigenaar. Zet de inhoud van deze map in de repository.
3. **Netlify.** Meld je aan met je GitHub-account. Kies *Add new site*, *Import an existing project*, en selecteer de repository. De instellingen komen uit `netlify.toml`, je hoeft niets in te vullen. Klik op *Deploy*.
4. **Domeinen bij Strato.** Leg `movnmotion.nl` (hoofddomein) en `movnmotion.com` vast.
5. **Domein koppelen in Netlify.** Ga naar *Domain management*, kies *Add a domain* en voeg `movnmotion.nl` toe. Voeg `movnmotion.com` toe als alias. Zet `movnmotion.nl` als primair domein, dan stuurt Netlify de rest daar automatisch naartoe.
6. **DNS bij Strato.** Zet de waarden in die Netlify bij het domein toont (een A-record voor het hoofddomein en een CNAME voor `www`). Gebruik altijd de waarden die Netlify op dat moment laat zien. Laat bestaande mail-records (MX, SPF, DKIM) ongemoeid, anders valt e-mail uit.
7. **Wachten op https.** Netlify regelt het beveiligingscertificaat zelf. Dat kan even duren.
8. **Controleren.** Open `https://movnmotion.nl` en `https://movnmotion.com` (die moet doorsturen naar `.nl`). Deel de link in WhatsApp en kijk of titel, tekst en afbeelding kloppen. Previews worden soms een tijd onthouden.

Zorg dat de mailbox `info@movnmotion.nl` werkt voordat de site live gaat, want dat adres staat op de site.

## 2. De datum van MOVN SUNDAYS aanpassen

Dit is het enige dat je regelmatig doet, en het kan zonder iets te installeren.

1. Ga naar de repository op github.com en open `public/data/events.js`.
2. Klik op het potlood-icoon (*Edit this file*).
3. Zet tussen de blokhaken een regel zoals deze:

```js
window.MOVN_EVENTS = [
  { datum: "2026-11-15", tijd: "10:00", plaats: "Rotterdam", link: "https://chat.whatsapp.com/..." },
];
```

4. Klik op *Commit changes*. Binnen ongeveer een minuut staat het op de site.

Goed om te weten:

- **Verplicht** is alleen `datum` (JJJJ-MM-DD). `tijd`, `plaats`, `opmerking` en `link` zijn optioneel.
- Is de datum voorbij, dan verdwijnt het blokje **vanzelf**. Een vergeten update laat dus nooit een oude datum staan.
- Staan er meerdere regels, dan toont de site de eerstvolgende.
- **Een typefout komt nooit online.** De controle in `scripts/check-site.mjs` houdt de oude versie dan staan en laat bij Netlify onder *Deploys* zien wat er mis is, in gewone taal.
- **Terugdraaien:** Netlify, *Deploys*, kies een eerdere versie en klik op *Publish deploy*. Op GitHub staat bovendien de hele geschiedenis.

**Als jij het even niet kunt:** nodig iemand uit in de GitHub-organisatie (*People*, *Invite member*). Die persoon heeft alleen deze stappen nodig. Zonder GitHub-account kan niemand de datum aanpassen. Stuur een vervanger deze README.

## 3. Andere teksten en foto's aanpassen

- Teksten: `public/index.html`. Zoek de zin en pas hem aan. Bewerken kan ook op github.com.
- Kleuren en uiterlijk: bovenaan `public/assets/css/style.css`.
- Foto's: vervang een bestand in `public/assets/img/` door een JPEG met dezelfde naam. Haal eerst de metadata (locatie, camera) eruit, en houd de breedte rond 1600 px voor de grote foto en 560 px voor de kleine.
- Lokaal bekijken: dubbelklik op `public/index.html`, of start in deze map `python3 -m http.server --directory public`.
- Controle draaien: `node scripts/check-site.mjs`.

## 4. Kosten

| Onderdeel | Kosten |
| --- | --- |
| Gmail | gratis |
| GitHub (organisatie, privé-repository) | gratis |
| Netlify | het gratis niveau is voor deze site ruim genoeg. Controleer de actuele voorwaarden op netlify.com/pricing |
| Domeinen `.nl` en `.com` | jaarlijks, bij Strato |
| Mailbox `info@movnmotion.nl` | afhankelijk van het Strato-pakket, controleer of een mailbox is inbegrepen |

De website zelf kost dus niets, op de domeinen na.

## 5. Nog te doen of te besluiten

- **Over ons:** kaarten voor de twee partners die zichtbaar willen zijn (naam, rol, foto, eventueel link). De sectie `over-ons` in `index.html` is er al.
- **Bedrijfs- en privacygegevens:** staan er bewust niet op. De site verzamelt zelf niets: geen formulieren, cookies of statistieken. Of er toch bedrijfsgegevens bij moeten (naam, adres, e-mail, KvK-nummer) hangt af van hoe MOVNMOTION juridisch is ingericht en of er diensten of sponsoring tegenover staan. Laat dit navragen bij de Kamer van Koophandel of een jurist. Voeg je later statistieken of een formulier toe, dan komt er een privacyverklaring bij.
- **Foto's:** controleer dat iedereen die herkenbaar in beeld is, akkoord is met publicatie.
- **Domein in de code:** `index.html` verwijst al naar `https://movnmotion.nl` (canonical en preview-afbeelding). Pas dat aan als het hoofddomein anders wordt.
- **Merknaam:** laat controleren of "MOVNMOTION" nog vrij is, bijvoorbeeld in het register van het Benelux-bureau voor de intellectuele eigendom (BOIP).
- **Borduren en zeefdruk:** het logo gebruikt drie dekkingen, en daarvoor is nog een vlakke versie nodig. Zie het logo-pakket.
