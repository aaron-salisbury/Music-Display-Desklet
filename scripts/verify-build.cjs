"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const uuid = "music-display@nicholasjdi";
const output = path.join(root, uuid);
const scriptPath = path.join(output, "desklet.js");
const sourcePath = path.join(root, "src", "desklet.ts");

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(output, name), "utf8"));
}

const source = fs.readFileSync(sourcePath, "utf8");
const js = fs.readFileSync(scriptPath, "utf8");
assert.ok(js.trim(), "Compiled desklet is empty");
assert.ok(!source.includes("@ts-nocheck"), "TypeScript source must be checked");
assert.ok(!source.includes("@ts-ignore"), "Do not silently suppress TypeScript diagnostics");

// Cinnamon's legacy desklet loader evaluates this file as a script, not as
// an ES module. Validate syntax and ensure no module loader is required.
const script = new vm.Script(js, { filename: "desklet.js" });
assert.ok(!/^(?:\s*)(?:import\s|export\s)/m.test(js), "Unexpected ES module syntax");
assert.ok(!/\b(?:require|module\.exports|exports\.)\s*(?:\(|=|\.)/.test(js), "Unexpected CommonJS runtime dependency");

// Exercise the Cinnamon entry point with lightweight GJS stand-ins.
// This does not instantiate a real desklet; it catches module/entry-point
// regressions that a syntax-only check would miss.
const deskletBase = function Desklet() {};
deskletBase.prototype._init = function () {};
const context = vm.createContext({
  imports: {
    ui: { desklet: { Desklet: deskletBase }, popupMenu: {}, settings: {} },
    gi: { St: {}, GLib: {}, Gio: {}, Pango: {} },
    lang: {}
  },
  global: {},
  _: (value) => value
});
script.runInContext(context);
assert.equal(vm.runInContext("typeof main", context), "function", "Cinnamon main() must be globally accessible");
assert.equal(vm.runInContext("typeof MusicDisplayDesklet", context), "function", "Desklet constructor must exist");

const metadata = readJson("metadata.json");
assert.equal(metadata.uuid, uuid, "Cinnamon UUID must match directory name");
assert.ok(typeof metadata.name === "string" && metadata.name.trim(), "Missing desklet name");
const settings = readJson("settings-schema.json");
assert.ok(Object.keys(settings).length > 0, "Settings schema is empty");
const boundKeys = [...source.matchAll(/settings\.bind\(\s*["']([^"']+)["']/g)].map((match) => match[1]);
assert.ok(boundKeys.length > 0, "No settings bindings found");
for (const key of boundKeys) {
  assert.ok(Object.hasOwn(settings, key), `Missing settings-schema entry: ${key}`);
}

for (const file of ["icon.png", "textures/play.png", "textures/pause.png", "textures/next.png", "textures/previous.png"]) {
  assert.ok(fs.statSync(path.join(output, file)).size > 0, `Missing or empty asset: ${file}`);
}

console.log("Verified Cinnamon script loading, entry points, settings bindings, metadata, and assets.");
