// Controle vóór elke publicatie. Draait automatisch bij Netlify (zie netlify.toml)
// en lokaal met: node scripts/check-site.mjs
//
// Fouten stoppen de publicatie: de oude versie van de site blijft dan online staan.
// Waarschuwingen worden alleen getoond.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public");
const errors = [];
const warnings = [];

// ---------- 1. Datums voor MOVN SUNDAYS ----------
const eventsPath = join(root, "data", "events.js");
const allowedKeys = new Set(["datum", "tijd", "plaats", "opmerking", "link"]);

function isRealDate(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const d = new Date(text + "T12:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === text;
}

if (!existsSync(eventsPath)) {
  errors.push("public/data/events.js ontbreekt.");
} else {
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(readFileSync(eventsPath, "utf8"), sandbox, { timeout: 1000 });
  } catch (e) {
    errors.push(
      "events.js is niet geldig (waarschijnlijk een ontbrekende komma, aanhalingsteken of haakje): " +
        e.message,
    );
  }
  const events = sandbox.window.MOVN_EVENTS;
  if (events === undefined) {
    if (!errors.length) errors.push("events.js moet beginnen met: window.MOVN_EVENTS = [");
  } else if (!Array.isArray(events)) {
    errors.push("MOVN_EVENTS moet een lijst zijn, dus tussen [ en ].");
  } else {
    events.forEach((e, i) => {
      const nr = `Editie ${i + 1} in events.js`;
      if (typeof e !== "object" || e === null)
        return errors.push(`${nr}: dit moet een regel zijn met { ... }.`);
      for (const key of Object.keys(e)) {
        if (!allowedKeys.has(key))
          errors.push(`${nr}: onbekend veld "${key}". Toegestaan: ${[...allowedKeys].join(", ")}.`);
      }
      if (e.datum === undefined)
        errors.push(`${nr}: het veld "datum" ontbreekt. Dat is verplicht, bijvoorbeeld datum: "2026-11-15".`);
      else if (!isRealDate(e.datum))
        errors.push(`${nr}: datum "${e.datum}" klopt niet. Gebruik JJJJ-MM-DD, bijvoorbeeld 2026-11-15.`);
      if (e.tijd !== undefined && !/^([01]\d|2[0-3]):[0-5]\d$/.test(e.tijd))
        errors.push(`${nr}: tijd "${e.tijd}" klopt niet. Gebruik UU:MM, bijvoorbeeld 10:00.`);
      if (e.link !== undefined && !/^https:\/\/\S+$/.test(e.link))
        errors.push(`${nr}: link moet beginnen met https://`);
      for (const key of ["plaats", "opmerking"]) {
        if (e[key] !== undefined && (typeof e[key] !== "string" || e[key].length > 120))
          errors.push(`${nr}: ${key} moet korte tekst zijn (maximaal 120 tekens).`);
      }
    });
  }
}

// ---------- 2. Bestanden en ankers in de pagina's ----------
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const files = walk(root);
const htmlFiles = files.filter((f) => f.endsWith(".html"));

for (const file of htmlFiles) {
  const label = file.slice(root.length + 1);
  const html = readFileSync(file, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    if (ref.startsWith("#")) {
      if (ref.length > 1 && !ids.has(ref.slice(1)))
        errors.push(`${label}: link naar ${ref} maar die plek bestaat niet.`);
      continue;
    }
    const clean = ref.split("#")[0].split("?")[0];
    const target = clean.startsWith("/") ? join(root, clean) : join(dirname(file), clean);
    if (clean && !existsSync(target)) errors.push(`${label}: bestand ontbreekt: ${ref}`);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) errors.push(`${label}: afbeelding zonder alt-tekst: ${m[0].slice(0, 80)}`);
  }
}

// ---------- 3. Huisstijl-afspraken (alleen waarschuwingen) ----------
const textFiles = files.filter((f) => /\.(html|css|js)$/.test(f));
for (const file of textFiles) {
  const text = readFileSync(file, "utf8");
  const label = file.slice(root.length + 1);
  if (text.includes("\u2014"))
    warnings.push(`${label}: bevat een lange gedachtestreep (em-dash). Gebruik die niet in teksten.`);
  if (/\bwerelden\b/i.test(text))
    warnings.push(`${label}: het woord "werelden" komt voor. We zeggen "pijlers".`);
  if (/elke maand|maandelijks/i.test(text) && !label.startsWith("data"))
    warnings.push(`${label}: noemt "elke maand" of "maandelijks". Dat communiceren we niet naar buiten.`);
}

// ---------- Resultaat ----------
for (const w of warnings) console.warn("Waarschuwing: " + w);
if (errors.length) {
  console.error("\nDe controle is mislukt. De site is NIET vernieuwd; de vorige versie blijft online.\n");
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}
console.log(`Controle gelukt: ${htmlFiles.length} pagina('s), ${files.length} bestanden.`);
