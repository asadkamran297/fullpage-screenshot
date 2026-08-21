// Builds the upload-ready zip for the Chrome Web Store.
// Uses PowerShell's Compress-Archive so there are no npm dependencies.
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, cpSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(resolve(root, "manifest.json"), "utf8"));
const staging = resolve(root, "dist", "package");
const zipPath = resolve(root, "dist", `fullpage-screenshot-${version}.zip`);

rmSync(resolve(root, "dist"), { recursive: true, force: true });
mkdirSync(staging, { recursive: true });

for (const item of ["manifest.json", "src", "icons", "LICENSE"]) {
  cpSync(resolve(root, item), resolve(staging, item), { recursive: true });
}

if (existsSync(zipPath)) rmSync(zipPath);
execFileSync("powershell", [
  "-NoProfile",
  "-Command",
  `Compress-Archive -Path '${staging}\*' -DestinationPath '${zipPath}' -Force`
], { stdio: "inherit" });

rmSync(staging, { recursive: true, force: true });
console.log(`Created ${zipPath}`);
