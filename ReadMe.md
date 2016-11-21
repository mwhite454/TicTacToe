#Tic Tac Toe
>Ex's and the oh, oh, oh's they haunt me
>Like gho-o-osts they want me to make 'em all
>They won't let gooooo
>Ex's and oh's

##Two Player Fun
By default Tic Tac Toe will allow you to alternate clicks to play the X's and O's. You can play against a friend at the same machine, or you can play against yourself.

##Lurker AI
Because the spec I was working to did not include leeway for buttons to activate an AI, there is one simply lurking in the background. You can open developer tools to watch the console and see where the AI thought you should have gone for the O's moves.

##Activate the Lurker
Well I put it all together, so I wanted some way to interact with it, even if not in spec. The lurker can take control by pressing 1-9 on the keyboard. Each numeric interval should impact the lurker's competency, by affecting the frequency it is allowed to pick the right move. Credit where credit is due, I am working off the tutorial provided by [Mostafa-Samir](https://mostafa-samir.github.io/Tic-Tac-Toe-AI/) to build the AI. A lot of the ground work is there, but I chose to alter the breadth of options you had for difficulty settings, and made it impossible for the AI to always be perfect (boring). I also had to hack the AI designed in the tutorial so that it could be shut up and allow a second human to play.

##Running Tally
Again, the spec did not provide for additional page elements, so I tried to get creative here. The message alerts that were already built for Player Win Vs. Cat Wins, also serve to communicate the AI's competency and the win rate for each player. Hit Enter to see the current tally. The Reset button should not effect the tally; however clicking New Game in the top corner will destroy the global variable that stored the tally, since it is just a link.

###Self Awareness Clause
No code is perfect - these are some things I'd do differently in a refactor.
* IE compatability - This was built rapidly, on an OSX device. I was able to confirm compatability in Chrome, Safari, and a few mobile devices; however no work has been done to make IE compatable yet.
* Messaging - I ended up recycling the same functions over and over again for sending messages. An update of this would move messaging to its own object that understands and receives notifications from the game state and then posts the appropriate message without having the same pieces of code hanging out all over the place.
* Testing - It shouldn't be that difficult to spin up two AI players and let them duke it out. The tutorial that I worked from had completely separate code base for the testing AI though, and I'd like to make it a bit easier to maintain before implementing. It could even be fun to recreate that War Games moment and watch the two AI's dual it out on screen rather than just logging results to a file.
* CSS positioning - I typically work with [Bootstrap](http://getbootstrap.com) and have clearly gotten spoiled by the grid system. I built the positioning here from scratch just to prove that I could, but feel some of the implementation is hacky at times to try and get things nudged into place.
* jQuery - I ended up using jQuery for speed of implementation. It has relatively low overhead and didn't feel the need to recreate the functionality for this build. Going with React seemed like the trendy thing to do, but also would limit the ability to serve from local file system and seems like overkill for the simplicity of this product. 
