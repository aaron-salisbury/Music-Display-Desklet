# Roadmap

Future work for the base Music Display Cinnamon desklet. Keep it lightweight, minimalist, and compatible with MPRIS players. Each phase should preserve existing functionality and be tested in Cinnamon before merging. These are planned enhancements, not implemented features.

| Order | Area | Planned work | Completion criteria |
| --- | --- | --- | --- |
| 1 | Code health | Strengthen Cinnamon/GJS API typings, reduce permissive `any` usage, and refactor the TypeScript internals where clearer boundaries naturally emerge. Keep the build and packaging checks reliable. | Type checking meaningfully covers the desklet's APIs and behavior remains unchanged in manual UI testing. |
| 2 | Upstream issue review | Review open issues on [the original repository](https://github.com/NicholasJDi/Music-Display-Desklet/issues). Reproduce or otherwise verify whether each still applies after the fork's TypeScript conversion and cleanup. Record applicable findings and prioritize actionable defects; do not blindly import all issues. | Each open upstream issue is assessed as applicable, resolved, obsolete, or unverified, with rationale. |
| 3 | Always-visible idle state | Show a minimal desklet when Cinnamon starts even if no MPRIS player is running. Handle player connection, disconnection, and paused playback without errors or stale information. Do **not** automatically launch a media player on login. | Desklet is visible after login without Spotify; it transitions correctly when a player starts or exits. |
| 4 | Optional player launcher | Offer a setting to show a launch button only when no player is connected. Remember the selected/preferred player and launch it through its registered desktop application where possible, with a safe fallback when it cannot be resolved. | The optional launch button works for a configured player and disappears when a player connects; no automatic launch occurs. |
| 5 | Horizontal controls | Add a setting to arrange the existing playback buttons on one line, retaining the current layout as an option. | Both layouts work without regressions across reasonable desklet sizes. |
| 6 | Playback progress | Add an optional minimalist track progress bar using MPRIS position and duration, handling unknown durations and player changes gracefully. Start read-only; seeking can be evaluated separately. | Progress tracks playback accurately without excessive polling and can be disabled. |
| 7 | Subtle animation | Add an optional lightweight equalizer-style animation that runs only during active playback and stops when paused or disconnected. Prefer decorative animation without audio-capture dependencies. | Animation is smooth, unobtrusive, configurable on/off, and does not create noticeable idle overhead. |
| 8 | Playlist selection | Investigate a small list of configurable favorite playlists, with Spotify as an initial candidate but no requirement for Premium, developer registration, or Spotify Web API credentials. Test whether local client/MPRIS/desktop URI mechanisms can reliably start playback. Preserve support for other players; do not promise full playlist browsing or automatic playback if the local integration cannot provide it. | A feasible local-only approach is demonstrated and documented before implementing playlist controls; otherwise record the limitation and defer. |

## Principles

- Preserve the original desklet's core MPRIS playback support and minimalist appearance.
- Keep features optional where appropriate, especially launch controls, progress, and animation.
- Prefer native Cinnamon/GJS and local media-player interfaces over external services or additional runtime dependencies.
- Keep build verification automated, but require manual Linux Mint Cinnamon testing for UI and integration behavior.
- Address confirmed defects discovered during upstream issue review before expanding nonessential features.
