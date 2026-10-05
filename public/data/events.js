/*
  MOVN SUNDAYS: de eerstvolgende editie(s).

  Zo pas je dit aan:
  - Staat er niets tussen de blokhaken [ ], dan toont de site geen datum.
  - Zet voor elke editie één regel tussen de blokhaken, zoals in dit voorbeeld:

      { datum: "2026-11-15", tijd: "10:00", plaats: "Rotterdam", link: "https://chat.whatsapp.com/..." },

  - Verplicht: datum, altijd als JJJJ-MM-DD.
  - Optioneel: tijd (UU:MM), plaats, opmerking (korte tekst), link (begint met https://).
  - Elke regel eindigt met een komma. Laat de aanhalingstekens " staan.
  - Is de datum voorbij, dan verdwijnt het blokje vanzelf van de site.
  - Staan er meerdere regels, dan toont de site de eerstvolgende.

  Een fout in dit bestand komt nooit online: de controle bij het publiceren houdt de oude versie dan staan
  en laat in Netlify zien wat er mis is.
*/
window.MOVN_EVENTS = [];
