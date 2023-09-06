// Patch manifest.json for firefox.
const fs = require("fs");
const path = require("path");

const TARGET_DIR = path.join(__dirname, "..", "out", "ff");
const TARGET = path.join(TARGET_DIR, "manifest.json");

if (!fs.existsSync(TARGET_DIR)) {
  console.error("Directory `out/ff` does not exist.\nUse `npm run ff:build` to run this script.");
  process.exit(1);
}

if (!fs.existsSync(TARGET)) {
  console.error("Manifest does not exist in `dist_ff`.\nUse `npm run ff:build` to run this script.");
  process.exit(1);
}

const originalJson = fs.readFileSync(TARGET).toString("utf8");

const manifest = JSON.parse(originalJson);
manifest.background.scripts = [
  manifest.background.service_worker,
];
delete manifest.background.service_worker;

const newJson = JSON.stringify(manifest);
fs.writeFileSync(TARGET, newJson);
console.log("manifest.json was successfully patched for firefox");
