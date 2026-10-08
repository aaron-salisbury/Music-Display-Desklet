# Development

This repository contains one Cinnamon desklet: Music Display. Its source is `src/desklet.ts`; the compiled `music-display@nicholasjdi/desklet.js` is **not committed**. Static assets, metadata and settings remain in the desklet folder.

## Build

Requires Node.js and npm for development only. Cinnamon users do not need either.

```bash
npm ci
npm run verify
```

The build generates legacy script-style JavaScript compatible with Cinnamon's desklet loader. The code is checked by TypeScript; GJS/Cinnamon interfaces are currently represented by limited local declarations and should be tightened incrementally. CI validates compilation, JavaScript syntax, the entry point, metadata, settings and assets. It does **not** run Cinnamon UI tests.

## UI testing on Linux Mint Cinnamon

1. Install `playerctl` and launch Spotify (or another MPRIS player).
2. Run `npm ci && npm run verify` in the repository.
3. If already installed, back up `~/.local/share/cinnamon/desklets/music-display@nicholasjdi` outside the Cinnamon desklets directory.
4. Copy the **contents** of `music-display@nicholasjdi/` into `~/.local/share/cinnamon/desklets/music-display@nicholasjdi/`.
5. Disable and re-enable Music Display in Cinnamon's **Add Desklets** window.
6. Check track metadata, playback controls and settings. Inspect Cinnamon's Looking Glass error log (`cinnamon-looking-glass`) if it fails to load.

The original UUID is retained, so this fork replaces the upstream desklet rather than installing alongside it. Restore the backup to roll back.
