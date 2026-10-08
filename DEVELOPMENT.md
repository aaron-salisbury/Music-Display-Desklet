# Development

The main Music Display desklet is authored in TypeScript at `src/desklet.ts`.
The generated `music-display@nicholasjdi/desklet.js` is intentionally committed so the Cinnamon desklet can also be installed directly from a checkout. This first slice preserves the upstream desklet behavior and UUID. The companion Music Display Additions desklet is unchanged.

## Build

Requires Node.js and npm for development only:

```bash
npm ci
npm run verify
```

The TypeScript compiler emits legacy script-style JavaScript (no ES imports or exports). The current Cinnamon interfaces use permissive local ambient declarations; tightening them is future work. CI verifies compilation, syntax, entry point, metadata, settings and required assets; it does **not** run Cinnamon or perform visual testing.

## UI testing on Linux Mint Cinnamon

1. Install `playerctl` and open Spotify (or another MPRIS player).
2. Run `npm ci && npm run verify` from the repository root.
3. Back up your current desklet directory, if present: `cp -a ~/.local/share/cinnamon/desklets/music-display@nicholasjdi ~/.local/share/cinnamon/desklets/music-display@nicholasjdi.backup`.
4. Copy the built desklet: `cp -a music-display@nicholasjdi ~/.local/share/cinnamon/desklets/`.
5. Disable and re-enable Music Display in Cinnamon's **Add Desklets** window if needed.
6. Play a track and check metadata, play/pause, next/previous, and settings. Check the Cinnamon Looking Glass error log (**Melange**, via `cinnamon-looking-glass`) if the desklet fails to load.

Because this baseline keeps the original UUID, test it in place of the upstream desklet, not alongside it. Restore the backup to roll back.
