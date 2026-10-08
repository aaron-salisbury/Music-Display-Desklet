# Music-Display Desklet
A Linux Mint Cinnamon Desklet for displaying what is currently being played by Players supporting the MPRIS D-Bus Specification such as Rhythmbox, Firefox, Spotify, and more, using the playerctl command-line utility.
## Installation
Install `playerctl` (`sudo apt install playerctl`). Download the build artifact from GitHub Actions or build locally using `npm ci && npm run verify`. Copy the `music-display@nicholasjdi` directory into `~/.local/share/cinnamon/desklets/`, then enable Music Display in Cinnamon's **Add Desklets** settings. Node.js is only required to build, not to run the desklet.

See [DEVELOPMENT.md](./docs/DEVELOPMENT.md) for the development workflow and UI testing.
## Configuration
Desklet looks like this by default:<br>
<img width="164" height="98" alt="Screenshot from 2025-09-08 08-43-38" src="https://github.com/user-attachments/assets/c7ed5d39-02f2-465a-8b24-719284d118dd" />

You can fully configure both text lines, you can do something like this:<br>
<img width="242" height="78" alt="Screenshot from 2025-09-08 08-50-30" src="https://github.com/user-attachments/assets/2858b670-cd22-4200-aea3-288e345a4a41" /><br><br>

For both lines you can change: format, font, font size, and font color.

### Format
#### Tags
The Tags System is VERY powerful, they are formatted as `%{prefix}[player]metadata:key{suffix}%`
##### metadata:key
The Metadata Key to grab from, if `metadata:` is not provided it will be treated as `xesam:tag` automatically,<br>
additionally there a few built-in tags.<br>
- title: shows `xesam:title` unless [Mix Detection](#mix-detection) is enabled and the track is recognized as a mix, then it will display the Mix Title.<br>
- mix: displays nothing unless [Mix Detection](#mix-detection) is enabled and the track is recognized as a mix, then it will display `xesam:title`.<br>
- player: displays the name of the current player.<br>
(built-in tags are used as `%title%`, metadata:key is the only required section of the tag.)<br>

The functions and variables that playerctl provides are also supported (lc(xesam:title), uc(xesam:album), position, volume), If you set metadata:tag to be `(anything)` whatever you put in the brackets will be directly given to playerctl so you can do things like `%(position / 1000000)%` to get seconds.<br>
Prefix metadata:tag with `!` to ignore the [Empty Values](#empty-values).

Run `playerctl metadata` to show Metadata for the current Track.
##### [player]
The Player(s) the Track must be played from for a tag to activate, don't include to allow the tag to activate for all Players. (the current player is the same as %player%)<br>
Prefix `[player]` with `!` to make it a blacklist instead of a whitelist. (`![vlc,spotify]`)
##### {prefix}/{suffix}
If metadata:key equates to a valid Value {prefix} will be Prepended to the tag and {suffix} will be Appended to the tag. (prefix/suffix can have Tags within them. `%{by }artist{%( - )album%}%`)
##### Conditional Tags
To make a tag conditional prefix metadata:tag with `?`, this makes it so anything placed in {prefix} will be shown if metadata:tag evaluates to a valid Value.<br>
If metadata:tag is instead prefixed with `??` the condition will be inversed (prefix shown when metadata:tag evaluates to an invalid Value)<br>

In a Conditional Tag anything placed in the {suffix} will be compared to what metadata:tag evaluates to, tags within the match suffix will be treated as plain text.<br>
If the comparison succeeds {prefix} will be shown, [Empty Values](#empty-values) are always ignored in match tags, to make them ignored in normal conditional tags prefix metadata:tag with `!` as well (`!?`). (adding a `!` to a match tag makes it respect the [Empty Values](#empty-values) but its not very useful)
#### Example
Using all of these tags we can set line 1 to "%title%" and set line 2 to "%{by }artist{%{ - }album{%{ | %discNumber{-}%}trackNumber%}%}%" to show:<br>
<img width="1366" height="768" alt="Screenshot from 2025-11-30 14-43-59" src="https://github.com/user-attachments/assets/875064dc-e524-465f-878a-70b70ff7601e" /><br>
for Rhythmbox, Firefox and Spotify. (i'm using rhythmbox in these examples. Note: VLC has really bad Metadata support, that's why its not referenced here.)
### Tag Settings
#### Mix Detection
Check 'xesam:comment' for lines formatted as "[(hours):(minutes):(seconds)]: (Title)"

If these lines exist it will replace the %title% with the provided title.<br>
Additionally when enabled, the %mix% tag can be used to grab the xesam:title, if no timestamp lines are provided it will return an empty string.

This can decrease performance a lot.
#### Empty Values
A Comma-separated list of Values to treat as `null` in Custom Format Tags (Unknown,None,N/A,0)
### Player Settings
#### Allowed Players
A Comma-separated list of allowed Players. (rhythmbox,spotify)
#### Treat Whitelist As Blacklist
Whether or not to treat the Whitelist as a Blacklist
### Button Settings
#### Spacing
The Space between the Buttons and the Text.
#### Hide All Buttons
Makes it so none of the Buttons are there, just the Text.<br>
<img width="207" height="68" alt="Screenshot from 2025-09-08 09-38-04" src="https://github.com/user-attachments/assets/cdc0256b-f4a6-4e90-8a5a-620e80a81a79" />
#### Hide Skip Buttons
Hide the Previous/Next Buttons, without setting Button Size it will look like this:<br>
<img width="246" height="86" alt="image" src="https://github.com/user-attachments/assets/0b7090d3-2433-437e-8edf-4ae520925b5a" />
#### Button Size
The size of the Buttons, when setting this with hidden skip buttons it looks like this:<br>
<img width="248" height="64" alt="image" src="https://github.com/user-attachments/assets/553941d4-68ae-495c-b44b-d9f1a6f694e3" />
#### Play/Pause/Next/Previous Button Texture
Custom Texture to use for the Buttons. (forcefully rendered as a square)
## Credits
Also the inspiration for this is from https://www.reddit.com/r/Minecraft/comments/10br3xj/my_desktop_theme_for_2023 (you can also use Hidamari and dual-datetime@rcalixte to get an almost perfect match to this :D)

Original author's desktop: (fonts are Minecraftia and Lobster)<br>
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/586e0ab5-b535-4ed9-8cf0-a2febfbe8418" /><br>
<br><br><br>
