Henry Clay, The Friendly Snake
--
JavaScript Snake built on the [P5](https://p5js.org/) Javascript Framework.

By: Thomas Soria

License: MIT

Website: Todo: Link once hosted...


In its current state, the game is very basic. My focus was just to make the game
incredibly customizable and aesthetically pleasing. I wanted these
customizations to be saved in the URI so you could share your preferred settings
and for these settings to be changable while the game was running.

Todos
--
This project is in a pretty good state but there are many improvements that can
be made. In order of importance:

Abstract / Cleanup
---
The code isn't pretty. There are a lot of magic numbers, public variables, and
the structure for the project is all over the place. Having a clear distinction
between "game engine" and "game logic" would be really nice.

Optimize
---
This game lags a fair bit on older devices when the snake reaches a certain
length. This might just be a limit of the P5 engine and the sheer number of draw
calls being made, but I'm fairly certain something can be done to improve it.
If nothing else, a performance mode can be added that doesn't do any of the
fancy color shenanigans.

Score / Leaderboard
---
Probably just a local cookie initially.

Mobile
---
Add mobile controls.

URI History
---
Refreshing the page should preserve updated settings.
Also, add logic to ignore keypresses if Cmd/Ctrl is held down.

Different edibles
---
Currently only 'green' is implemented.
Adding powerups should be fairly straightforward.
