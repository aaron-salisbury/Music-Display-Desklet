const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const output = path.join(root, "music-display@nicholasjdi");
const js = fs.readFileSync(path.join(output, "desklet.js"), "utf8");
new vm.Script(js, { filename: "desklet.js" });
if (!/function main\s*\(/.test(js)) throw new Error("Missing Cinnamon main entry point");
const metadata = JSON.parse(fs.readFileSync(path.join(output, "metadata.json"), "utf8"));
if (metadata.uuid !== "music-display@nicholasjdi") throw new Error("Unexpected desklet UUID");
JSON.parse(fs.readFileSync(path.join(output, "settings-schema.json"), "utf8"));
for (const file of ["icon.png", "textures/play.png", "textures/pause.png", "textures/next.png", "textures/previous.png"]) {
  if (!fs.existsSync(path.join(output, file))) throw new Error(`Missing asset: ${file}`);
}
console.log("Desklet output verified (syntax, entry point, metadata, settings and assets).");
