// Lokale webserver om de site te bekijken, zonder iets te installeren.
// Starten met: node scripts/serve.mjs en open http://localhost:8000
//
// Draait eerst dezelfde controle als Netlify. Bij een fout start de server niet.
// Alleen bereikbaar op deze computer.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, dirname, resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "public");
const port = 8000;

const check = spawnSync(process.execPath, [join(here, "check-site.mjs")], { stdio: "inherit" });
if (check.status !== 0) process.exit(check.status ?? 1);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
};

async function findFile(urlPath) {
  let path;
  try {
    path = decodeURIComponent(urlPath.split("?")[0]);
  } catch {
    return null;
  }
  const full = resolve(root, "." + path);
  // Niets buiten public/ serveren
  if (full !== root && !full.startsWith(root + sep)) return null;
  try {
    const info = await stat(full);
    if (info.isDirectory()) return findFile(join(path, "index.html").replaceAll("\\", "/"));
    return full;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = await findFile(req.url || "/");
  const target = file || join(root, "404.html");
  try {
    const body = await readFile(target);
    res.writeHead(file ? 200 : 404, {
      "Content-Type": types[extname(target).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Er ging iets mis bij het lezen van het bestand.");
  }
  console.log(`${file ? 200 : 404} ${req.url}`);
}).listen(port, "127.0.0.1", () => {
  console.log(`Site draait op http://localhost:${port} (stoppen met Ctrl+C)`);
});
