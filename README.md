# MOVNMOTION website

Dit is de complete website van MOVNMOTION. Het is gewone HTML, CSS en JavaScript. Er is geen ingewikkelde bouwstap en er draait geen server of database.

```
public/              alles wat online komt
  index.html         de pagina met alle teksten
  404.html           pagina voor een link die niet bestaat
  assets/css/        uiterlijk (kleuren staan bovenaan style.css)
  assets/js/         menu en verschijn-animatie
  assets/img/        foto's
  assets/fonts/      lettertypes (zelf gehost)
scripts/             controle die voor elke publicatie draait, en een lokale webserver
netlify.toml         instellingen voor Netlify
CLAUDE.md            afspraken voor wie met Claude Code aan de site werkt
```

## 1. Eenmalig online zetten

Volg deze volgorde. Elke stap bouwt voort op de vorige.

1. **Gmail-account voor MOVNMOTION.** Zet 2-staps-verificatie aan en voeg een tweede herstelmogelijkheid toe (nummer of mail van een andere partner), zodat het account niet aan één persoon hangt.
2. **GitHub.** Maak een account met dat Gmail-adres. Maak daarna een gratis **organisatie** (bijvoorbeeld `movnmotion-nl`) en daarin een **openbare repository** (bijvoorbeeld `website`). Netlify deployt een privé-repository van een organisatie alleen op het betaalde plan, een openbare is gratis. Voeg de andere partners toe als eigenaar. Zet de inhoud van deze map in de repository.
3. **Netlify.** Meld je aan met je GitHub-account. Kies *Add new site*, *Import an existing project*, en selecteer de repository. De instellingen komen uit `netlify.toml`, je hoeft niets in te vullen. Klik op *Deploy*.
4. **Domeinen bij Strato.** Leg `movnmotion.nl` (hoofddomein) en `movnmotion.com` vast.
5. **Domein koppelen in Netlify.** Ga naar *Domain management*, kies *Add a domain* en voeg `movnmotion.nl` toe. Voeg `movnmotion.com` toe als alias. Zet `movnmotion.nl` als primair domein, dan stuurt Netlify de rest daar automatisch naartoe.
6. **DNS bij Strato.** Zet de waarden in die Netlify bij het domein toont (een A-record voor het hoofddomein en een CNAME voor `www`). Gebruik altijd de waarden die Netlify op dat moment laat zien. Laat bestaande mail-records (MX, SPF, DKIM) ongemoeid, anders valt e-mail uit.
7. **Wachten op https.** Netlify regelt het beveiligingscertificaat zelf. Dat kan even duren.
8. **Controleren.** Open `https://movnmotion.nl` en `https://movnmotion.com` (die moet doorsturen naar `.nl`). Deel de link in WhatsApp en kijk of titel, tekst en afbeelding kloppen. Previews worden soms een tijd onthouden.

Zorg dat de mailbox `info@movnmotion.nl` werkt voordat de site live gaat, want dat adres staat op de site.

## 2. Teksten en foto's aanpassen

De site toont geen datums. Aankondigingen van MOVN SUNDAYS lopen via beelden en de WhatsApp-groepen.

- Teksten: `public/index.html`. Zoek de zin en pas hem aan. Bewerken kan ook op github.com.
- Kleuren en uiterlijk: bovenaan `public/assets/css/style.css`.
- Foto's: vervang een bestand in `public/assets/img/` door een JPEG met dezelfde naam. Haal eerst de metadata (locatie, camera) eruit, en houd de breedte rond 1600 px voor de grote foto en 560 px voor de kleine.
- Lokaal bekijken: start in deze map `node scripts/serve.mjs` en open http://localhost:8000. Die draait eerst de controle. Alleen Node is nodig, verder niets installeren.
- Controle draaien: `node scripts/check-site.mjs`.
- **Een fout komt nooit online.** Dezelfde controle draait bij Netlify, houdt bij een fout de oude versie staan en laat onder *Deploys* zien wat er mis is.
- **Alleen README of CLAUDE.md gewijzigd?** Dan bouwt Netlify niet opnieuw (zie `ignore` in `netlify.toml`). Dat scheelt credits.
- **Terugdraaien:** Netlify, *Deploys*, kies een eerdere versie en klik op *Publish deploy*. Op GitHub staat bovendien de hele geschiedenis.

## 3. Kosten

| Onderdeel | Kosten |
| --- | --- |
| Gmail | gratis |
| GitHub (organisatie, openbare repository) | gratis |
| Netlify | het gratis niveau is voor deze site ruim genoeg. Controleer de actuele voorwaarden op netlify.com/pricing |
| Domeinen `.nl` en `.com` | jaarlijks, bij Strato |
| Mailbox `info@movnmotion.nl` | afhankelijk van het Strato-pakket, controleer of een mailbox is inbegrepen |

De website zelf kost dus niets, op de domeinen na.

